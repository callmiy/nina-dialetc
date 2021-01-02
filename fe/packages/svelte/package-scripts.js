const commonScripts = require("../../js-commons/_package-scripts");

const webPort = process.env.WEB_PORT || "";

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    d: `webpack-dev-server --content-base public --port ${webPort} --host 0.0.0.0`,
    b: "cross-env NODE_ENV=production webpack",
    v: {
      script: `svelte-check`,
      description: `svelte check validate project`,
    },
  },
};
