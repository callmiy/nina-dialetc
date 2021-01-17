import { SHOULD_USE_MSW } from "@ta/cm/src/envs";
import { MswGraphql, MswSetupWorkerApi, NinaGlobals } from "@ta/cm/src/types";
import App from "./components/app/app.svelte";

if (SHOULD_USE_MSW) {
  let nina: NinaGlobals;
  let mswBrowserWorker: MswSetupWorkerApi;
  let mswGraphql: MswGraphql;

  if (window.Cypress) {
    const { CYPRESS_NINA_KEY } = require("@ta/cm/src/types");
    nina = window.Cypress.env(CYPRESS_NINA_KEY) as NinaGlobals;
    window.____nina = nina;

    mswBrowserWorker = nina.mswBrowserWorker as MswSetupWorkerApi;
    mswGraphql = nina.mswGraphql as MswGraphql;
    // Browser worker would have been started inside cypress
    // mswBrowserWorker.start();
  } else {
    const msw = require("@ta/cm/src/__tests__/msw-browser");
    mswBrowserWorker = msw.mswBrowserWorker as MswSetupWorkerApi;
    mswGraphql = msw.mswGraphql as MswGraphql;

    nina = (window.____nina || {}) as NinaGlobals;
    nina.mswBrowserWorker = mswBrowserWorker;
    nina.mswGraphql = mswGraphql;
    window.____nina = nina;
    mswBrowserWorker.start();
  }
}

const app = new App({
  target: document.body,
});

// window.app = app;

export default app;
