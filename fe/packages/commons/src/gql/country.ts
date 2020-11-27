import gql from "graphql-tag";

export const countrySchema = gql`
  type Country {
    id: ID!
    name: String!
    code: String!
    curr_name: String!
    curr_code: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    listCountries: [Country!]!
  }
`;
