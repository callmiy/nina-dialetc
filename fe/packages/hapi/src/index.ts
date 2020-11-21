import { Server, Request, ResponseToolkit } from "@hapi/hapi";
import { API_HOST_PATH } from "@talat/commons/src/routes";

const port = process.env.API_PORT || 3000;
const host = process.env.API_HOST || "localhost";

const init = async () => {
  const server = new Server({
    port,
    host,
  });

  server.route({
    method: "GET",
    path: API_HOST_PATH,
    handler: (_request: Request, _h: ResponseToolkit) => {
      return "Hello World 40000!";
    },
  });

  await server.start();

  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
