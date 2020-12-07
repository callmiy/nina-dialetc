import { gql } from "@apollo/client/core";

export const listCountriesAndCurrenciesQuery = gql`
  query ListCountriesAndCurrencies(
    $countriesPaginationInput: PaginationInput!
  ) {
    listCountries(paginationInput: $countriesPaginationInput) {
      id
      country_name
    }

    listCurrencies {
      id
      currency_name
      currency_code
    }
  }
`;
