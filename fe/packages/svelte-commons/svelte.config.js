// const { typescript, replace } = require("svelte-preprocess");
const sveltePreprocessor = require("svelte-preprocess");

// module.exports = {
//   preprocess: [
//     // strip style tag
//     replace([[/<!--[^]*?-->|<style(\s[^]*?)?(?:>([^]*?)<\/style>|\/>)/gi, ""]]),
//     typescript(),
//   ],
// };

module.exports = {
  preprocess: sveltePreprocessor(),
};
