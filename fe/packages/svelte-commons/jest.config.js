const _config = require("../../_jest.config");

const { debug } = process.env;

const config = {
  ..._config,
  displayName: "@ta/svelte-commons",
};

config.transform["^.+\\.svelte$"] = [
  "svelte-jester",
  {
    preprocess: true,
    debug: !!debug,
  },
];

config.moduleFileExtensions.push("svelte");

module.exports = config;
