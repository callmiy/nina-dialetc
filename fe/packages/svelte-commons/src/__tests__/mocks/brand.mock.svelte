<script lang="ts">
  import { brandSubmitValue1 } from "./mock-utils";

  export let isActive: any;
  export let onSubmit: any;
</script>

<div id="brand-mock" class:active="{isActive}">
  <span
    id="brand-submit-1"
    on:click="{() => {
      onSubmit(brandSubmitValue1);
    }}"
  >1</span>
</div>
