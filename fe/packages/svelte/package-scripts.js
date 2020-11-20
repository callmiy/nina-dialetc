/* eslint-disable @typescript-eslint/no-var-requires */

const webPort = process.env.WEB_PORT || "";

module.exports = {
  scripts: {
    d: {
      // The HOST=0.0.0.0 environment variable is required to access app
      // running in container. Without this environment variable, sirv will
      // not export the app running inside the container to the docker host
      script: `PORT=${webPort} HOST=0.0.0.0 rollup -c -w`,
      description: `Start the development server`,
    },
    b: {
      script: `rollup -c`,
      description: `Build the project`,
    },
    s: {
      script: `sirv public`,
      description: `serve the public folder`,
    },
    v: {
      script: `svelte-check`,
      description: `svelte check validate project`,
    },
  },
};
