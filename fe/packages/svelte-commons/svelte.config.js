/* eslint-disable @typescript-eslint/no-var-requires */

const { scss, typescript, replace } = require("svelte-preprocess");

const scssConfig = {
  includePaths: ["node_modules", "src"],
  implementation: require("sass"),
};

module.exports = {
  preprocess: [
    // strip style tag
    replace([[/<!--[^]*?-->|<style(\s[^]*?)?(?:>([^]*?)<\/style>|\/>)/gi, ""]]),
    typescript(),
    scss(scssConfig),
  ],
};
