import gql from "graphql-tag";

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
