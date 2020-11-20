/* eslint-disable @typescript-eslint/no-var-requires */

const webPort = process.env.WEB_PORT || "";

module.exports = {
  scripts: {
    d: {
      script: `PORT=${webPort} sapper dev`,
      description: `Start the development server`,
    },
    b: {
      script: `sapper build --legacy`,
      description: `Build the project`,
    },
    s: {
      script: `node __sapper__/build`,
      description: `serve the build`,
    },
    v: {
      script: `svelte-check --ignore src/node_modules/@sapper`,
      description: `svelte check validate project`,
    },
    e: {
      script: `sapper export --legacy`,
      description: `export the project as SPA`,
    },
  },
};
