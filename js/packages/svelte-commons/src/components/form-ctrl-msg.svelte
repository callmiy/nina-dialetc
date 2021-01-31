<script lang="ts">
  import {
    formCtrlErrorSelector,
    formCtrlInfoSelector,
    ERROR_NOTIFICATION_CLASS_NAME,
    INFO_NOTIFICATION_CLASS_NAME,
  } from "@ta/cm/src/selectors";

  export let error = "";
  export let info = "";
  export let id: string = "";

  let className = "";

  if (error) {
    className = `${ERROR_NOTIFICATION_CLASS_NAME} ${formCtrlErrorSelector}`;
  } else if (info) {
    className = `${INFO_NOTIFICATION_CLASS_NAME} ${formCtrlInfoSelector}`;
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
