import { Server } from "@hapi/hapi";
import { API_PORT, API_HOST, IS_E2E_TEST } from "@ta/cm/src/envs";
import { API_HOST_PATH, RESET_PATH } from "@ta/cm/src/constants";
import { setUpApollo } from "./apollo-server";
import { emptyAuths } from "@ta/cm/src/db/index";

const init = async () => {
  const appServer = new Server({
    port: API_PORT,
    host: API_HOST,
  });

  if (IS_E2E_TEST) {
    appServer.route({
      method: "GET",
      path: RESET_PATH,
      // handler: (_request: Request, _h: ResponseToolkit) => {
      handler: async () => {
        await emptyAuths();
        return "ok";
      },
    });
  }

  await setUpApollo(appServer);

  await appServer.start();

  console.log(
    "\n\nServer running on %s",
    appServer.info.uri + API_HOST_PATH,
    "\n\n"
  );
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
