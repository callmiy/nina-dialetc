const { writeFileSync, mkdirSync } = require("../modules/fs");
const { resolve: resolvePath } = require("path");
const { dump } = require("js-yaml");
const { Command, flags } = require("@oclif/command");
const prettier = require("prettier");

const fileName = resolvePath(__dirname, "../../../docker-compose.yml");

class GenComposeCommand extends Command {
  async run() {
    try {
      const yaml = genDockerCompose();
      const {
        flags: { verbose, output = fileName },
      } = this.parse(GenComposeCommand);

      if (verbose) {
        this.log(yaml);
      }

      const formattedYaml = prettier.format(yaml, {
        parser: "yaml",
      });

      writeFileSync(output, formattedYaml);
      this.log(`Success: written to "${output}"`);
    } catch (e) {
      console.error(`Error: ${e.message}`);
      this.exit(1);
    }
  }
}

GenComposeCommand.description = `Generate "docker-compose.yml" for project
...
Extra documentation goes here
`;

GenComposeCommand.flags = {
  verbose: flags.boolean({
    char: "v",
    description: `Print out content of generated "docker-compose.yml" to stdout`,
  }),

  output: flags.string({
    char: "o",
    description: `Where to output the generated yaml file. Defaults to "${fileName}"`,
  }),
};

module.exports = GenComposeCommand;
exports.fileName = fileName;

function genDockerCompose() {
  // const fileName = "docker-compose.yml";

  const SERVICES = {
    postgresDb: "db",
    jsBase: "js-base",
    jsCommons: "js-commons",
    jsAll: "js-all",
    jsHapi: "js-hapi",
    jsSvelte: "js-svelte",
  };

  const allVolumesMap = {};
  const nullMarker = "V__";
  const appHome = "/home/node/app";
  const codeBase = "./fe";

  // packages
  const commonsName = "commons";
  const cypressName = "cy";
  const dbMigrationName = "db-migrations";
  const hapiName = "hapi";
  const pgPromiseName = "pg-promise";
  const svelteCommonsName = "svelte-commons";
  const svelteName = "svelte";

  // VOLUMES ////////////////////////////

  const prefix = "not_used";

  const baseVolume = `${codeBase}:${appHome}`;

  const baseNotUsedVolumesAll = [
    makeVolumeString("node_modules", "", "node_modules/"),
    makeVolumeString("netlify", "", ".netlify/"),
  ];

  // const baseNotUsedYarnLockVolume = makeVolumeString(
  //   "yarn-lock",
  //   "",
  //   "yarn.lock"
  // );

  const commonsVolumesAll = [
    makeNodeVolume(commonsName),
    makeCoverageVolume(commonsName),
  ];

  const cypressVolumesAll = [makeNodeVolume(cypressName)];
  const cypressVolumeRoot = makePackageRootVolume(cypressName);

  const dbMigrationsVolumesAll = [makeNodeVolume(dbMigrationName)];
  const dbMigrationVolumeRoot = makePackageRootVolume(dbMigrationName);

  const hapiVolumesAll = [
    makeNodeVolume(hapiName),
    makeCoverageVolume(hapiName),
    makeBuildVolume(hapiName),
  ];
  const hapiVolumeRoot = makePackageRootVolume(hapiName);

  const pgPromiseVolumesAll = [
    makeNodeVolume(pgPromiseName),
    makeCoverageVolume(pgPromiseName),
  ];
  const pgPromiseVolumeRoot = makePackageRootVolume(pgPromiseName);

  const svelteCommonsVolumesAll = [
    makeNodeVolume(svelteCommonsName),
    makeCoverageVolume(svelteCommonsName),
  ];
  const svelteCommonsVolumeRoot = makePackageRootVolume(svelteCommonsName);

  const svelteVolumesAll = [
    makeNodeVolume(svelteName),
    makeCoverageVolume(svelteName),
    makeBuildVolume(svelteName),
  ];
  const svelteVolumeRoot = makePackageRootVolume(svelteName);

  // END VOLUMES ////////////////////////////

  const compose = {
    version: "3.4",
  };

  const services = {};
  compose.services = services;

  // POSTGRES_DB ////////////////////////////

  const dbService = {
    image: "postgres:13.1",
    ports: ["${DOCKER_HOST_DATABASE_PORT}:5432"],
    environment: {
      POSTGRES_PASSWORD: "postgres",
      POSTGRES_DB: "${DATABASE_NAME}",
    },
    volumes: [
      "./docker/data/postgres-${COMPOSE_PROJECT_NAME}:/var/lib/postgresql/data",
    ],
  };

  services[SERVICES.postgresDb] = dbService;

  // JS BASE ////////////////////////////

  const jsBaseService = {
    build: {
      context: "./fe",
      args: {
        NODE_ENV: "${NODE_ENV}",
      },
    },
    image: "nina-js-base",
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
  };

  services[SERVICES.jsBase] = jsBaseService;

  // JS COMMONS ////////////////////////////

  const jsCommonsService = {
    build: {
      context: "./fe",
      dockerfile: "Dockerfile.commons",
      args: {
        NODE_ENV: "${NODE_ENV}",
      },
    },
    image: "nina-js-commons",
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
  };

  services[SERVICES.jsCommons] = jsCommonsService;

  // JS ALL ////////////////////////////

  const allJsVolumes = getVolumes([
    baseVolume,
    baseNotUsedVolumesAll,
    commonsVolumesAll,
    cypressVolumesAll,
    dbMigrationsVolumesAll,
    hapiVolumesAll,
    pgPromiseVolumesAll,
    svelteCommonsVolumesAll,
    svelteVolumesAll,
  ]);

  const jsAllService = {
    stdin_open: true,
    image: "nina-js-all",
    entrypoint: ["/usr/local/bin/entrypoint.sh"],
    depends_on: ["db"],
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
    ports: ["${WEB_PORT}:${WEB_PORT}", "${API_PORT}:${API_PORT}"],
    volumes: allJsVolumes,
  };

  services[SERVICES.jsAll] = jsAllService;

  // END JS ALL ////////////////////////////

  // JS HAPI ////////////////////////////

  const jsHapiService = {
    build: {
      context: "./fe/packages/hapi",
      dockerfile: "Dockerfile.hapi",
      args: {
        NODE_ENV: "${NODE_ENV}",
      },
    },
    image: "nina-js-hapi-${NODE_ENV}",
    entrypoint: ["/usr/local/bin/entrypoint.sh"],
    depends_on: ["db"],
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
    ports: ["${API_PORT}:${API_PORT}"],
    volumes: allJsVolumes.concat(
      getVolumes([
        // baseNotUsedYarnLockVolume,
        cypressVolumeRoot,
        svelteCommonsVolumeRoot,
        svelteVolumeRoot,
      ])
    ),
  };

  services[SERVICES.jsHapi] = jsHapiService;

  // END JS HAPI ////////////////////////////

  // JS SVELTE ////////////////////////////

  const jsSvelteService = {
    build: {
      context: "./fe/packages/svelte",
      dockerfile: "Dockerfile.svelte",
      args: {
        NODE_ENV: "${NODE_ENV}",
      },
    },
    image: "nina-js-svelte-${NODE_ENV}",
    entrypoint: ["/usr/local/bin/entrypoint.sh"],
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
    ports: ["${WEB_PORT}:${WEB_PORT}"],
    volumes: allJsVolumes.concat(
      getVolumes([
        // baseNotUsedYarnLockVolume,
        dbMigrationVolumeRoot,
        hapiVolumeRoot,
        pgPromiseVolumeRoot,
      ])
    ),
  };

  services[SERVICES.jsSvelte] = jsSvelteService;

  // END JS SVELTE ////////////////////////////

  // UTILS ////////////////////////////

  function makeNodeVolume(name) {
    return makeVolumeString(
      name,
      "node_modules",
      `packages/${name}/node_modules/`
    );
  }

  function makeCoverageVolume(name) {
    return makeVolumeString(name, "coverage", `packages/${name}/coverage/`);
  }

  function makeBuildVolume(name) {
    return makeVolumeString(name, "build", `packages/${name}/build/`);
  }

  function makeVolumeString(volumeStart, volumeEnd, codePath) {
    const leftMapping = `${prefix}_${volumeStart}${
      volumeEnd ? "_" + volumeEnd : ""
    }`;

    const path = resolvePath(__dirname, codeBase, codePath);
    try {
      mkdirSync(path);
    } catch (e) {
      //
    }

    allVolumesMap[leftMapping] = nullMarker;
    return `${leftMapping}:${appHome}/${codePath}`;
  }

  function makePackageRootVolume(name) {
    return makeVolumeString(name, "", `packages/${name}/`);
  }

  function getVolumes(vols) {
    const response = [];

    for (const vol of vols) {
      if (Array.isArray(vol)) {
        vol.forEach((v) => {
          response.push(v);
        });

        continue;
      }

      response.push(vol);
    }

    return response;
  }

  // END UTILS ////////////////////////////

  // OUTPUT TO FILE ////////////////////////////

  if (Object.keys(allVolumesMap).length) {
    compose.volumes = allVolumesMap;
  }

  const dumpedYaml = dump(compose, {
    lineWidth: 10000,
  });

  const yaml = dumpedYaml.replace(/'/g, `"`).replace(/V__/g, "");
  return yaml;
}
