<script lang="ts">
  export let name: string;
</script>

<form>
  <div class="field">
    <label class="label" for="name">
      Shop Brand Name
      <span>e.g. edeka</span>
      <span>Select from the dropdown list or click 'Add' to create new shop
        brand</span>
    </label>

    <div class="control">
      <div class="select" style="width:100%">
        <select
          id="name"
          class="input"
          type="text"
          bind:value={name}>
          <option value="">---------</option>
          <option value="edeka">Edeka</option>
          <option value="penny">Penny</option>
        </select>
      </div>
    </div>
  </div>
</form>
