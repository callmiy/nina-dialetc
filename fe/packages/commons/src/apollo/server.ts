import { ApolloServer } from "apollo-server-hapi";
import { typeDefs } from "../gql/schema";
import { resolvers } from "../resolvers/root";
import { ServerContext } from "../types/db";
import dataLoaders from "../data-loaders";
import { DbArg } from "../types/db";

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
        dataLoaders,
      };
    },
  });
}
