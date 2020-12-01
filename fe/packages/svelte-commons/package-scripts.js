/* eslint-disable @typescript-eslint/no-var-requires */
const commonScripts = require("../../package-commons-scripts");

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    b: {
      script: `rollup -c`,
      description: `Build the project`,
    },
    v: {
      script: `svelte-check`,
      description: `svelte check validate project`,
    },
    test: {
      default: {
        script: `NODE_ENV=test jest --runInBand --watch`,
      },
      t: {
        script: `jest --runInBand`,
      },
    },
  },
};
