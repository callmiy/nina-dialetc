import { ApolloServer } from "apollo-server-hapi";
import { typeDefs } from "@ta/cm/src/gql/schema";
import { resolvers } from "../resolvers/root";
import { ServerContext, DbArg } from "../types";
// import dataLoaders from "../data-loaders";

export function makeApolloServer({
  db,
  introspection = false,
  playground = false,
}: {
  db: DbArg;
  introspection?: boolean;
  playground?: boolean;
}) {
  return new ApolloServer({
    typeDefs,
    resolvers,
    introspection,
    playground,
    context: async (): Promise<ServerContext> => {
      return {
        db,
        // dataLoaders,
      };
    },
  });
}
