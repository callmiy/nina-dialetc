<script lang="ts">
  import Router from "svelte-spa-router";
  import { routes } from "./routes";
</script>

<style lang="postcss" global>
  .main-layout {
    /* @extend %main-layout; */
    display: block;
  }
</style>

<div class="main-layout">
  <Router routes="{routes}" />
</div>
