export const API_PORT = process.env.API_PORT || 3000;
export const API_HOST = process.env.API_HOST || "localhost";
export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const IS_E2E = process.env.IS_E2E;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const API_URL = process.env.API_URL || "";
export const API_URL_ALTERNATE = process.env.API_URL_ALTERNATE || API_URL;
export const DEBUG_PG_PROMISE = process.env.DEBUG_PG;

export const IS_DEV = NODE_ENV === "development";
export const IS_E2E_TEST = IS_E2E === "true";
