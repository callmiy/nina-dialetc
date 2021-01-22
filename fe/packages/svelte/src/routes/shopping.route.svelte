<script lang="ts">
  import Shopping from "@ta/sc/src/components/shopping/shopping.svelte";
</script>

<style lang="scss">
  .main {
    display: flex;
    justify-content: center;
  }

  .shopping {
    background: #fff;
    padding: 25px;
    margin-top: 20px;

    @media (max-width: 500px) {
      margin: 50px 0;
      border-radius: 8px;
      border: solid 1px #dbdbdb;
    }
  }
</style>

<div class="main">
  <div class="shopping">
    <Shopping />
  </div>
</div>
