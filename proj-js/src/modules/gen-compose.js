const { resolve: resolvePath } = require("path");
const { mkdirSync } = require("./fs");
const { images, packages } = require("./utils");

const allVolumesMap = {};

function makeVolumes(image, dependentApps) {
  const all = images["js"];

  const list = [];
  const nullMarker = "V__";
  const prefix = "not_used";
  const codeBase = "./fe";
  const appHome = "/home/node/app";
  const baseVolume = `${codeBase}:${appHome}`;
  list.push(baseVolume);

  function makeVolumeString(volumeStart, volumeEnd, codePath) {
    const leftMapping = `${image}_${prefix}_${volumeStart}${
      volumeEnd ? "_" + volumeEnd : ""
    }`;

    const path = resolvePath(__dirname, codeBase, codePath);
    try {
      mkdirSync(path);
    } catch (e) {
      //
    }

    allVolumesMap[leftMapping] = nullMarker;
    const result = `${leftMapping}:${appHome}/${codePath}`;
    list.push(result);
  }

  makeVolumeString("node_modules", "", "node_modules/");
  makeVolumeString("netlify", "", ".netlify/");

  dependentApps.forEach((pkg) => {
    // exclude package's node_modules folder
    makeVolumeString(pkg, "node_modules", `packages/${pkg}/node_modules/`);

    const ppty = all[pkg];

    const ignoreVolumeDirectories = ppty.ignoreVolumeDirectories;

    if (ignoreVolumeDirectories) {
      // exclude packages marked as docker volume ignore
      ignoreVolumeDirectories.forEach((dir) => {
        makeVolumeString(pkg, dir, `packages/${pkg}/${dir}/`);
      });
    }

    // makeVolumeString(pkg, "", `packages/${pkg}/`);
  });

  // If we are not depending on a package, then we exclude the entire package
  // folder
  packages.forEach((pkg) => {
    if (!dependentApps.includes(pkg)) {
      makeVolumeString(pkg, "", `packages/${pkg}/`);
    }
  });

  return list;
}

function makePkgCompose(image) {
  const { ports, dependentImages, dependentApps } = images["js"][image];

  const obj = {
    build: {
      context: `./fe/packages/${image}`,
      dockerfile: `Dockerfile.${image}`,
      args: {
        NODE_ENV: "${NODE_ENV}",
      },
    },
    image: `nina-js-${image}-\${NODE_ENV}`,
    entrypoint: ["/usr/local/bin/entrypoint.sh"],
    depends_on: dependentImages,
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
    ports,
    volumes: makeVolumes(image, dependentApps),
  };

  if (!ports) {
    delete obj.ports;
  }

  if (!dependentImages) {
    delete obj.depends_on;
  }

  return obj;
}

module.exports = {
  allVolumesMap,
  makeVolumes,
  makePkgCompose,
};
