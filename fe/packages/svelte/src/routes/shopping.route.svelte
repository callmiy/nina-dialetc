<script lang="ts">
  import Shopping from "@ta/sc/src/components/shopping/shopping.svelte";
</script>

<style lang="postcss">
  .main {
    display: flex;
    justify-content: center;
  }

  .shopping {
    background: #fff;
    padding: 25px;
    margin-top: 20px;
  }
</style>

<div class="main">
  <div class="shopping">
    <Shopping />
  </div>
</div>
