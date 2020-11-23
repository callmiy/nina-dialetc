<script lang="ts">
  import {
    shopBrandDomId,
    shopBrandNameInputDomId,
  } from "@talat/commons/src/shop-brand-dom";

  export let name: string;
</script>

<div class="field" id={shopBrandDomId}>
  <label class="label" for={shopBrandNameInputDomId}>
    Shop brand name
    <span>e.g. "edeka"</span>
  </label>

  <div class="control">
    <input
      id={shopBrandNameInputDomId}
      class="input"
      type="text"
      bind:value={name} />
  </div>
</div>
