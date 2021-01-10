<script lang="ts">
  import { Props } from "@ta/cm/src/components/brand-utils";
  import { mockBrandValue1 } from "@ta/cm/src/__tests__/mock-data";
  import { mockBrandSubmitId, mockBrandNameInput } from "./selectors";

  export let isActive: any;
  export let onSubmit: any;
  export let brand: Props["brand"] = mockBrandValue1;
</script>

<div id="brand-mock" class:active="{isActive}">
  <span
    id="{mockBrandSubmitId}"
    on:click="{() => {
      onSubmit(brand || mockBrandValue1);
    }}"
  >1</span>

  <input id="{mockBrandNameInput}" bind:value="{brand.name}" />
</div>
