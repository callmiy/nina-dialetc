<script lang="ts">
  export let isActive;
  export let onSubmit;
</script>

<div
  id="branch-mock"
  class:active="{isActive}"
  on:click="{() => {
    onSubmit({});
  }}"
>
  1
</div>
