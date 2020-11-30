export const {
  API_PORT = 3000,
  API_HOST = "localhost",
  NODE_ENV,
  PORT,
  IS_E2E,
  DATABASE_URL = "",
  API_URL = "",
} = process.env;

export const IS_DEV = NODE_ENV === "development";
export const IS_E2E_TEST = IS_E2E === "true";
