import { Server } from "@hapi/hapi";
import { ApolloServer } from "apollo-server-hapi";
import { typeDefs } from "@ta/cm/src/gql/root";
import { resolvers } from "@ta/cm/src/resolvers/root";
import { IS_DEV } from "@ta/cm/src/envs";
import { GRAPHQL_PATH } from "@ta/cm/src/constants";

export async function setUpApollo(appServer: Server) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: IS_DEV,
    playground: IS_DEV,
    context: async () => {
      return {};
    },
  });

  await apolloServer.applyMiddleware({
    app: appServer,
    path: GRAPHQL_PATH,
  });

  // await apolloServer.installSubscriptionHandlers(appServer.listener);
}
