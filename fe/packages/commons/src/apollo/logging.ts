import { IS_PROD, IS_TEST } from "../envs";

export function doNotLog() {
  // if we explicitly wish to log even in production, then we are duty bound
  // to do so
  if (
    "undefined" !== typeof window &&
    window.____nina &&
    window.____nina.logApolloQueries
  ) {
    return false;
  }

  // never log in production or test except we make it explicit as in above
  if (IS_PROD || IS_TEST) {
    return true;
  }

  // always log in development
  return false;
}
