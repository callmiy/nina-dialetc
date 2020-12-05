import { listCurrencies } from "../db";
import { Resolvers } from "../gql/schema-types";

export const currencyResolver: Resolvers = {
  Query: {
    listCurrencies: async (_, __, { db }) => {
      const data = await listCurrencies(db);
      return data;
    },
  },
};
