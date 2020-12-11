<script lang="ts">
  import {
    shoppingBrandNameInputId,
    shoppingBrandNameOptionSelector,
    shoppingAddBrandId,
    shoppingBranchInputId,
    shoppingBranchNameOptionSelector,
    shoppingAddBranchId,
    shoppingAddBrandLabelHelpId,
    shoppingAddBranchLabelHelpId,
  } from "@ta/cm/src/selectors";

  import { Props as BrandProps, BrandValues } from "../brand/brand-utils";
  import { BranchValues } from "../branch/branch-utils";
  import {
    getBranchDisplayName,
    ADD_SHOP_BRAND_LABEL_TEXT,
    ADD_SHOP_BRAND_LABEL_HELP_TEXT,
    EDIT_SHOP_BRAND_LABEL_TEXT,
    EDIT_SHOP_BRAND_LABEL_HELP_TEXT,
    ADD_SHOP_BRANCH_LABEL_TEXT,
    ADD_SHOP_BRANCH_LABEL_HELP_TEXT,
    EDIT_SHOP_BRANCH_LABEL_TEXT,
    EDIT_SHOP_BRANCH_LABEL_HELP_TEXT,
  } from "./shopping-utils";
  import { getBrandComponent } from "../lazies/brand.lazy";
  import { getBranchComponent } from "../lazies/branch.lazy";

  // BRAND ///////////////////////////////////////////////////////////////////////

  let brandId = "";
  let brandOptions: BrandValues[] = [];
  let brandIsActive = false;
  let brandLabelText = ADD_SHOP_BRAND_LABEL_TEXT;
  let brandLabelHelp = ADD_SHOP_BRAND_LABEL_HELP_TEXT;

  $: {
    if (brandId) {
      brandLabelHelp = EDIT_SHOP_BRAND_LABEL_HELP_TEXT;
      brandLabelText = EDIT_SHOP_BRAND_LABEL_TEXT;
    } else {
      brandLabelHelp = ADD_SHOP_BRAND_LABEL_HELP_TEXT;
      brandLabelText = ADD_SHOP_BRAND_LABEL_TEXT;
    }
  }

  function activateBrandCb() {
    branchIsActive = false;
    brandIsActive = true;
  }

  const onSubmitBrand: BrandProps["onSubmit"] = (values) => {
    brandIsActive = false;

    const { id: maybeNewId } = values;
    brandId = maybeNewId;

    const options: BrandValues[] = [values];

    brandOptions.forEach((b) => {
      if (b.id !== maybeNewId) {
        options.push(b);
      }
    });

    brandOptions = options;
  };

  // BRANCH ///////////////////////////////////////////////////////////////////////

  let branchIsActive = false;
  let branchOptions: BranchValuesWithDisplayName[] = [];
  let branchId = "";

  let branchLabelText = ADD_SHOP_BRANCH_LABEL_TEXT;
  let branchLabelHelp = ADD_SHOP_BRANCH_LABEL_HELP_TEXT;

  $: {
    if (branchId) {
      branchLabelHelp = EDIT_SHOP_BRANCH_LABEL_HELP_TEXT;
      branchLabelText = EDIT_SHOP_BRANCH_LABEL_TEXT;
    } else {
      branchLabelHelp = ADD_SHOP_BRANCH_LABEL_HELP_TEXT;
      branchLabelText = ADD_SHOP_BRANCH_LABEL_TEXT;
    }
  }

  function activateBranchCb() {
    brandIsActive = false;
    branchIsActive = true;
  }

  function onSubmitBranch(data: BranchValues) {
    branchIsActive = false;

    const { id: maybeNewId } = data;
    branchId = maybeNewId;
    (data as BranchValuesWithDisplayName).displayName = getBranchDisplayName(
      data
    );

    const options: BranchValuesWithDisplayName[] = [
      data as BranchValuesWithDisplayName,
    ];

    branchOptions.forEach((b) => {
      if (b.id !== maybeNewId) {
        options.push(b);
      }
    });

    branchOptions = options;
  }

  // CALLBACKS /////////////////////////////////////////////////////////////////

  type BranchValuesWithDisplayName = BranchValues & {
    displayName: string;
  };
</script>

<style lang="scss">
  .field-container + .field-container {
    margin-top: 25px;
  }

  .label-help-text {
    display: block;
    font-weight: 400;
    font-size: 0.85em;
  }

  .label-example {
    font-weight: 300;
    font-size: 0.9em;
  }
</style>

<form>
  {#if brandIsActive}
    {#await getBrandComponent() then c}
      <svelte:component
        this="{c}"
        bind:isActive="{brandIsActive}"
        onSubmit="{onSubmitBrand}"
      />
    {/await}
  {:else if branchIsActive}
    {#await getBranchComponent() then c}
      <svelte:component
        this="{c}"
        bind:isActive="{branchIsActive}"
        onSubmit="{onSubmitBranch}"
      />
    {/await}
  {/if}

  <div class="field-container brand">
    <label class="label" for="{shoppingBrandNameInputId}">
      Shop Brand

      {#if !brandId}<span class="label-example">e.g. Edeka</span>{/if}

      <span
        class="label-help-text"
        id="{shoppingAddBrandLabelHelpId}"
      >{brandLabelHelp}</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id="{shoppingBrandNameInputId}"
            class="input"
            type="text"
            bind:value="{brandId}"
          >
            <option value="" class="{shoppingBrandNameOptionSelector}">
              ---------
            </option>

            {#each brandOptions as { name: nameOption, id } (id)}
              <option class="{shoppingBrandNameOptionSelector}" value="{id}">
                {nameOption}
              </option>
            {/each}
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault="{activateBrandCb}">
        <button class="button is-info" id="{shoppingAddBrandId}">
          {brandLabelText}
        </button>
      </div>
    </div>
  </div>

  <div class="field-container branch">
    <label class="label" for="{shoppingBranchInputId}">
      Branch

      {#if branchId}<span>e.g. konig</span>{/if}

      <span
        class="label-help-text"
        id="{shoppingAddBranchLabelHelpId}"
      >{branchLabelHelp}</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id="{shoppingBranchInputId}"
            class="input"
            type="text"
            bind:value="{branchId}"
          >
            <option value="" class="{shoppingBranchNameOptionSelector}">
              ---------
            </option>

            {#each branchOptions as { id, displayName } (id)}
              <option class="{shoppingBranchNameOptionSelector}" value="{id}">
                {displayName}
              </option>
            {/each}
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault="{activateBranchCb}">
        <button class="button is-info" id="{shoppingAddBranchId}">
          {branchLabelText}
        </button>
      </div>
    </div>
  </div>
</form>
