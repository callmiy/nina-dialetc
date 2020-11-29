/* eslint-disable @typescript-eslint/no-var-requires */
const commonScripts = require("../../package-commons-scripts");

const exts = ".ts,.js";
const babelExts = ` --extensions ${exts} `;
const babelCompile = ` --only ./src/**,../commons/src/**,../pg-promise/src/** `;
const babelRoot = `--root-mode upward`;
const entry = ` ./src/index.ts `;

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    d: {
      script: `nodemon --verbose --exec \
        babel-node ${babelRoot} ${babelExts} ${babelCompile} ${entry}`,
      description: `start development server`,
    },
  },
};
