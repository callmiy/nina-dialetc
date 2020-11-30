import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import fetch from "cross-fetch";
import { GRAPHQL_PATH } from "@ta/cm/src/constants";

const cache = new InMemoryCache();

const link = createHttpLink({
  uri: GRAPHQL_PATH,
  fetch,
});

export const apolloClient = new ApolloClient({
  cache,
  link,
  name: "@ta/sa/apollo-client",
  queryDeduplication: false,
  ssrMode: typeof window === "undefined" ? true : false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
