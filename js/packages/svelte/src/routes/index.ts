import { wrap } from "svelte-spa-router/wrap";
import Loading from "@ta/sc/src/components/loading.svelte";

const shoppingRoute = wrap({
  asyncComponent: () => import("./shopping.route.svelte"),
  loadingComponent: Loading,
});

export const routes = {
  "/shopping/": shoppingRoute,

  "/signup": wrap({
    asyncComponent: () => import("./signup.route.svelte"),
    loadingComponent: Loading,
  }),

  "/": shoppingRoute,
};
