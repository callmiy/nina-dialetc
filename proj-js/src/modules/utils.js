const { resolve: resolvePath } = require("path");

const ROOT_STRING = "../../..";
const ROOT = resolvePath(__dirname, ROOT_STRING);

const packages = [
  "commons",
  "cy",
  "data",
  "db-migrations",
  "hapi",
  "pg-promise",
  "svelte-commons",
  "svelte",
];

function makeRelativeFromRoot(path) {
  return `${ROOT_STRING}/${path}`;
}

function makeAbsFromRoot(path) {
  return `${ROOT}/${path}`;
}

const appName = "nina";

const imagesProperties = {
  js: {
    all: {
      path: "fe",
      imageName: `${appName}-js-all`,
      dependentApps: [
        //
        "commons",
        "data",
        "db-migrations",
        "hapi",
        "pg-promise",
        "svelte-commons",
        "svelte",
      ],
    },
    base: {
      path: "fe",
      imageName: `${appName}-js-base`,
    },
    commons: {
      path: "fe",
      imageName: `${appName}-js-commons`,
      ignoreVolumeDirectories: [
        //
        "coverage",
      ],
    },
    hapi: {
      path: "fe/packages/hapi",
      imageName: `${appName}-js-hapi`,
      dependentApps: [
        //
        "commons",
        "data",
        "db-migrations",
        "hapi",
        "pg-promise",
      ],
      backend: "hp",
      dependentImages: [
        //
        "db",
      ],
      ports: [
        //
        "${API_PORT}:${API_PORT}",
      ],
      ignoreVolumeDirectories: [
        //
        "coverage",
        "build",
      ],
    },
    svelte: {
      path: "fe/packages/svelte",
      imageName: `${appName}-js-svelte`,
      dependentApps: [
        //
        "commons",
        "svelte-commons",
        "svelte",
      ],
      frontend: "sv",
      ports: ["${WEB_PORT}:${WEB_PORT}"],
      ignoreVolumeDirectories: [
        //
        "build",
      ],
    },
    "svelte-commons": {
      ignoreVolumeDirectories: [
        //
        "coverage",
      ],
    },
    data: {
      ignoreVolumeDirectories: [
        //
        "coverage",
      ],
    },
    "pg-promise": {
      ignoreVolumeDirectories: [
        //
        "coverage",
      ],
    },
    cy: {
      //
    },
    "db-migrations": {
      //
    },
  },
};

module.exports = {
  ROOT_STRING,
  ROOT,
  makeRelativeFromRoot,
  makeAbsFromRoot,
  appName,
  packages,
  images: imagesProperties,
};
