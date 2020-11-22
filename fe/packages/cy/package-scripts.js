/* eslint-disable @typescript-eslint/no-var-requires */

const { CYPRESS_BROWSER: browser } = process.env;

const browserOpt = browser ? ` --browser ${browser}` : "";

module.exports = {
  scripts: {
    default: {
      script: `cypress open ${browserOpt}`,
      description: `cypress test for daily development`,
    },
    tc: {
      default: "tsc --project .",
    },
    lint: {
      script: "eslint . --ext .js,.jsx,.ts,.tsx",
      description: "eslint lint this project",
    },
  },
};
