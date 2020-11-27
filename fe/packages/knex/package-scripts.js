/* eslint-disable @typescript-eslint/no-var-requires */

const commonScripts = require("../../package-commons-scripts");

const { CREATE_DATABASE: createDb, DATABASE_URL: dbUrl } = process.env;

const createDbCmd = `node -e 'require("./package-scripts").cd()'`;
const knexTsConfig = `TS_NODE_COMPILER_OPTIONS='{"module":"commonjs", "isolatedModules": false}'`;

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    mm: {
      script: `yarn knex migrate:make - -x ts`,
      description: `Make migration.
        The migration file name will be of the form: timestamp_-.
        This file must be renamed immediately so that it is not overwritten
        by the next invocation of this script`,
    },
    ms: {
      script: `yarn knex seed:make - -x ts`,
      description: `Make seed.
        The seed file will be named ".ts".
        This file must be renamed immediately so that it is not overwritten
        by the next invocation of this script`,
    },
    m: {
      script: `${createDbCmd} && ${knexTsConfig} yarn knex migrate:latest`,
    },
    rb: {
      script: `knex migrate:rollback`,
    },
  },

  cd() {
    if (createDb === "true") {
      const [
        ,
        user,
        password,
        host,
        port,
        database,
      ] = /:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*)/u.exec(dbUrl);

      const config = {
        knex: {
          client: "postgres",
          connection: {
            host,
            port,
            database,
            user,
            password,
          },
        },
        dbManager: {
          superUser: "postgres",
          superPassword: "postgres",
        },
      };

      const dbManager = require("knex-db-manager").databaseManagerFactory(
        config
      );
      dbManager
        .createDb()
        .then(() => {
          console.log(`\nDatabase "${database}" created successfully\n`);
        })
        .catch((e) => {
          console.error(`\nCould not create database:\n`, e.message, "\n");
        })
        .finally(() => {
          process.exit(0);
        });
    }
  },
};
