import { makeApolloClient } from "./client";
import {
  CountryFragment,
  CurrencyFragment,
  ListCountriesAndCurrencies,
  ListCountriesAndCurrenciesVariables,
  ListCountriesAndCurrencies_listCountries_edges,
} from "../gql/ops-types";
import { errorToString } from "../utils";
import {
  CountriesState,
  CurrenciesState,
  StringErrorState,
  Await,
} from "../types";
import { listCountriesAndCurrenciesQuery } from "../gql/queries/countries-currencies.query";
import {
  COUNTRIES_FETCHING_FAILED,
  CURRENCIES_FETCHING_FAILED,
  DATA_FETCHING_FAILED,
  StateValue,
} from "../constants";
import { PageInfo } from "../gql/schema-types";

export async function getCountriesCurrencies(): Promise<
  [CountriesState, CurrenciesState] | StringErrorState
> {
  const { client } = makeApolloClient();

  try {
    const { data } = await client.query<
      ListCountriesAndCurrencies,
      ListCountriesAndCurrenciesVariables
    >({
      query: listCountriesAndCurrenciesQuery,
      variables: {
        countriesPaginationInput: {
          first: 20,
        },
      },
    });

    let countries = (undefined as unknown) as CountriesState;
    let currencies = (undefined as unknown) as CurrenciesState;

    if (data) {
      const { listCountries, listCurrencies } = data;

      if (listCountries) {
        const l = ((listCountries.edges ||
          []) as ListCountriesAndCurrencies_listCountries_edges[]).map((e) => {
          const node = (e as ListCountriesAndCurrencies_listCountries_edges)
            .node as CountryFragment;
          return node;
        });

        countries = {
          value: StateValue.data,
          data: {
            countries: l,
            pageInfo: listCountries.pageInfo,
          },
        };
      } else {
        countries = {
          value: StateValue.errors,
          error: COUNTRIES_FETCHING_FAILED,
        };
      }

      if (listCurrencies) {
        const c = listCurrencies.map((e) => {
          return e as CurrencyFragment;
        });

        currencies = {
          value: StateValue.data,
          data: {
            currencies: c,
            pageInfo: {} as PageInfo,
          },
        };
      } else {
        currencies = {
          value: StateValue.errors,
          error: CURRENCIES_FETCHING_FAILED,
        };
      }
    }

    if (!(currencies || countries)) {
      return {
        value: StateValue.errors,
        error: DATA_FETCHING_FAILED,
      };
    }

    return [countries, currencies];
  } catch (error) {
    return {
      value: StateValue.errors,
      error: errorToString(error),
    };
  }
}

export type GetCountriesCurrencies = Await<
  ReturnType<typeof getCountriesCurrencies>
>;
