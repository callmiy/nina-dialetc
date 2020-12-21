<script lang="ts">
  import { branchSubmitVal1 } from "./mock-utils";

  export let isActive: any;
  export let onSubmit: any;
</script>

<div id="branch-mock" class:active="{isActive}">
  <span
    id="branch-submit-1"
    on:click="{() => {
      onSubmit(branchSubmitVal1);
    }}"
  >
    1
  </span>
</div>
