<script lang="ts">
  import Shopping from "@ta/sc/src/components/shopping/shopping.svelte";
</script>

<style lang="scss" global>
  @import "../../../../commons/src/styles/globals.scss";
  @import "../../../../commons/src/styles/extensions";

  .main-layout {
    @extend %main-layout;
  }
</style>

<div class="main-layout">
  <Shopping />
</div>
