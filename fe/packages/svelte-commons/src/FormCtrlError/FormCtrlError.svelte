<script lang="ts">
  import { formCtrlErrorSelector } from "@ta/cm/src/dom";

  export let error: string = "";
  export let id: string = "";
</script>

<style lang="scss">
  .form-ctrl-error {
    margin-top: 10px;
    font-size: 1rem;
  }
</style>

<p
  id="{id}"
  class="{`help is-danger form-ctrl-error ${formCtrlErrorSelector}`}"
>
  {#if $$slots.error}
    <slot name="error" />
  {:else if error}{error}{/if}
</p>
