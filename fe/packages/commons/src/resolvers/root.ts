import { DateResolver, DateTimeResolver } from "graphql-scalars";
import { countryResolver } from "./country.resolver";
import { currencyResolver } from "./currency.resolver";

export const rootResolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,

  Query: {},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const resolvers = [rootResolvers, countryResolver, currencyResolver];
