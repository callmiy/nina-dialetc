import App from "./components/app/app.svelte";
import { SHOULD_USE_MSW } from "@ta/cm/src/envs";

if (SHOULD_USE_MSW) {
  const { mswBrowserWorker } = require("@ta/cm/src/__tests__/msw-browser");
  mswBrowserWorker.start();
}

const app = new App({
  target: document.body,
});

// window.app = app;

export default app;
