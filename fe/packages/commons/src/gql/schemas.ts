import gql from "graphql-tag";

export const countrySchema = gql`
  type Country {
    id: ID!
    country_name: String!
    country_code: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    listCountries: [Country!]!
  }
`;

export const currencySchema = gql`
  type Currency {
    id: ID!
    currency_name: String!
    currency_code: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    listCurrencies: [Currency!]!
  }
`;
