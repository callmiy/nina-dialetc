import { getCountriesCurrencies } from "@ta/cm/src/apollo/apollo-utils";
import {
  COUNTRIES_LOADING_MSG,
  CURRENCIES_LOADING_MSG,
  LOADING_STATE,
} from "@ta/cm/src/constants";
import {
  CountriesState,
  CountryStateData,
  CurrenciesState,
  CurrencyStateData,
  LoadingState,
  StringErrorState,
} from "@ta/cm/src/types";
import { writable, Writable } from "svelte/store";

const initialCountriesState = {
  ...LOADING_STATE,
  msg: COUNTRIES_LOADING_MSG,
};

export const countriesStore = writable<CountriesState>(initialCountriesState);
export const countriesStoreData = countriesStore as Writable<CountryStateData>;
export const countriesStoreLoading = countriesStore as Writable<LoadingState>;
export const countriesStoreError = countriesStore as Writable<StringErrorState>;

const initialCurrenciesState = {
  ...LOADING_STATE,
  msg: CURRENCIES_LOADING_MSG,
};

export const currenciesStore = writable<CurrenciesState>(
  initialCurrenciesState
);
export const currenciesStoreData = currenciesStore as Writable<
  CurrencyStateData
>;
export const currenciesStoreLoading = currenciesStore as Writable<LoadingState>;
export const currenciesStoreError = currenciesStore as Writable<
  StringErrorState
>;

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
