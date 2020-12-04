<script lang="ts">
  import {
    notificationSelector,
    notificationTextCloseId,
  } from "@ta/cm/src/selectors";

  /// PROPS /////////////////////////////////
  export let text: string = "";
  export let onClose: () => void;
  export let isWarning = false;
  export let isDanger = false;
  export let componentId = "";
  export let closeId = notificationTextCloseId;

  let className = "";

  $: {
    if (isWarning) {
      className = "is-warning";
    } else if (isDanger) {
      className = "is-danger";
    }
  }
</script>

<div
  id="{componentId}"
  class="{`notification ${className} ${notificationSelector}`}"
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
