<script lang="ts">
  import {
    BrandFormValue,
    EMPTY_BRAND_FORM,
    Props,
  } from "@ta/cm/src/components/brand-utils";
  import {
    FORM_CONTAINS_ERRORS_MESSAGE,
    NOTHING_TO_SAVE_WARNING_MESSAGE,
    StateValue,
  } from "@ta/cm/src/constants";
  import { newUlid } from "@ta/cm/src/ulid-uuid";
  import {
    brandCountryInputDomId,
    brandCountryInputFieldId,
    brandCountryMsgDomId,
    brandCountryOptionSelector,
    brandCurrencyInputDomId,
    brandCurrencyMsgDomId,
    brandCurrencyOptionSelector,
    brandDomId,
    brandNameErrorDomId,
    brandNameInputDomId,
    brandNotificationTextCloseId,
    brandPhoneInputDomId,
    brandSubmitId,
    closeBrandComponentId,
    ERROR_NOTIFICATION_CLASS_NAME,
    resetFormBtnId,
    WARNING_NOTIFICATION_CLASS_NAME,
  } from "@ta/cm/src/selectors";
  import {
    countriesStore,
    countriesStoreData,
    countriesStoreError,
    countriesStoreLoading,
    currenciesStore,
    currenciesStoreData,
    currenciesStoreError,
    currenciesStoreLoading,
    getCountriesCurrenciesStore,
  } from "../../stores/get-countries-and-currencies.store";
  import FormCtrlMsg from "../form-ctrl-msg.svelte";
  import Notification from "../notification.svelte";
  import Spinner from "../spinner.svelte";

  // Fetch data and initiate store
  getCountriesCurrenciesStore();

  export let brand = (null as unknown) as Props["brand"];

  let formValues = (brand || {
    ...EMPTY_BRAND_FORM,
  }) as BrandFormValue;

  const untouchedFormValues = {
    ...formValues,
  };

  /* FORM ERROR VARIABLES */
  let nameError: string;
  let countryError: string;
  let currencyError: string;

  let notificationText = "";
  let notificationTextClass = "";

  let fetchLoadingFlag = false;
  let fetchErrorFlag = false;
  let disableForm = false;

  $: {
    if (
      $currenciesStore.value === StateValue.loading ||
      $countriesStore.value === StateValue.loading
    ) {
      fetchLoadingFlag = true;
      fetchErrorFlag = false;
    } else if (
      $currenciesStore.value === StateValue.errors ||
      $countriesStore.value === StateValue.errors
    ) {
      fetchLoadingFlag = false;
      fetchErrorFlag = true;
    } else {
      fetchLoadingFlag = false;
      fetchErrorFlag = false;
    }

    disableForm = fetchErrorFlag || fetchLoadingFlag;
  }

  /* PROPS */
  export let isActive: Props["isActive"] = false;
  export let onSubmit: Props["onSubmit"];

  /* CALLBACKS */

  function closeComponentCb() {
    isActive = false;
  }

  function resetFormCb() {
    formValues = {
      ...untouchedFormValues,
    };

    nameError = "";
    countryError = "";
    currencyError = "";
    clearSimpletextErrorCb();
  }

  function submitFormCb() {
    const name = formValues.name.trim();
    const countryId = formValues.countryId.trim();
    const currencyId = formValues.currencyId.trim();
    const phone = formValues.phone.trim();

    const formEmpty =
      name === untouchedFormValues.name &&
      countryId === untouchedFormValues.countryId &&
      currencyId === untouchedFormValues.currencyId &&
      phone === untouchedFormValues.phone;

    if (formEmpty) {
      notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
      notificationTextClass = WARNING_NOTIFICATION_CLASS_NAME;

      return;
    }

    let hasError = false;

    if (name.length < 3) {
      nameError = "shop brand name is compulsory field";
      hasError = true;
    }

    if (countryId.length === 0) {
      countryError = "Pick a country from the dropdown";
      hasError = true;
    }

    if (currencyId.length === 0) {
      currencyError = "Pick a currency from the dropdown";
      hasError = true;
    }

    if (hasError) {
      notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
      notificationTextClass = ERROR_NOTIFICATION_CLASS_NAME;
      return;
    }

    const id = formValues.id || newUlid();

    if (onSubmit) {
      onSubmit({
        ...formValues,
        id,
        name,
        countryId,
        currencyId,
        phone: phone || null,
      });
    }
  }

  function clearSimpletextErrorCb() {
    notificationText = "";
    notificationTextClass = "";
  }
</script>

<style lang="scss">
  @import "../../../../commons/src/styles/extensions";

  .modal {
    @extend %modal;
  }

  .brand-loading-container {
    display: flex;

    :global(.brand-spinner) {
      top: -3px;
      margin-left: 35px;
    }
  }
</style>

<div id="{brandDomId}" class="modal is-active">
  <div class="modal-background"></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Shop Brand</p>

      <button
        class="delete"
        aria-label="close"
        id="{closeBrandComponentId}"
        on:click|preventDefault="{closeComponentCb}"
      ></button>
    </header>

    <fieldset class="modal-card-body" disabled="{disableForm}">
      {#if notificationText}
        <Notification
          closeId="{brandNotificationTextCloseId}"
          isWarning="{notificationTextClass === WARNING_NOTIFICATION_CLASS_NAME}"
          isDanger="{notificationTextClass === ERROR_NOTIFICATION_CLASS_NAME}"
          onClose="{clearSimpletextErrorCb}"
          text="{notificationText}"
        />
      {/if}

      <div class="field">
        <label class="label" for="{brandNameInputDomId}">
          Shop brand name
          <span>e.g. "edeka"</span>
        </label>

        <div class="control">
          <input
            id="{brandNameInputDomId}"
            class="input"
            type="text"
            bind:value="{formValues.name}"
          />
        </div>

        {#if nameError}
          <FormCtrlMsg error="{nameError}" id="{brandNameErrorDomId}" />
        {/if}
      </div>

      <div class="field country-field" id="{brandCountryInputFieldId}">
        <label class="label" for="{brandCountryInputDomId}">Country</label>

        <div class="control">
          <div class="select is-fullwidth">
            <select
              id="{brandCountryInputDomId}"
              bind:value="{formValues.countryId}"
            >
              <option value="">----------</option>

              {#if $countriesStore.value === StateValue.data}
                {#each $countriesStoreData.data.countries as { id, countryName } (id)}
                  <option value="{id}" class="{brandCountryOptionSelector}">
                    {countryName}
                  </option>
                {/each}
              {/if}
            </select>
          </div>

          {#if countryError}
            <FormCtrlMsg error="{countryError}" id="{brandCountryMsgDomId}" />
          {:else if $countriesStore.value === StateValue.loading}
            <div class="brand-loading-container">
              <FormCtrlMsg
                info="{$countriesStoreLoading.msg}"
                id="{brandCountryMsgDomId}"
              />

              <Spinner class="brand-spinner" />
            </div>
          {:else if $countriesStore.value === StateValue.errors}
            <FormCtrlMsg
              error="{$countriesStoreError.error}"
              id="{brandCountryMsgDomId}"
            />
          {/if}
        </div>
      </div>

      <div class="field currency-field">
        <label class="label" for="{brandCurrencyInputDomId}">Currency</label>

        <div class="control">
          <div class="select is-fullwidth">
            <select
              id="{brandCurrencyInputDomId}"
              bind:value="{formValues.currencyId}"
            >
              <option value="">----------</option>

              {#if $currenciesStore.value === StateValue.data}
                {#each $currenciesStoreData.data.currencies as { id, currencyName, currencyCode } (id)}
                  <option value="{id}" class="{brandCurrencyOptionSelector}">
                    {currencyName}:
                    {currencyCode}
                  </option>
                {/each}
              {/if}
            </select>
          </div>

          {#if currencyError}
            <FormCtrlMsg error="{currencyError}" id="{brandCurrencyMsgDomId}" />
          {:else if $currenciesStore.value === StateValue.loading}
            <div class="brand-loading-container">
              <FormCtrlMsg
                info="{$currenciesStoreLoading.msg}"
                id="{brandCurrencyMsgDomId}"
              />

              <Spinner class="brand-spinner" />
            </div>
          {:else if $currenciesStore.value === StateValue.errors}
            <FormCtrlMsg
              error="{$currenciesStoreError.error}"
              id="{brandCurrencyMsgDomId}"
            />
          {/if}
        </div>
      </div>

      <div class="field">
        <label class="label" for="{brandPhoneInputDomId}"> Telephone </label>

        <div class="control">
          <input
            id="{brandPhoneInputDomId}"
            class="input"
            type="text"
            bind:value="{formValues.phone}"
          />
        </div>
      </div>
    </fieldset>

    <fieldset class="modal-card-foot" disabled="{disableForm}">
      <button
        id="{brandSubmitId}"
        class="button is-success"
        on:click|preventDefault="{submitFormCb}"
      >
        Save changes
      </button>

      <button
        class="{`button ${WARNING_NOTIFICATION_CLASS_NAME}`}"
        id="{resetFormBtnId}"
        on:click|preventDefault="{resetFormCb}"
      >Reset</button>
    </fieldset>
  </div>
</div>
