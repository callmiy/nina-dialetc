/* eslint-disable @typescript-eslint/no-var-requires */
const commonScripts = require("../../package-commons-scripts");

const knexTsConfig = `TS_NODE_COMPILER_OPTIONS='{"module":"commonjs", "isolatedModules": false}'`;

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    cgi: {
      script: `yarn graphql-codegen init`,
      description: `Initialize graphql code generator`,
    },
    cg: `${knexTsConfig} graphql-codegen --config codegen.yml`,
  },
};
