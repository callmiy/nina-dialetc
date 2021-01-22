import { DateResolver, DateTimeResolver } from "graphql-scalars";
import { Resolvers } from "../schema-types";
import { countryResolver } from "./country.resolver";
import { currencyResolver } from "./currency.resolver";
import { ownerResolver } from "./owner.resolver";

export const rootResolvers: Resolvers = {
  Date: DateResolver,
  DateTime: DateTimeResolver,

  Query: {},
};

export const resolvers = [
  //
  rootResolvers,
  countryResolver,
  currencyResolver,
  ownerResolver,
];
