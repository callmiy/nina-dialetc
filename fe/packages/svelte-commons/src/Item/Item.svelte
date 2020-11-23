<script lang="ts">
  export let name: string;
</script>

<form>
  <div class="field">
    <label class="label" for="name">Name</label>
    <div class="control">
      <input
        id="name"
        class="input"
        type="text"
        placeholder="Text input"
        bind:value={name} />
    </div>
  </div>
</form>
