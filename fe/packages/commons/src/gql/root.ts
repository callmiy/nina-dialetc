import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date
  scalar DateTime

  type Country {
    id: ID!
    country_name: String!
    country_code: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
    post_codes: [PostCode]
  }

  type Currency {
    id: ID!
    currency_name: String!
    currency_code: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type PostCode {
    id: ID!
    post_code: String!
    city: String!
    state: String!
    country_id: ID!
    country: Country
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    listCountries: [Country]!
    listCurrencies: [Currency]!
  }
`;
