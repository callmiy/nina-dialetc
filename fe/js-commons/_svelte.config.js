const preprocess = require("svelte-preprocess");

module.exports = {
  preprocess: preprocess({
    scss: false // svelte tests wouldn't run without this
  }),
};
