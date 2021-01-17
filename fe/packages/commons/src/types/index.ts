import { graphql, SetupWorkerApi } from "msw";
import { InMemoryCache, ApolloClient } from "@apollo/client/core";
import { DataVal, ErrorsVal, LoadingVal } from "../constants";
import {
  BranchFragment,
  BrandFragment,
  CountryFragment,
  CurrencyFragment,
} from "../gql/ops-types";
import { PageInfo } from "../gql/schema-types";
// import {  } from "cypress/types/chai/index" ;

// ====================================================
// START UTILITY GENERIC TYPES
// ====================================================
export type Await<T> = T extends PromiseLike<infer U> ? U : T;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type Any = Record<string, unknown>;
// ====================================================
// END UTILITY GENERIC TYPES
// ====================================================

// ====================================================
// START NINA
// ====================================================
export const CYPRESS_NINA_KEY = "@nina/cypress-key";

export type MswGraphql = typeof graphql;
export type MswSetupWorkerApi = SetupWorkerApi;

export type NinaGlobals = {
  logApolloQueries?: boolean;
  cache?: InMemoryCache;
  client?: ApolloClient<Any>;
  mswBrowserWorker?: MswSetupWorkerApi;
  mswGraphql?: MswGraphql;
};

declare global {
  interface Window {
    ____nina: NinaGlobals;
    Cypress: {
      env: <T>(k?: string, v?: T) => void | T;
    };
  }
}
// ====================================================
// END NINA
// ====================================================

export type CountryEntity = {
  id: string;
  country_name: string;
  country_code: string;
  updated_at: string;
  inserted_at: string;
};

export type CurrencyEntity = {
  id: string;
  currency_name: string;
  currency_code: string;
  updated_at: string;
  inserted_at: string;
};

export type CountriesResolvedData = {
  countries: CountryFragment[];
  pageInfo: PageInfo;
  error?: string;
};

export type CurrenciesResolvedData = {
  currencies: CurrencyFragment[];
  pageInfo: PageInfo;
  error?: string;
};

export type CountriesState = CountryStateData | LoadingState | StringErrorState;

export type CountryStateData = {
  value: DataVal;
  data: CountriesResolvedData;
};

export type CurrenciesState =
  | CurrencyStateData
  | LoadingState
  | StringErrorState;

export type CurrencyStateData = {
  value: DataVal;
  data: CurrenciesResolvedData;
};

export type StringErrorState = {
  value: ErrorsVal;
  error: string;
};

export type LoadingState = {
  value: LoadingVal;
  msg: string;
};

// ====================================================
// BRANCH SECTION
// ====================================================

export type BranchState = BranchStateData | LoadingState | StringErrorState;

export type BranchStateData = {
  value: DataVal;
  data: BranchesResolvedData;
};

export type BranchesResolvedData = {
  branches: BranchFragment[];
  pageInfo: PageInfo;
  error?: string;
};

// ====================================================
// END BRANCH SECTION
// ====================================================

// ====================================================
// BRAND SECTION
// ====================================================
export type BrandState = BrandStateData | LoadingState | StringErrorState;

export type BrandStateData = {
  value: DataVal;
  data: BrandResolvedData;
};

export type BrandResolvedData = {
  brands: BrandFragment[];
  pageInfo: PageInfo;
  error?: string;
};
// ====================================================
// END BRAND SECTION
// ====================================================
