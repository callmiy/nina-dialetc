const path = require("path");
const commonScripts = require("../../_package-scripts");

const exts = ".ts,.js";
const babelExts = ` --extensions ${exts} `;
const babelCompile = ` --only ./src/**,../commons/src/**,../pg-promise/src/** `;
// const babelRoot = `--root-mode upward`;
const babelRoot = `--config-file ${path.resolve("../../_babel.config")}`;
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
