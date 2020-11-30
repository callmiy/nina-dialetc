import { listCountries } from "../db";

export const countryResolver = {
  Query: {
    listCountries: async () => {
      return await listCountries();
    },
  },
};
