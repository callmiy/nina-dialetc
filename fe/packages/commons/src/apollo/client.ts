import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import fetch from "cross-fetch";
import { GRAPHQL_PATH } from "../constants";
import { API_URL } from "../envs";
import { middlewareErrorLink, middlewareLoggerLink } from "./middlewares";
import { listCountriesAndCurrenciesQuery } from "../gql/queries";
import {
  ListCountriesAndCurrencies,
  ListCountriesAndCurrenciesVariables,
} from "../gql/ops-types";

const path = API_URL + GRAPHQL_PATH;

let client = (undefined as unknown) as ApolloClient<unknown>;
let cache = (undefined as unknown) as InMemoryCache;

export function makeApolloClient(
  { uri }: MakeApolloClientArgs = { uri: path }
) {
  if (client) {
    return client;
  }

  cache = new InMemoryCache();

  let link = createHttpLink({
    uri,
    fetch,
  });

  link = middlewareErrorLink(link);
  link = middlewareLoggerLink(link);

  client = new ApolloClient({
    cache,
    link,
    queryDeduplication: false,
    ssrMode: typeof window === "undefined" ? true : false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  return client;
}

export async function getCountriesCurrencies() {
  const client = makeApolloClient();

  try {
    const { data } = await client.query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 20,
        },
      },
    });

    return data || ({} as ListCountriesAndCurrencies);
  } catch (error) {
    return {} as ListCountriesAndCurrencies;
  }
}

type MakeApolloClientArgs = {
  uri?: string;
};
