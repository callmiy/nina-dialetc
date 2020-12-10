const path = require("path");
const _config = require("../../_jest.config");

const { debug } = process.env;

const config = {
  ..._config,
  displayName: "@ta/svelte-commons",
};

config.transform["^.+\\.svelte$"] = [
  "svelte-jester",
  {
    preprocess: path.resolve(__dirname, "../../_svelte.config.js"),
    debug: !!debug,
  },
];

config.moduleFileExtensions.push("svelte");

module.exports = config;
