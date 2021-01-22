<script lang="ts">
  import Shopping from "@ta/sc/src/components/shopping/shopping.svelte";
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<style lang="scss" global>
  @import "../../commons/src/styles/extensions";

  .main-layout {
    @extend %main-layout;
  }
</style>

<div class="main-layout">
  <Router routes="{routes}" />
  <Shopping />
</div>
