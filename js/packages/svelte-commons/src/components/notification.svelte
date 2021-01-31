<script lang="ts">
  import {
    notificationSelector,
    WARNING_NOTIFICATION_CLASS_NAME,
    ERROR_NOTIFICATION_CLASS_NAME,
  } from "@ta/cm/src/selectors";

  /// PROPS /////////////////////////////////
  export let text: string = "";
  export let onClose: () => void;
  export let isWarning = false;
  export let isDanger = false;
  export let componentId = "";
  export let closeId = "";

  let notificationTypeClassName = "";

  $: {
    if (isWarning) {
      notificationTypeClassName = WARNING_NOTIFICATION_CLASS_NAME;
    } else if (isDanger) {
      notificationTypeClassName = ERROR_NOTIFICATION_CLASS_NAME;
    }
  }
</script>

<div
  id="{componentId}"
  class="{`notification ${notificationTypeClassName} ${notificationSelector}`}"
>
  {#if onClose}
    <button
      class="delete"
      id="{closeId}"
      on:click|preventDefault="{onClose}"
    ></button>
  {/if}

  {#if $$slots.child}
    <slot name="child" />
  {:else if text}{text}{/if}
</div>
