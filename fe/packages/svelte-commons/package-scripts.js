const path = require("path");
const commonScripts = require("../../package-commons-scripts");

const svelteConfigFilePath = path.resolve(__dirname, "./svelte.config");
const svelteTransform = `-r ../commons/src/test-utils/transform-svelte`;

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
    u: {
      default: {
        script: `SVELTE_CONFIG_PATH=${svelteConfigFilePath} \
          uvu ./src/-tests- -r ts-node/register ${svelteTransform} \
          `,
      },
    },
  },
};
