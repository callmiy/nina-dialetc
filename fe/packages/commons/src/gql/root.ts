import gql from "graphql-tag";
import { countrySchema } from "./country";

export const root = gql`
  scalar Date
  scalar DateTime

  type Query {
    _: String
  }
`;

export const typeDefs = [root, countrySchema];
