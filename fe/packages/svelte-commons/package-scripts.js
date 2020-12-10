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
        script: `jest --clear-cache \
          && NODE_ENV=test jest --runInBand --watch`,
      },
      t: {
        script: `jest --clear-cache && jest --runInBand`,
      },
    },
  },
};
