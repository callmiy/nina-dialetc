<script lang="ts">
  import ShopBrand from "../ShopBrand/ShopBrand.svelte";

  export let name: string;
  let brandComponentIsActive = false;

  function activateBrandComponent() {
    brandComponentIsActive = true;
  }
</script>

<form>
  <ShopBrand bind:isActive={brandComponentIsActive} {name} />

  <div class="field-container">
    <label class="label" for="name">
      Shop Brand Name
      <span>e.g. edeka</span>
      <span>Select from the dropdown list or click 'Add' to create new shop
        brand</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select id="name" class="input" type="text" bind:value={name}>
            <option value="">---------</option>
            <option value="edeka">Edeka</option>
            <option value="penny">Penny</option>
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault={activateBrandComponent}>
        <button class="button is-info"> Add </button>
      </div>
    </div>
  </div>
</form>
