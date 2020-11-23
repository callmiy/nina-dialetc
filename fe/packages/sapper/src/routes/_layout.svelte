<script lang="ts">
  import Nav from "../components/Nav.svelte";

  export let segment: string;
</script>

<style lang="scss" global>
  @import "../../../commons/src/styles/globals.scss";
  @import "../../../commons/src/styles/extensions";

  .main-layout {
    @extend %main-layout;
  }
</style>

<Nav {segment} />

<div class="main-layout">
  <slot />
</div>
