const path = require("path");

const jestBabelTransform = path.resolve(
  __dirname,
  "../../jestBabelTransform.js"
);

module.exports = {
  displayName: "@ta/pg-promise",
  // projects: ["<rootDir>/../commons/jest.config.js", "<rootDir>/jest.config.js"],
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.(ts|js)", "!src/__tests__/**"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js"],
  testEnvironment: "node",
  testRegex: "src/__tests__/.+?\\.test\\.[tj]s$",
  transform: {
    "^.+\\.ts$": jestBabelTransform,
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules*",
    "<rootDir>/package\\.json",
    "<rootDir>/package-scripts\\.js",
    "<rootDir>/jest\\.config\\.js",
    "<rootDir>/coverage/",
    "<rootDir>/tsconfig\\.json/",
  ],
};
