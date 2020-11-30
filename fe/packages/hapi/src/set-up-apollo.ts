import { Server } from "@hapi/hapi";
import { ApolloServer } from "apollo-server-hapi";
import { typeDefs } from "@ta/cm/src/gql/root";
import { rootResolvers } from "@ta/cm/src/resolvers/root";
import { countryResolver } from "@ta/cm/src/resolvers/country.resolver";
import { IS_DEV } from "@ta/cm/src/envs";
import { GRAPHQL_PATH } from "@ta/cm/src/constants";

export async function setUpApollo(appServer: Server) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers: [rootResolvers, countryResolver],
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

  await apolloServer.installSubscriptionHandlers(appServer.listener);
}
