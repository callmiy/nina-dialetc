<script lang="ts">
  import { Props } from "@ta/cm/src/components/branch-utils";
  import { mockBranchValue1 } from "@ta/cm/src/__tests__/mock-data";

  export let isActive: Props["isActive"];
  export let onSubmit: Props["onSubmit"];
  export let branch: Props["branch"];
</script>

<div id="branch-mock" class:active="{isActive}">
  <span
    id="branch-submit-1"
    on:click="{() => {
      onSubmit(branch || mockBranchValue1);
    }}"
  >
    1
  </span>
</div>
