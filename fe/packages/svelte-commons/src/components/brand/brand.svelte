<script lang="ts">
  import {
    brandNameInputDomId,
    closeBrandComponentId,
    resetFormBtnId,
    brandDomId,
    brandCountryInputDomId,
    brandCurrencyInputDomId,
    brandPhoneInputDomId,
    submitBrandId,
    brandCountryOptionSelector,
    brandCurrencyOptionSelector,
    brandNotificationTextCloseId,
    brandNameErrorDomId,
    brandCountryErrorDomId,
    brandCurrencyErrorDomId,
  } from "@ta/cm/src/selectors";
  import {
    IS_ACTIVE_CLASS_NAME,
    NOTHING_TO_SAVE_WARNING_MESSAGE,
    FORM_CONTAINS_ERRORS_MESSAGE,
  } from "@ta/cm/src/constants";
  import {
    getCountriesCurrenciesStore,
    currenciesStore,
    countriesStore,
  } from "../../stores/get-countries-and-currencies.store";
  import FormCtrlError from "../form-ctrl-error.svelte";
  import { CurrencyFragment, CountryFragment } from "@ta/cm/src/gql/ops-types";
  import Notification from "../notification.svelte";
  import { newUlid } from "@ta/cm/src/db/ulid-uuid";
  import { Props } from "./brand-utils";
  import { StateValue } from "@ta/cm/src/constants";

  getCountriesCurrenciesStore();

  /* FORM ATTRIBUTES AND ERROR VARIABLES */
  let name = "";
  let nameError: string;

  let country = "";
  let countryError: string;

  let currency = "";
  let currencyError: string;

  let phone = "";

  let notificationText = "";
  let notificationTextClass = "";

  /* PROPS */
  export let isActive: Props["isActive"] = false;
  export let onSubmit: Props["onSubmit"];

  /* CALLBACKS */

  function closeComponentCb() {
    isActive = false;
  }

  function resetFormCb() {
    name = "";
    nameError = "";

    country = "";
    countryError = "";

    currency = "";
    currencyError = "";

    phone = "";
    clearSimpletextErrorCb();
  }

  function submitFormCb() {
    const formEmpty = !name && !country && !currency && !phone;

    if (formEmpty) {
      notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
      notificationTextClass = "is-warning";

      return;
    }

    let hasError = false;

    if (name.length < 3) {
      nameError = "shop brand name is compulsory field";
      hasError = true;
    }

    if (country.length === 0) {
      countryError = "Pick a country from the dropdown";
      hasError = true;
    }

    if (currency.length === 0) {
      currencyError = "Pick a currency from the dropdown";
      hasError = true;
    }

    if (hasError) {
      notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
      notificationTextClass = "is-danger";
      return;
    }

    const countryData = $countriesStore.data.countries.find((e) => {
      return e.id === country;
    }) as CountryFragment;

    const currencyData = $currenciesStore.data.currencies.find((c) => {
      return c.id === currency;
    }) as CurrencyFragment;

    if (onSubmit) {
      onSubmit({
        id: newUlid(),
        name,
        country: countryData,
        currency: currencyData,
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

  .a {
    @extend %modal;
  }
</style>

{JSON.stringify($countriesStore, null, 2)}

<div class="a">
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

      <section class="modal-card-body">
        {#if notificationText}
          <Notification
            closeId="{brandNotificationTextCloseId}"
            isWarning="{notificationTextClass === 'is-warning'}"
            isDanger="{notificationTextClass === 'is-danger'}"
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
              bind:value="{name}"
            />
          </div>

          {#if nameError}
            <FormCtrlError error="{nameError}" id="{brandNameErrorDomId}" />
          {/if}
        </div>

        <div class="field country-field">
          <label class="label" for="{brandCountryInputDomId}">Country</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{brandCountryInputDomId}" bind:value="{country}">
                <option value="">----------</option>

                {#if $countriesStore.value === StateValue.data}
                  {#each $countriesStore.data.countries as { id, countryName } (id)}
                    <option value="{id}" class="{brandCountryOptionSelector}">
                      {countryName}
                    </option>
                  {/each}
                {/if}
              </select>
            </div>

            {#if countryError}
              <FormCtrlError
                error="{countryError}"
                id="{brandCountryErrorDomId}"
              />
            {/if}
          </div>
        </div>

        <div class="field currency-field">
          <label class="label" for="{brandCurrencyInputDomId}">Currency</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{brandCurrencyInputDomId}" bind:value="{currency}">
                <option value="">----------</option>

                {#if $currenciesStore.value === StateValue.data}
                  {#each $currenciesStore.data.currencies as { id, currencyName, currencyCode } (id)}
                    <option value="{id}" class="{brandCurrencyOptionSelector}">
                      {currencyName}:
                      {currencyCode}
                    </option>
                  {/each}
                {/if}
              </select>
            </div>

            {#if currencyError}
              <FormCtrlError
                error="{currencyError}"
                id="{brandCurrencyErrorDomId}"
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
              bind:value="{phone}"
            />
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button
          id="{submitBrandId}"
          class="button is-success"
          on:click|preventDefault="{submitFormCb}"
        >
          Save changes
        </button>

        <button
          class="button is-warning"
          id="{resetFormBtnId}"
          on:click|preventDefault="{resetFormCb}"
        >Reset</button>
      </footer>
    </div>
  </div>
</div>
