<script lang="ts">
  import { shopItemVal } from "./mock-utils";

  export let isActive;
  export let onSubmit;
</script>

<div id="item-mock" class:active="{isActive}">
  <span
    id="item-submit-1"
    on:click="{() => {
      onSubmit(shopItemVal);
    }}"
  >1</span>
</div>
