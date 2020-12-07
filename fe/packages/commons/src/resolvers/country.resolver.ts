import { listCountries } from "../db";
import { Resolvers } from "../gql/schema-types";

export const countryResolver: Resolvers = {
  Query: {
    listCountries: async (_, __, { db }) => {
      const data = await listCountries(db);
      return data;
    },
  },
};
