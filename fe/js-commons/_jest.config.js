const path = require("path");

const jestBabelTransform = path.resolve(
  __dirname,
  "./jestBabelTransform.js"
);

module.exports = {
  collectCoverageFrom: ["src/**/*.(ts|svelte|js)", "!src/__tests__/**"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "js", "tsx"],
  testEnvironment: "node",
  testRegex: "src/__tests__/.+?\\.test\\.[tj]sx?$",
  transform: {
    "^.+\\.[tj]sx?$": jestBabelTransform,
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules*",
    "<rootDir>/package\\.json",
    "<rootDir>/package-scripts\\.js",
    "<rootDir>/jest\\.config\\.js",
    "<rootDir>/rollup\\.config\\.js",
    "<rootDir>/svelte\\.config\\.js",
    "<rootDir>/coverage/",
    "<rootDir>/tsconfig\\.json/",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
