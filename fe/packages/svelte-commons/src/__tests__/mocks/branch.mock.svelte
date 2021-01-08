<script lang="ts">
  import { Props } from "@ta/cm/src/components/branch-utils";
  import { mockBranchValue1 } from "@ta/cm/src/__tests__/mock-data";
  import { mockBranchSubmitId, mockBranchCityInput } from "./selectors";

  export let isActive: Props["isActive"];
  export let onSubmit: Props["onSubmit"];
  export let branch: Props["branch"] = mockBranchValue1;
</script>

<div id="branch-mock" class:active="{isActive}">
  <span
    id="{mockBranchSubmitId}"
    on:click="{() => {
      onSubmit(branch || mockBranchValue1);
    }}"
  >
    1
  </span>

  <input id="{mockBranchCityInput}" bind:value="{branch.city}" />
</div>
