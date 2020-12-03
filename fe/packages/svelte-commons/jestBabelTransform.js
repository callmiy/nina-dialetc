const path = require("path");
const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
  configFile: path.resolve("../../_babel.config.js"),
});
