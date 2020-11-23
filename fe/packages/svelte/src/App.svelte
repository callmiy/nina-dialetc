<script>
  import ShopItem from "@talat/svelte-commons/src/ShopItem/ShopItem.svelte";
</script>

<style lang="scss" global>
  @import "../../commons/src/styles/globals.scss";
  @import "../../commons/src/styles/extensions";

  .main-layout {
    @extend %main-layout;
  }
</style>

<div class="main-layout">
  <ShopItem name="kanmii" />
</div>
