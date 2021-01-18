import { SHOULD_USE_MSW } from "@ta/cm/src/envs";
import App from "./components/app/app.svelte";

if (SHOULD_USE_MSW) {
  require("./should-use-msw");
}

const app = new App({
  target: document.body,
});

// window.app = app;

export default app;
