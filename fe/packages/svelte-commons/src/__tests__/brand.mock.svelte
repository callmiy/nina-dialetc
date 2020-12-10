<script lang="ts">
  export let isActive;
  export let onSubmit;

  const submitValue = {
    id: "bdid1",
    name: "bdn1",
    country: "bdco1",
    currency: "bdcur1",
  };
</script>

<div id="brand-mock" class:active="{isActive}">
  <span
    id="brand-submit-1"
    on:click="{() => {
      onSubmit(submitValue);
    }}"
  >1</span>
</div>
