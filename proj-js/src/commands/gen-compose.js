const { writeFileSync } = require("../modules/fs");
const { dump } = require("js-yaml");
const { Command, flags } = require("@oclif/command");
const prettier = require("prettier");
const {
  makeRelativeFromRoot,
  makeAbsFromRoot,
  images,
  appName,
} = require("../modules/utils");
const {
  //
  makePkgCompose,
  makeVolumes,
  allVolumesMap,
} = require("../modules/gen-compose");

const composeName = "docker-compose.yml";
const composeRelative = makeRelativeFromRoot(composeName);
const composeAbs = makeAbsFromRoot(composeName);

class GenComposeCommand extends Command {
  async run() {
    try {
      const { flags } = this.parse(GenComposeCommand);

      const yaml = genDockerCompose();

      const { verbose, output = composeAbs } = flags;
      const dryRun = flags["dry-run"];

      if (dryRun) {
        this.log(yaml);
        return;
      }

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

function genDockerCompose() {
  const SERVICES = {
    postgresDb: "db",
    jsBase: images["js"]["base"]["imageName"].replace(`${appName}-`, ""),
    jsCommons: images["js"]["commons"]["imageName"].replace(`${appName}-`, ""),
    jsAll: images["js"]["all"]["imageName"].replace(`${appName}-`, ""),
    jsHapi: "js-hapi",
    jsSvelte: "js-svelte",
  };

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
      dockerfile: "Dockerfile.base",
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

  const jsAllService = {
    stdin_open: true,
    image: "nina-js-all",
    entrypoint: ["/usr/local/bin/entrypoint.sh"],
    depends_on: ["db"],
    env_file: "${DOCKER_ENV_FILE}",
    user: "node",
    ports: ["${WEB_PORT}:${WEB_PORT}", "${API_PORT}:${API_PORT}"],
    volumes: makeVolumes("all", images["js"]["all"].dependentApps),
  };

  services[SERVICES.jsAll] = jsAllService;

  // END JS ALL ////////////////////////////

  services[SERVICES.jsHapi] = makePkgCompose("hapi");

  services[SERVICES.jsSvelte] = makePkgCompose("svelte");

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

GenComposeCommand.description = `Generate "${composeName}" for project `;

GenComposeCommand.flags = {
  verbose: flags.boolean({
    char: "v",
    description: `Print out content of generated
    "${composeName}" to stdout`,
  }),

  output: flags.string({
    char: "o",
    description: `Where to output the generated yaml file.
    Defaults to "${composeRelative}"`,
  }),

  "dry-run": flags.boolean({
    char: "d",
    description: `Dry run. Do not write file, just print to stdout`,
  }),
};

module.exports = GenComposeCommand;
exports.fileName = composeAbs;
