/* eslint-disable @typescript-eslint/no-var-requires */
const commonScripts = require("../../package-commons-scripts");

const webPort = process.env.WEB_PORT || "";

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    d: `PORT=${webPort} webpack-dev-server --content-base public`,
    b: "cross-env NODE_ENV=production webpack",
    v: {
      script: `svelte-check`,
      description: `svelte check validate project`,
    },
  },
};
