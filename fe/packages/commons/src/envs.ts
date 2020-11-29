export const API_HOST_PATH = "/api";
export const GRAPHQL_PATH = `${API_HOST_PATH}/gql`;

export const {
  API_PORT = 3000,
  API_HOST = "localhost",
  NODE_ENV,
  PORT,
  IS_E2E,
  DATABASE_URL = "",
} = process.env;

export const IS_DEV = NODE_ENV === "development";
export const IS_E2E_TEST = IS_E2E === "true";
export const RESET_PATH = `${API_HOST_PATH}/reset_db`;
