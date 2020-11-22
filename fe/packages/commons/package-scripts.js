/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  scripts: {
    tc: {
      default: "tsc --project .",
    },
    lint: {
      script: "eslint . --ext .js,.jsx,.ts,.tsx",
      description: "eslint lint this project",
    },
  },
};
