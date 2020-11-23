/* eslint-disable @typescript-eslint/no-var-requires */

const exts = ".ts,.js";
const babelExts = ` --extensions ${exts} `;
const babelCompile = ` --only ./src/**,../commons/src/** `;
const babelRoot = `--root-mode upward`;
const entry = ` ./src/index.ts `;

module.exports = {
  scripts: {
    d: {
      script: `nodemon --verbose --exec \
        babel-node ${babelRoot} ${babelExts} ${babelCompile} ${entry}`,
      description: `start development server`,
    },
  },
};
