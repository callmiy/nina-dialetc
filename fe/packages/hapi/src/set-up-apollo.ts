import { Server } from "@hapi/hapi";
import { ApolloServer } from "apollo-server-hapi";
import { typeDefsAndResolvers } from "@talat/commons/src/gql/schema";
import { GRAPHQL_PATH } from "@talat/commons/src/routes";

const { NODE_ENV } = process.env;
const IS_DEV = NODE_ENV === "development";

export async function setUpApollo(appServer: Server) {
  const apolloServer = new ApolloServer({
    ...typeDefsAndResolvers,
    introspection: IS_DEV,
    playground: IS_DEV,
  });
  await apolloServer.applyMiddleware({
    app: appServer,
    path: GRAPHQL_PATH,
  });

  await apolloServer.installSubscriptionHandlers(appServer.listener);
}
