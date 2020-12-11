import { writable } from "svelte/store";
import { getCountriesCurrencies } from "@ta/cm/src/apollo/apollo-utils";
import { CountriesState, CurrenciesState } from "@ta/cm/src/types";
import {
  LOADING_STATE,
  CURRENCIES_LOADING_MSG,
  COUNTRIES_LOADING_MSG,
} from "@ta/cm/src/constants";

const initialCountriesState = {
  ...LOADING_STATE,
  msg: COUNTRIES_LOADING_MSG,
};

export const countriesStore = writable<CountriesState>(initialCountriesState);

const initialCurrenciesState = {
  ...LOADING_STATE,
  msg: CURRENCIES_LOADING_MSG,
};

export const currenciesStore = writable<CurrenciesState>(
  initialCurrenciesState
);

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

// used to reset the stores during tests :TODO: find a better way
export function resetCountriesCurrenciesStore() {
  countriesStore.set(initialCountriesState);
  currenciesStore.set(initialCurrenciesState);
}
