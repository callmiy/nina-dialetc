<script lang="ts">
  export let isActive;
  export let onSubmit;

  const submitValue = {
    id: "bcId1",
    street: "str1",
    city: "ci1",
    postCode: "pc1",
  };
</script>

<div id="branch-mock" class:active="{isActive}">
  <span
    id="branch-submit-1"
    on:click="{() => {
      onSubmit(submitValue);
    }}"
  >
    1
  </span>
</div>
