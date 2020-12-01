import { listCountries } from "../db";

export const countryResolver = {
  Query: {
    listCountries: async () => {
      const data = await listCountries();
      return data;
    },
  },
};
