import { listCountries } from "../db";
import { Resolvers, ResolversTypes } from "../schema-types";
import { relayConnectionFromDataGetter } from "@ta/cm/src/pagination";

export const countryResolver: Resolvers = {
  Query: {
    listCountries: async (_, { paginationInput }, { db }) => {
      const connection = await relayConnectionFromDataGetter(
        async ({ limit, offset }) => {
          const data = await listCountries(db, {
            offset,
            limit,
          });

          return data;
        },
        paginationInput
      );

      return connection as ResolversTypes["CountryConnection"];
    },
  },
  Country: {
    countryName: (parent) => {
      return parent.country_name;
    },
    countryCode: (parent) => {
      return parent.country_code;
    },
    insertedAt: (parent) => {
      return parent.inserted_at;
    },
    updatedAt: (parent) => {
      return parent.updated_at;
    },
  },
};
