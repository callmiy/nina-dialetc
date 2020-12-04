const commonScripts = require("../../package-commons-scripts");

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    test: {
      default: {
        script: `NODE_ENV=test jest --runInBand --watchAll`,
        description: `Run tests in watch mode`,
      },
      t: {
        script: `NODE_ENV=test jest --runInBand`,
        description: `Run tests and exit`,
      },
    },
  },
};
