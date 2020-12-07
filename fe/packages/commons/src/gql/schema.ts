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
  }

  type Currency {
    id: ID!
    currency_name: String!
    currency_code: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type PaginationInput {
    first: Int
    last: Int
    before: String
    after: String
  }

  type PageInfo {
    startCursor: String!
    endCursor: String!
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
  }

  type CountryEdge {
    node: Country!
    cursor: String!
  }

  type CountryConnection {
    entries: [CountryEdge]!
    pageInfo: PageInfo!
  }

  type Query {
    listCountries: [Country]!
    listCurrencies: [Currency]!
  }
`;
