/* eslint-disable @typescript-eslint/no-var-requires */

const { DATABASE_URL: dbUrl, POOL_SIZE: pool_size = "0" } = process.env;

const dbInit = {
  client: "postgresql",
  connection: dbUrl,
  searchPath: ["knex", "public"],
  pool: {
    min: 0,
    max: +pool_size,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};

const config = {
  development: {
    client: "postgresql",
    connection: dbUrl,
  },
  staging: dbInit,
  production: dbInit,
  dbInit,
};

export default config
