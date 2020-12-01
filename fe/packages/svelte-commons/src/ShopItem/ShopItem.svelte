<script src="./shop-item.ts">
</script>

<form>
  {#if brandComponentIsActive}
    {#await import('../ShopBrand/ShopBrand.svelte') then c}
      <svelte:component
        this={c.default}
        bind:isActive={brandComponentIsActive}
        {name} />
    {/await}
  {/if}

  <div class="field-container">
    <label class="label" for={shopItemBrandNameInputId}>
      Shop Brand Name
      <span>e.g. edeka</span>
      <span>Select from the dropdown list or click 'Add' to create new shop
        brand</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id={shopItemBrandNameInputId}
            class="input"
            type="text"
            bind:value={name}>
            <option value="">---------</option>
            <option class={shopItemBrandNameOptionSelector} value="edeka">
              Edeka
            </option>
            <option value="penny">Penny</option>
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault={activateBrandComponent}>
        <button class="button is-info" id={shopItemAddBrandId}> Add </button>
      </div>
    </div>
  </div>
</form>
