/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ListCountriesAndCurrencies
// ====================================================

export interface ListCountriesAndCurrencies_listCountries {
  __typename: "Country";
  id: string;
  country_name: string;
}

export interface ListCountriesAndCurrencies_listCurrencies {
  __typename: "Currency";
  id: string;
  currency_name: string;
  currency_code: string;
}

export interface ListCountriesAndCurrencies {
  listCountries: (ListCountriesAndCurrencies_listCountries | null)[];
  listCurrencies: (ListCountriesAndCurrencies_listCurrencies | null)[];
}

export interface ListCountriesAndCurrenciesVariables {
  countriesPaginationInput: PaginationInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface PaginationInput {
  first?: number | null;
  last?: number | null;
  before?: string | null;
  after?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
