import { Server } from "@hapi/hapi";
import { makeApolloServer } from "./server";
import { db } from "../db/db";
import { GRAPHQL_PATH } from "@ta/cm/src/constants";
import { IS_DEV } from "@ta/cm/src/envs";

export async function setUpApollo(appServer: Server) {
  const apolloServer = makeApolloServer({
    db,
    introspection: IS_DEV,
    playground: IS_DEV,
  });

  await apolloServer.applyMiddleware({
    app: appServer,
    path: GRAPHQL_PATH,
  });
}
