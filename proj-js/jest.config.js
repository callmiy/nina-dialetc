module.exports = {
  collectCoverageFrom: ["src/**/*.js"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js"],
  testEnvironment: "node",
  testRegex: "tests/.+?\\.test\\.[j]s?$",
  watchPathIgnorePatterns: [
    "<rootDir>/node_modules*",
    "<rootDir>/package\\.json",
    "<rootDir>/jest\\.config\\.js",
    "<rootDir>/coverage/",
  ],
};
