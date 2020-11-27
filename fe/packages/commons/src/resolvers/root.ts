/* eslint-disable @typescript-eslint/no-explicit-any */

import { Resolvers } from "../gql-types";
import { DateResolver, DateTimeResolver } from "graphql-scalars";

export const rootResolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,

  Query: {},
} as Resolvers;
