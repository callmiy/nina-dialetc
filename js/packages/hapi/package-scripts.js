const { resolve: resolvePath } = require("path");
const commonScripts = require("../../js-commons/_package-scripts");

const dependentApps = [
  //
  "commons",
  "data",
  "pg-promise",
]
  .map((app) => {
    return `../${app}/src/**`;
  })
  .join(",");

const entry = ` ./src/index.ts `;
const exts = ".ts,.js";
const babelExts = ` --extensions ${exts} `;
const babelCompile = ` --only ./src/**,${dependentApps} `;

const babelRoot = `--config-file ${resolvePath(
  "../../js-commons/_babel.config"
)}`;

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
