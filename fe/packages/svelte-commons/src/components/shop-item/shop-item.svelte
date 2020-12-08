<script src="./_shop-item.ts">
</script>

<style lang="scss">
  .field-container + .field-container {
    margin-top: 25px;
  }
</style>

<form>
  {#if brandIsActive}
    {#await import('../brand/brand.svelte') then c}
      <svelte:component
        this="{c.default}"
        bind:isActive="{brandIsActive}"
        onSubmit="{onSubmitBrand}"
      />
    {/await}
  {:else if branchIsActive}
    {#await import('../branch/branch.svelte') then c}
      <svelte:component
        this="{c.default}"
        bind:isActive="{branchIsActive}"
        onSubmit="{onSubmitBranch}"
      />
    {/await}
  {/if}

  <div class="field-container brand">
    <label class="label" for="{shopItemBrandNameInputId}">
      Shop Brand
      <span>e.g. edeka</span>
      <span>Select from the dropdown list or click 'Add' to create new shop
        brand</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id="{shopItemBrandNameInputId}"
            class="input"
            type="text"
            bind:value="{brandId}"
          >
            <option value="" class="{shopItemBrandNameOptionSelector}">
              ---------
            </option>

            {#each brandOptions as { name: nameOption, id } (id)}
              <option class="{shopItemBrandNameOptionSelector}" value="{id}">
                {nameOption}
              </option>
            {/each}
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault="{activateBrandCb}">
        <button class="button is-info" id="{shopItemAddBrandId}"> Add </button>
      </div>
    </div>
  </div>

  <div class="field-container branch">
    <label class="label" for="{shopItemBranchInputId}">
      Branch
      <span>e.g. konig</span>
      <span>Select from the dropdown list or click 'Add' to create new branch</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id="{shopItemBranchInputId}"
            class="input"
            type="text"
            bind:value="{branchId}"
          >
            <option value="" class="{shopItemBranchNameOptionSelector}">
              ---------
            </option>

            {#each branchOptions as { id, displayName } (id)}
              <option class="{shopItemBranchNameOptionSelector}" value="{id}">
                {displayName}
              </option>
            {/each}
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault="{activateBranchCb}">
        <button class="button is-info" id="{shopItemAddBranchId}"> Add </button>
      </div>
    </div>
  </div>
</form>
