import { writable } from "svelte/store";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/apollo-utils";
import { CountriesState, CurrenciesState } from "@ta/cm/src/types";
import { LOADING_STATE } from "@ta/cm/src/constants";

export const countriesStore = writable<CountriesState>(LOADING_STATE);

export const currenciesStore = writable<CurrenciesState>(LOADING_STATE);

export async function getCountriesCurrenciesStore() {
  const result = await getCountriesCurrencies();

  if (Array.isArray(result)) {
    const [countries, currencies] = result;

    countriesStore.set(countries);
    currenciesStore.set(currencies);
  } else {
    countriesStore.set(result);
    currenciesStore.set(result);
  }
}
