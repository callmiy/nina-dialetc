<script lang="ts">
  import {
    branchCityInputId,
    branchStreetInputId,
    closeBrandComponentId,
    branchResetId,
    branchDomId,
    branchPostCodeInputId,
    branchAliasInputId,
    branchSubmitId,
    branchPostCodeOptionSelector,
    branchNotificationTextCloseId,
    branchPostCodeErrorId,
    branchCityErrorId,
    branchStreetErrorId,
    branchPhoneInputId,
    ERROR_NOTIFICATION_CLASS_NAME,
    WARNING_NOTIFICATION_CLASS_NAME,
  } from "@ta/cm/src/selectors";
  import {
    IS_ACTIVE_CLASS_NAME,
    NOTHING_TO_SAVE_WARNING_MESSAGE,
    FORM_CONTAINS_ERRORS_MESSAGE,
  } from "@ta/cm/src/constants";
  import { newUlid } from "@ta/cm/src/db/ulid-uuid";

  import FormCtrlMsg from "../form-ctrl-msg.svelte";
  import Notification from "../notification.svelte";

  import { BranchValues } from "./branch-utils";

  /* FORM ATTRIBUTES AND ERROR VARIABLES */
  let postCode = "";
  let postCodeError: string;

  let city = "";
  let cityError: string;

  let street = "";
  let streetError: string;

  let branchAlias = "";
  let phone = "";

  let notificationText = "";
  let notificationTextClass = "";

  /* PROPS */
  export let isActive: Props["isActive"] = true;
  export let onSubmit: Props["onSubmit"];

  /* CALLBACKS */

  function closeComponentCb() {
    isActive = false;
  }

  function resetFormCb() {
    street = "";
    streetError = "";

    city = "";
    cityError = "";

    postCode = "";
    postCodeError = "";

    branchAlias = "";
    phone = "";
    clearSimpletextErrorCb();
  }

  function submitFormCb() {
    postCode = postCode.trim();
    street = street.trim();
    city = city.trim();
    branchAlias = branchAlias.trim();
    phone = phone.trim();

    const formEmpty = !street && !city && !postCode && !branchAlias && !phone;

    if (formEmpty) {
      notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
      notificationTextClass = WARNING_NOTIFICATION_CLASS_NAME;
      return;
    }

    let hasError = false;
    postCodeError = "";
    streetError = "";
    cityError = "";

    if (postCode.length < 3) {
      postCodeError = "Post code is a compulsory field";
      hasError = true;
    }

    if (street.length < 4) {
      streetError = "Street is compulsory field";
      hasError = true;
    }

    if (city.length < 2) {
      cityError = "City is a compulsory field";
      hasError = true;
    }

    if (hasError) {
      notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
      notificationTextClass = ERROR_NOTIFICATION_CLASS_NAME;
      return;
    }

    if (onSubmit) {
      onSubmit({
        id: newUlid(),
        street,
        city,
        postCode,
        branchAlias: branchAlias || null,
        phone: phone || null,
      });
    }
  }

  function clearSimpletextErrorCb() {
    notificationText = "";
    notificationTextClass = "";
  }

  export type Props = {
    isActive: boolean;
    onSubmit?: (values: BranchValues) => void;
  };
</script>

<style lang="scss">
  @import "../../../../commons/src/styles/extensions";

  .modal {
    @extend %modal;
  }
</style>

<div
  id="{branchDomId}"
  class:modal="{true}"
  class:shop-branch="{true}"
  class:is-active="{true}"
  class:test-is-active="{isActive}"
>
  <div class="modal-background"></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Shop Branch/Location</p>

      <button
        class="delete"
        aria-label="close"
        id="{closeBrandComponentId}"
        on:click|preventDefault="{closeComponentCb}"
      ></button>
    </header>

    <fieldset class="modal-card-body">
      {#if notificationText}
        <Notification
          closeId="{branchNotificationTextCloseId}"
          isWarning="{notificationTextClass === WARNING_NOTIFICATION_CLASS_NAME}"
          isDanger="{notificationTextClass === ERROR_NOTIFICATION_CLASS_NAME}"
          onClose="{clearSimpletextErrorCb}"
          text="{notificationText}"
        />
      {/if}

      <div class="field post-code-field">
        <label class="label" for="{branchPostCodeInputId}">Post code</label>

        <div class="control">
          <input
            id="{branchPostCodeInputId}"
            class="input"
            type="text"
            bind:value="{postCode}"
          />
        </div>

        {#if postCodeError}
          <FormCtrlMsg error="{postCodeError}" id="{branchPostCodeErrorId}" />
        {/if}
      </div>

      <div class="field city-field">
        <label class="label" for="{branchCityInputId}">City</label>

        <div class="control">
          <input
            id="{branchCityInputId}"
            class="input"
            type="text"
            bind:value="{city}"
          />
        </div>

        {#if cityError}
          <FormCtrlMsg error="{cityError}" id="{branchCityErrorId}" />
        {/if}
      </div>

      <div class="field street-field">
        <label class="label" for="{branchStreetInputId}">
          Street name and number
        </label>

        <div class="control">
          <input
            id="{branchStreetInputId}"
            class="input"
            type="text"
            bind:value="{street}"
          />
        </div>

        {#if streetError}
          <FormCtrlMsg error="{streetError}" id="{branchStreetErrorId}" />
        {/if}
      </div>

      <div class="field branch-alias-field">
        <label class="label" for="{branchAliasInputId}"> Branch Alias </label>

        <div class="control">
          <input
            id="{branchAliasInputId}"
            class="input"
            type="text"
            bind:value="{branchAlias}"
          />
        </div>
      </div>

      <div class="field branch-phone">
        <label class="label" for="{branchPhoneInputId}"> Phone </label>

        <div class="control">
          <input
            id="{branchPhoneInputId}"
            class="input"
            type="text"
            bind:value="{phone}"
          />
        </div>
      </div>
    </fieldset>

    <fieldset class="modal-card-foot">
      <button
        id="{branchSubmitId}"
        class="button is-success"
        on:click|preventDefault="{submitFormCb}"
      >
        Save changes
      </button>

      <button
        class="{`button ${WARNING_NOTIFICATION_CLASS_NAME}`}"
        id="{branchResetId}"
        on:click|preventDefault="{resetFormCb}"
      >Reset</button>
    </fieldset>
  </div>
</div>
