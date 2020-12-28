<script lang="ts">
  import {
    shoppingBrandInputId,
    shoppingBrandOptionSelector,
    shoppingAddBrandId,
    shoppingBranchInputId,
    shoppingBranchOptionSelector,
    shoppingAddBranchId,
    shoppingAddBrandLabelHelpId,
    shoppingAddBranchLabelHelpId,
    shoppingAddArticleId,
    shoppingArticleInputId,
    shoppingAddArticleLabelHelpId,
    shoppingArticleOptionSelector,
    shoppingUnitPriceId,
    shoppingUnitOfMeasureId,
    shoppingQuantityId,
    shoppingTotalPriceId,
  } from "@ta/cm/src/selectors";

  import {
    Props as BrandProps,
    BrandValues,
  } from "@ta/cm/src/components/brand-utils";
  import { BranchValues } from "@ta/cm/src/components/branch-utils";
  import {
    Props as ArticleProps,
    ArticleValues,
  } from "@ta/cm/src/components/article.utils";
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
    ADD_ARTICLE_LABEL_TEXT,
    ADD_ARTICLE_LABEL_HELP_TEXT,
    EDIT_ARTICLE_LABEL_TEXT,
    EDIT_ARTICLE_LABEL_HELP_TEXT,
  } from "@ta/cm/src/components/shopping-utils";
  import { getBrandComponent } from "../lazies/brand.lazy";
  import { getBranchComponent } from "../lazies/branch.lazy";
  import { getArticleComponent } from "../lazies/article.lazy";
  import { getTotalPrice } from "@ta/cm/src/utils/get-total-price";

  // BRAND /////////////////////////////////////////////////////////////////

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

  // BRANCH /////////////////////////////////////////////////////////////////

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

  // ARTICLE ////////////////////////////////////////////////////////////
  let articleIsActive = false;
  let articleId = "";
  let articleOptions: ArticleValues[] = [];
  let unit = "";
  let unitPrice = "";
  let totalPrice = "";
  let quantity = "";

  $: {
    totalPrice = getTotalPrice(unitPrice, quantity);
  }

  let articleLabelText = ADD_ARTICLE_LABEL_TEXT;
  let articleLabelHelp = ADD_ARTICLE_LABEL_HELP_TEXT;

  $: {
    if (articleId) {
      articleLabelHelp = EDIT_ARTICLE_LABEL_HELP_TEXT;
      articleLabelText = EDIT_ARTICLE_LABEL_TEXT;
    } else {
      articleLabelHelp = ADD_ARTICLE_LABEL_HELP_TEXT;
      articleLabelText = ADD_ARTICLE_LABEL_TEXT;
    }
  }

  const onSubmitArticle: ArticleProps["onSubmit"] = (values) => {
    articleIsActive = false;

    const { id: maybeNewId } = values;
    articleId = maybeNewId;

    const options: ArticleValues[] = [values];

    articleOptions.forEach((i) => {
      if (i.id !== maybeNewId) {
        options.push(i);
      }
    });

    articleOptions = options;
  };

  // CALLBACKS /////////////////////////////////////////////////////////////////

  function activateBrandCb() {
    brandIsActive = true;
    branchIsActive = false;
    articleIsActive = false;
  }

  function activateBranchCb() {
    brandIsActive = false;
    branchIsActive = true;
    articleIsActive = false;
  }

  function activateArticleCb() {
    articleIsActive = true;
    brandIsActive = false;
    branchIsActive = false;
  }

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

  .button.currency-button {
    width: initial;
    position: relative;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    color: initial;
  }
</style>

<form autocomplete="off">
  {#if brandIsActive}
    {#await getBrandComponent() then _c}
      <svelte:component
        this="{_c}"
        bind:isActive="{brandIsActive}"
        onSubmit="{onSubmitBrand}"
      />
    {/await}
  {:else if branchIsActive}
    {#await getBranchComponent() then _c}
      <svelte:component
        this="{_c}"
        bind:isActive="{branchIsActive}"
        onSubmit="{onSubmitBranch}"
      />
    {/await}
  {:else if articleIsActive}
    {#await getArticleComponent() then _c}
      <svelte:component
        this="{_c}"
        bind:isActive="{articleIsActive}"
        onSubmit="{onSubmitArticle}"
      />
    {/await}
  {/if}

  <div class="field-container brand">
    <label class="label" for="{shoppingBrandInputId}">
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
            id="{shoppingBrandInputId}"
            class="input"
            type="text"
            bind:value="{brandId}"
          >
            <option value="" class="{shoppingBrandOptionSelector}"></option>

            {#each brandOptions as { name: nameOption, id } (id)}
              <option class="{shoppingBrandOptionSelector}" value="{id}">
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
            <option value="" class="{shoppingBranchOptionSelector}"></option>

            {#each branchOptions as { id, displayName } (id)}
              <option class="{shoppingBranchOptionSelector}" value="{id}">
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

  <div class="field-container article">
    <label class="label" for="{shoppingArticleInputId}">
      Article

      {#if articleId}<span>e.g. Penny rice</span>{/if}

      <span
        class="label-help-text"
        id="{shoppingAddArticleLabelHelpId}"
      >{articleLabelHelp}</span>
    </label>

    <div class="field has-addons">
      <div class="control is-expanded">
        <div class="select is-fullwidth">
          <select
            id="{shoppingArticleInputId}"
            class="input"
            type="text"
            bind:value="{articleId}"
          >
            <option value="" class="{shoppingArticleOptionSelector}"></option>

            {#each articleOptions as { id, specificName } (id)}
              <option class="{shoppingArticleOptionSelector}" value="{id}">
                {specificName}
              </option>
            {/each}
          </select>
        </div>
      </div>

      <div class="control" on:click|preventDefault="{activateArticleCb}">
        <button class="button is-info" id="{shoppingAddArticleId}">
          {articleLabelText}
        </button>
      </div>
    </div>

    <div class="field unit-of-measure">
      <label class="label" for="{shoppingUnitOfMeasureId}">
        Unit of measure
        <span>e.g. kg/litre</span>
      </label>

      <div class="control">
        <input
          id="{shoppingUnitOfMeasureId}"
          class="input"
          type="text"
          bind:value="{unit}"
        />
      </div>
    </div>

    <div class="field quantity-field">
      <label class="label" for="{shoppingQuantityId}"> Quantity </label>

      <div class="control">
        <input
          id="{shoppingQuantityId}"
          class="input"
          type="number"
          bind:value="{quantity}"
        />
      </div>
    </div>

    <div class="field unit-price-field">
      <label class="label" for="{shoppingUnitPriceId}"> Unit price </label>

      <div style="display:flex" class="control has-icons-left">
        <button
          class="button icon is-left currency-button"
          id="{shoppingAddArticleId}"
          disabled
        >
          EUR
        </button>

        <input
          style="flex:1;order-top-left-radius: 0;border-bottom-left-radius: 0;padding-left: calc(0.75em - 5px);"
          id="{shoppingUnitPriceId}"
          class="input"
          type="number"
          bind:value="{unitPrice}"
        />
      </div>
    </div>

    <fieldset disabled class="field total-price-field">
      <label class="label" for="{shoppingTotalPriceId}"> Total price </label>

      <div style="display:flex" class="control has-icons-left">
        <button
          class="button icon is-left currency-button"
          id="{shoppingAddArticleId}"
        >
          EUR
        </button>

        <input
          style="flex:1;order-top-left-radius: 0;border-bottom-left-radius: 0;padding-left: calc(0.75em - 5px);"
          id="{shoppingTotalPriceId}"
          class="input"
          type="text"
          value="{totalPrice}"
        />
      </div>
    </fieldset>
  </div>
</form>
