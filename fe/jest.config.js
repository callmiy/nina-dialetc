const { TEST_APPS = "" } = process.env;

const appsMap = {
  cm: "<rootDir>/packages/commons/jest.config.js",
  pp: "<rootDir>/packages/pg-promise/jest.config.js",
  sc: "<rootDir>/packages/svelte-commons/jest.config.js",
};

const projects = [];

TEST_APPS.split(",").forEach((app) => {
  projects.push(appsMap[app]);
});

module.exports = {
  projects,
};
