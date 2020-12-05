import { listCountries } from "../db";
import { Resolvers } from "../gql/schema-types";

export const countryResolver: Resolvers = {
  Query: {
    listCountries: async (_, __, { db }) => {
      const data = await listCountries(db);
      return data;
    },
  },
  Country: {
    post_codes: async (country, _, { db, dataLoaders }) => {
      const loader = dataLoaders.countryPostCodesLoaderFn(db);
      const data = await loader.load(country.id);
      return data;
    },
  },
};
