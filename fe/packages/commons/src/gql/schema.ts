import { mergeResolvers } from "@graphql-tools/merge";
import { countryResolver } from "../resolvers/country";
import { rootResolvers } from "../resolvers/root";
import { rootSchema } from "./root";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolvers = mergeResolvers([rootResolvers as any, countryResolver]);

export const typeDefsAndResolvers = {
  typeDefs: rootSchema,
  resolvers,
};
