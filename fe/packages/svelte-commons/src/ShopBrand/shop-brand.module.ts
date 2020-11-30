/* eslint-disable @typescript-eslint/no-unused-vars */

import { makeApolloClient } from "@ta/cm/src/apollo-client";
import { listCountriesQuery } from "@ta/cm/src/gql/queries";

const apolloClient = makeApolloClient();
let data;

(async function preload() {
  try {
    data = await apolloClient.query({
      query: listCountriesQuery,
    });
  } catch (error) {
    data = error;
  }
})();
