import { gql } from "@apollo/client/core";

export const listCountriesAndCurrenciesQuery = gql`
  query ListCountriesAndCurrencies {
    listCountries {
      id
      country_name
      post_codes {
        id
        post_code
        city
        state
        country_id
      }
    }

    listCurrencies {
      id
      currency_name
      currency_code
    }
  }
`;
