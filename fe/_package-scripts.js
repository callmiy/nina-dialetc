module.exports = {
  scripts: {
    tc: {
      default: "tsc --noEmit true --project .",
      description: `typecheck this project`,
    },
    lint: {
      script: `eslint . \
        --ext .js,.jsx,.ts,.tsx \
        --ignore-pattern **build** \
        --ignore-pattern **__sapper__**
      `,
      description: "eslint lint this project",
    },
    p: {
      script: `prettier --write .`,
      description: "prettify",
    },
    s: {
      script: `sort-package-json package.json`,
      description: `Sort package json`,
    },
  },
};
