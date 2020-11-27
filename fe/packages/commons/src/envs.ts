export const API_HOST_PATH = "/api";
export const GRAPHQL_PATH = `${API_HOST_PATH}/gql`;

export const {
  API_PORT = 3000,
  API_HOST = "localhost",
  NODE_ENV,
  PORT,
} = process.env;

export const IS_DEV = NODE_ENV === "development";
