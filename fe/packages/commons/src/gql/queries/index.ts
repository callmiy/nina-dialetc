import { gql } from "@apollo/client/core";

export const listCountriesAndCurrenciesQuery = gql`
  query ListCountriesAndCurrencies {
    listCountries {
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
