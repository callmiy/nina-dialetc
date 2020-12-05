const child_process = require("child_process");
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
      script: `node -e 'require("./package-scripts").createDb()'`,
      // script: `${envs} DATABASE_NAME=postgres db-migrate db:create ${database}`,
      description: `Create database`,
    },
    d: {
      script: `${envs} DATABASE_NAME=postgres db-migrate db:drop ${database}`,
      description: `drop database`,
    },
  },
  createDb() {
    let errorCount = 0;

    //kick off process of listing files
    var child = child_process.spawn(
      "yarn",
      ["db-migrate", "db:create", database],
      {
        env: {
          ...process.env,
          DATABASE_NAME: "postgres",
          DATABASE_URL: "",
          DATABASE_HOST: host,
          DATABASE_PORT: port,
          DATABASE_USER: user,
          DATABASE_PASSWORD: password,
        },
      }
    );

    //spit stdout to screen
    child.stdout.on("data", function (data) {
      process.stdout.write(data.toString());
    });

    let okError = false;

    child.stderr.on("data", function (data) {
      if (errorCount++ === 0) {
        data = data.toString();
        const msg = `database "${database}" already exists`;

        if (!data.includes(msg)) {
          throw new Error(data);
        }

        process.stdout.write(`\n\n${msg}\n`);
        okError = true;
      }
    });

    child.on("close", function (code) {
      if (!okError) {
        console.log("Finished with code " + code);
      }
    });
  },
};
