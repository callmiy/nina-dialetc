const { resolve: resolvePath } = require("path");
const commonScripts = require("../../js-commons/_package-scripts");

const tsConfig = `TS_NODE_COMPILER_OPTIONS='{"module":"commonjs", "isolatedModules": false}'`;

const genServerOutput = resolvePath(__dirname, "./src/schema-types.ts");

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    cgi: {
      script: `yarn graphql-codegen init`,
      description: `Initialize graphql code generator`,
    },
    gs: {
      script: `${tsConfig} graphql-codegen --config codegen.yml && \
        yarn prettier --write ${genServerOutput}`,
      description: `Generate server schema graphql typescript types`,
    },
    test: {
      default: {
        script: `NODE_ENV=test jest test --watch --runInBand`,
        description: `Jest test watch`,
      },
      t: {
        script: `NODE_ENV=test jest test --runInBand`,
        description: `Jest test but do not watch`,
      },
      c: {
        script: `NODE_ENV=test jest test --runInBand --coverage`,
        description: `Jest test coverage but do not watch`,
      },
    },
  },
};
