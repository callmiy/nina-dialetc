import { listCountries } from "../db";
import { Resolvers } from "../gql/schema-types";

export const countryResolver: Resolvers = {
  Query: {
    listCountries: async (_, { paginationInput }, { db }) => {
      console.log(paginationInput);
      const data = await listCountries(db, paginationInput);
      return data;
    },
  },
};
