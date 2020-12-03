const commonScripts = require("../../package-commons-scripts");

const { DATABASE_URL: dbUrl } = process.env;

const [, user, password, host, port, database] =
  /:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*)/u.exec(dbUrl) || [];

const migrationTableName = ` --migration-table node-db-migrations`;

const envs = `DATABASE_URL= DATABASE_HOST=${host} DATABASE_PORT=${port} DATABASE_NAME=${database} DATABASE_USER=${user} DATABASE_PASSWORD=${password}`;

module.exports = {
  scripts: {
    ...commonScripts.scripts,
    mm: {
      script: `${envs} db-migrate create a  --sql-file`,
      description: `Make migration`,
    },
    mu: {
      script: `${envs} yarn db-migrate up ${migrationTableName}`,
      description: `migrate up`,
    },
    md: {
      script: `${envs} yarn db-migrate down ${migrationTableName}`,
      description: `migrate down`,
    },
    c: {
      script: `${envs} DATABASE_NAME=postgres db-migrate db:create ${database}`,
      description: `Create database`,
    },
    d: {
      script: `${envs} DATABASE_NAME=postgres db-migrate db:drop ${database}`,
      description: `drop database`,
    },
  },
};
