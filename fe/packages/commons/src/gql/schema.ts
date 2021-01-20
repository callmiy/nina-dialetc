import { gql } from "@apollo/client/core";

export const typeDefs = gql`
  scalar Date
  scalar DateTime

  type Owner {
    ownerId: ID!
    email: String!
    jwt: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Country {
    id: ID!
    countryName: String!
    countryCode: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Currency {
    id: ID!
    currencyName: String!
    currencyCode: String!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type UnitOfMeasure {
    id: ID!
    ownerId: ID!
    shortName: String!
    longName: String
  }

  type UnitOfMeasureTag {
    unitOfMeasureId: ID!
    text: String!
  }

  type Branch {
    id: ID!
    postCode: String!
    street: String!
    city: String!
    branchAlias: String
    phone: String
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Brand {
    id: ID!
    name: String!
    countryId: ID!
    country: Country!
    currencyId: ID!
    currency: Currency!
    phone: String
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type Article {
    id: ID!
    specificName: String!
    currentPrice: Float!
    deleted: Boolean
    insertedAt: DateTime!
    updatedAt: DateTime!
    unitOfMeasure: UnitOfMeasure!
    tags: [Tag]!
    branchInfo: [ArticleBranch]!
  }

  type Tag {
    id: ID!
    name: String!
  }

  type ArticleBranch {
    id: ID!
    branchId: ID!
    articleId: ID!
    unitPrice: Float!
    insertedAt: DateTime!
    updatedAt: DateTime!
  }

  type PageInfo {
    startCursor: String
    endCursor: String
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
  }

  type CountryEdge {
    node: Country!
    cursor: String!
  }

  type CountryConnection {
    edges: [CountryEdge]!
    pageInfo: PageInfo!
  }

  type BranchEdge {
    node: Branch!
    cursor: String!
  }

  type BranchConnection {
    edges: [BranchEdge]!
    pageInfo: PageInfo!
  }

  type BrandEdge {
    node: Brand!
    cursor: String!
  }

  type BrandConnection {
    edges: [BrandEdge]!
    pageInfo: PageInfo!
  }

  # ====================================================
  # Signup Mutation
  # ====================================================

  union SignupUnion = SignupSuccess | SignupErrors

  type SignupSuccess {
    owner: Owner!
  }

  type SignupErrors {
    errors: [String!]!
  }

  input SignupInput {
    email: String!
    password: String!
    repeatPassword: String!
  }

  input PaginationInput {
    first: Int
    last: Int
    before: String
    after: String
  }

  type Query {
    listCountries(paginationInput: PaginationInput!): CountryConnection!
    listCurrencies: [Currency]!
    listBranches(paginationInput: PaginationInput!): BranchConnection!
    listBrands(paginationInput: PaginationInput!): BrandConnection!
  }

  type Mutation {
    signup(input: SignupInput!): SignupUnion
  }
`;
