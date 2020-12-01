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
  listCountries: ListCountriesAndCurrencies_listCountries[];
  listCurrencies: ListCountriesAndCurrencies_listCurrencies[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
