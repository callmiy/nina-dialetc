import { wrap } from "svelte-spa-router/wrap";
import Loading from "@ta/sc/src/components/loading.svelte";

export const routes = {
  "/signup": wrap({
    asyncComponent: () => import("./signup.route.svelte"),
    loadingComponent: Loading,
  }),

  "/shopping": wrap({
    asyncComponent: () => import("./shopping.route.svelte"),
    loadingComponent: Loading,
  }),
};
