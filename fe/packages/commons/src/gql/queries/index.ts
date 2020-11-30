import gql from "graphql-tag";

export const listCountriesQuery = gql`
  query ListCountries {
    listCountries {
      id
      name
      curr_name
      curr_code
    }
  }
`;
