<script lang="ts">
  import { notificationSelector } from "@ta/cm/src/selectors";

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
      notificationTypeClassName = "is-warning";
    } else if (isDanger) {
      notificationTypeClassName = "is-danger";
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
