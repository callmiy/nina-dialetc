import { DateResolver, DateTimeResolver } from "graphql-scalars";

export const rootResolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,

  Query: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
