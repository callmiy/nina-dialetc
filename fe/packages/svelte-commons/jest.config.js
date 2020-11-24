/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

const jestBabelTransform = path.resolve(__dirname, "./jestBabelTransform.js");

module.exports = {
  clearMocks: true,
  collectCoverageFrom: ["src/**/*.(ts|svelte|js)", "!src/__tests__/**"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["svelte", "ts", "js", "tsx"],
  testEnvironment: "jest-environment-jsdom-sixteen",
  testRegex: "src/__tests__/.+?\\.test\\.[tj]sx?$",
  transform: {
    "^.+\\.jsx?$": jestBabelTransform,
    "^.+\\.tsx?$": jestBabelTransform,
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
  },
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules*",
    "<rootDir>/package.json",
    "<rootDir>/jest\\.config\\.js",
    "<rootDir>/rollup\\.config\\.js",
    "<rootDir>/coverage/",
    "<rootDir>/tsconfig\\.json/",
  ],
};
