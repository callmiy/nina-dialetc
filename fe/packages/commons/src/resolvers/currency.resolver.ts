import { listCurrencies } from "../db";
import { Resolvers } from "../gql/schema-types";

export const currencyResolver: Resolvers = {
  Query: {
    listCurrencies: async (_, __, { db }) => {
      const data = await listCurrencies(db);
      return data;
    },
  },
  Currency: {
    currencyName: (parent) => {
      return parent.currency_name;
    },
    currencyCode: (parent) => {
      return parent.currency_code;
    },
    insertedAt: (parent) => {
      return parent.inserted_at;
    },
    updatedAt: (parent) => {
      return parent.updated_at;
    },
  },
};
