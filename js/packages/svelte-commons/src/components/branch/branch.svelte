<script lang="ts">
  import {
    BranchFormValue,
    EMPTY_BRANCH,
    Props,
  } from "@ta/cm/src/components/branch-utils";
  import {
    FORM_CONTAINS_ERRORS_MESSAGE,
    NOTHING_TO_SAVE_WARNING_MESSAGE,
  } from "@ta/cm/src/constants";
  import { newUlid } from "@ta/cm/src/ulid-uuid";
  import {
    branchAliasInputId,
    branchCityErrorId,
    branchCityInputId,
    branchDomId,
    branchNotificationTextCloseId,
    branchPhoneInputId,
    branchPostCodeErrorId,
    branchPostCodeInputId,
    branchResetId,
    branchStreetErrorId,
    branchStreetInputId,
    branchSubmitId,
    closeBrandComponentId,
    ERROR_NOTIFICATION_CLASS_NAME,
    WARNING_NOTIFICATION_CLASS_NAME,
  } from "@ta/cm/src/selectors";
  import FormCtrlMsg from "../form-ctrl-msg.svelte";
  import Notification from "../notification.svelte";

  export let branch = (null as unknown) as Props["branch"];

  let formValues = (branch || {
    ...EMPTY_BRANCH,
  }) as BranchFormValue;

  // null values

  const untouchedFormValues = {
    ...formValues,
  } as BranchFormValue;

  /* FORM ERROR VARIABLES */
  let postCodeError: string;
  let cityError: string;
  let streetError: string;

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
    formValues = {
      ...untouchedFormValues,
    };
    streetError = "";
    cityError = "";
    postCodeError = "";
    clearSimpletextErrorCb();
  }

  function submitFormCb() {
    const postCode = formValues.postCode.trim();
    const street = formValues.street.trim();
    const city = formValues.city.trim();
    const branchAlias = formValues.branchAlias.trim();
    const phone = formValues.phone.trim();

    const formEmpty =
      street === untouchedFormValues.street &&
      city === untouchedFormValues.city &&
      postCode === untouchedFormValues.postCode &&
      branchAlias === untouchedFormValues.branchAlias &&
      phone === untouchedFormValues.phone;

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

    const id = formValues.id || newUlid();

    if (onSubmit) {
      onSubmit({
        ...formValues,
        id,
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
</script>

<style lang="postcss">
  .modal {
    display: block;
    /* @extend %modal; */
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
            bind:value="{formValues.postCode}"
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
            bind:value="{formValues.city}"
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
            bind:value="{formValues.street}"
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
            bind:value="{formValues.branchAlias}"
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
            bind:value="{formValues.phone}"
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
