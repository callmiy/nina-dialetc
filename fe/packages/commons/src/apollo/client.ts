/* istanbul ignore file */
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
// failing in jest test with msw, so will use window.fetch
// import crossFetch from "cross-fetch";
import { GRAPHQL_PATH } from "../constants";
import { API_URL_ALTERNATE, isBrowser } from "../envs";
import { Any } from "../types";
import { middlewareErrorLink, middlewareLoggerLink } from "./middlewares";

const path = API_URL_ALTERNATE + GRAPHQL_PATH;

export function makeApolloClient(
  { uri }: MakeApolloClientArgs = { uri: path }
) {
  let client = (undefined as unknown) as ApolloClient<Any>;
  let cache = (undefined as unknown) as InMemoryCache;
  let ssrMode = true;
  const isBrowserStatic = isBrowser();

  if (isBrowserStatic) {
    ssrMode = false;
    const { cache: windowCache, client: windowClient } = window.____nina || {};

    if (windowClient) {
      client = windowClient;
    }

    if (windowCache) {
      cache = windowCache;
    }
  }

  if (client && cache) {
    return { client, cache };
  }

  if (!cache) {
    cache = makeCache();
  }

  let link = createHttpLink({
    uri,
    fetch: (...args) => {
      return fetch(...args);
    },
  });

  link = middlewareErrorLink(link);
  link = middlewareLoggerLink(link);

  client = new ApolloClient({
    cache,
    link,
    queryDeduplication: false,
    ssrMode,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  if (isBrowserStatic) {
    const nina = window.____nina || {};
    nina.client = client;
    nina.cache = cache;
  }

  return { client, cache };
}

export function makeCache() {
  const cache = new InMemoryCache({
    typePolicies: {
      Owner: {
        keyFields: ["ownerId"],
      },
    },
  });

  return cache;
}

type MakeApolloClientArgs = {
  uri?: string;
};
