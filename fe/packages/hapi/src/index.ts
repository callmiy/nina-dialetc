import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { API_HOST_PATH, API_PORT, API_HOST } from "@talat/commons/src/envs";
import { setUpApollo } from "./set-up-apollo";

const init = async () => {
  const appServer = new Server({
    port: API_PORT,
    host: API_HOST,
  });

  appServer.route({
    method: "GET",
    path: API_HOST_PATH,
    handler: (_request: Request, _h: ResponseToolkit) => {
      return "Hello World 40000!";
    },
  });

  await setUpApollo(appServer);

  await appServer.start();

  console.log("Server running on %s", appServer.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
