import gql from "graphql-tag";
import { countrySchema, currencySchema } from "./schemas";

export const root = gql`
  scalar Date
  scalar DateTime

  type Query {
    _: String
  }
`;

export const typeDefs = [root, countrySchema, currencySchema];
