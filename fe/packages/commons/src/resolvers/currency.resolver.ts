import { listCurrencies } from "../db";

export const currencyResolver = {
  Query: {
    listCurrencies: async () => {
      const data = await listCurrencies();
      return data;
    },
  },
};
