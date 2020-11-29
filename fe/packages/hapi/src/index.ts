import { Server } from "@hapi/hapi";
import {
  API_HOST_PATH,
  API_PORT,
  API_HOST,
  RESET_PATH,
  IS_E2E_TEST,
} from "@talat/commons/src/envs";
import { setUpApollo } from "./set-up-apollo";
import { emptyAuths } from "@talat/commons/src/db/index";

const init = async () => {
  const appServer = new Server({
    port: API_PORT,
    host: API_HOST,
  });

  appServer.route({
    method: "GET",
    path: API_HOST_PATH,
    // handler: (_request: Request, _h: ResponseToolkit) => {
    handler: () => {
      return "Hello World 40000!";
    },
  });

  if (IS_E2E_TEST) {
    appServer.route({
      method: "GET",
      path: RESET_PATH,
      handler: async () => {
        await emptyAuths();
        return "ok";
      },
    });
  }

  await setUpApollo(appServer);

  await appServer.start();

  console.log("Server running on %s", appServer.info.uri + API_HOST_PATH);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
