/* eslint-disable @typescript-eslint/no-var-requires */

const sveltePreprocess = require("svelte-preprocess");

const scssConfig = {
  includePaths: ["node_modules", "src"],
  implementation: require("sass"),
};

module.exports = {
  preprocess: sveltePreprocess({
    typescript: {
      // skips type checking, except in production
      transpileOnly: process.env.NODE_ENV !== "production",
    },
    scss: scssConfig,
  }),
};
