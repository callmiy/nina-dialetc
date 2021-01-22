const { resolve: resolvePath } = require("path");

const ROOT_STRING = "../../..";
const ROOT = resolvePath(__dirname, ROOT_STRING);

function makeRelativeFromRoot(path) {
  return `${ROOT_STRING}/${path}`;
}

function makeAbsFromRoot(path) {
  return `${ROOT}/${path}`;
}

const appName = "nina";

module.exports = {
  ROOT_STRING,
  ROOT,
  makeRelativeFromRoot,
  makeAbsFromRoot,
  appName,
  packages: [
    "commons",
    "cy",
    "data",
    "db-migrations",
    "hapi",
    "pg-promise",
    "svelte-commons",
    "svelte",
  ],
  images: {
    js: {
      all: {
        path: "fe",
        imageName: `${appName}-js-all`,
      },
      base: {
        path: "fe",
        imageName: `${appName}-js-base`,
      },
      commons: {
        path: "fe",
        imageName: `${appName}-js-commons`,
      },
      hapi: {
        path: "fe/packages/hapi",
        imageName: `${appName}-js-hapi`,
        dependentApps: [
          "commons",
          "data",
          "db-migrations",
          "hapi",
          "pg-promise",
        ],
        backend: "hp",
      },
      svelte: {
        path: "fe/packages/svelte",
        imageName: `${appName}-js-svelte`,
        dependentApps: ["commons", "svelte-commons", "svelte"],
        frontend: "sv",
      },
    },
  },
};
