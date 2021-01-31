const env = process.env || {};

export const API_PORT = env.API_PORT || 3000;
export const API_HOST = env.API_HOST || "localhost";
export const NODE_ENV = env.NODE_ENV;
export const PORT = env.PORT;
export const IS_E2E = env.IS_E2E;
export const DATABASE_URL = env.DATABASE_URL || "";
export const API_URL = env.API_URL || "";
export const API_URL_ALTERNATE = env.API_URL_ALTERNATE || API_URL;
export const DEBUG_PG_PROMISE = env.DEBUG_PG;
export const USE_MSW = env.USE_MSW || "";
export const WEB_HOST = env.WEB_HOST || "";
export const WEB_PORT = env.WEB_PORT || "";

export const IS_DEV = NODE_ENV === "development";
export const IS_E2E_TEST = IS_E2E === "true";
export const IS_PROD = NODE_ENV === "production";
export const IS_TEST = NODE_ENV === "test";
export const SHOULD_USE_MSW = USE_MSW === "yes";

export function shouldUseMsw(useMsw: string) {
  return useMsw === "yes";
}

export function isBrowser() {
  return typeof window !== "undefined";
}
