<script lang="ts">
  import {
    formCtrlErrorSelector,
    formCtrlInfoSelector,
  } from "@ta/cm/src/selectors";

  export let error = "";
  export let info = "";
  export let id: string = "";

  let className = "";

  if (error) {
    className = `is-danger ${formCtrlErrorSelector}`;
  } else if (info) {
    className = `is-info ${formCtrlInfoSelector}`;
  }
</script>

<style lang="scss">
  .form-ctrl-msg {
    font-size: 1rem;
  }
</style>

<p id="{id}" class="{`help form-ctrl-msg ${className}`}">
  {#if $$slots.error}
    <slot name="error" />
  {:else if error}
    {error}
  {:else if $$slots.info}
    <slot name="info" />
  {:else}{info}{/if}
</p>
