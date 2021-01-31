<script lang="ts">
  import { Props } from "@ta/cm/src/components/article.utils";
  import {
    FORM_CONTAINS_ERRORS_MESSAGE,
    NOTHING_TO_SAVE_WARNING_MESSAGE,
  } from "@ta/cm/src/constants";
  import { newUlid } from "@ta/cm/src/ulid-uuid";
  import {
    articleCloseNotificationId,
    articleDomId,
    articleGenericNameInputDomId,
    articleResetId,
    articleSpecificNameErrorId,
    articleSpecificNameInputDomId,
    articleSubmitId,
    articleTagsInputDomId,
    closeArticleComponent,
    ERROR_NOTIFICATION_CLASS_NAME,
    WARNING_NOTIFICATION_CLASS_NAME,
  } from "@ta/cm/src/selectors";
  import FormCtrlMsg from "../form-ctrl-msg.svelte";
  import Notification from "../notification.svelte";

  /* FORM ATTRIBUTES AND ERROR VARIABLES */
  let specificName = "";
  let specifiNameError: string;
  let genericName = "";
  let tagTexts = "";
  let tags = [];

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
    specificName = "";
    specifiNameError = "";
    genericName = "";
    tagTexts = "";
    tags = [];
    clearSimpletextErrorCb();
  }

  function submitFormCb() {
    const formEmpty = !specificName && !tagTexts.length && !genericName;

    if (formEmpty) {
      notificationText = NOTHING_TO_SAVE_WARNING_MESSAGE;
      notificationTextClass = WARNING_NOTIFICATION_CLASS_NAME;

      return;
    }

    let hasError = false;

    if (specificName.length < 3) {
      specifiNameError = "Specific name is a required field";
      hasError = true;
    }

    if (hasError) {
      notificationText = FORM_CONTAINS_ERRORS_MESSAGE;
      notificationTextClass = ERROR_NOTIFICATION_CLASS_NAME;
      return;
    }

    const tagsTextsList = tagTexts ? tagTexts.split(/[\s,]/) : [];

    if (onSubmit) {
      onSubmit({
        id: newUlid(),
        specificName,
        genericName: genericName || null,
        tags: tagsTextsList.map((text) => {
          return {
            id: newUlid(),
            text,
          };
        }),
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
  id="{articleDomId}"
  class:modal="{true}"
  class:article="{true}"
  class:is-active="{true}"
  class:test-is-active="{isActive}"
>
  <div class="modal-background"></div>

  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">New Article</p>

      <button
        class="delete"
        aria-label="close"
        id="{closeArticleComponent}"
        on:click|preventDefault="{closeComponentCb}"
      ></button>
    </header>

    <fieldset class="modal-card-body">
      {#if notificationText}
        <Notification
          closeId="{articleCloseNotificationId}"
          isWarning="{notificationTextClass === WARNING_NOTIFICATION_CLASS_NAME}"
          isDanger="{notificationTextClass === ERROR_NOTIFICATION_CLASS_NAME}"
          onClose="{clearSimpletextErrorCb}"
          text="{notificationText}"
        />
      {/if}

      <div class="field specific-name-field">
        <label class="label" for="{articleSpecificNameInputDomId}">
          Specific name
          <span>e.g. "Penny rice"</span>
        </label>

        <div class="control">
          <input
            id="{articleSpecificNameInputDomId}"
            class="input"
            type="text"
            bind:value="{specificName}"
          />
        </div>

        {#if specifiNameError}
          <FormCtrlMsg
            error="{specifiNameError}"
            id="{articleSpecificNameErrorId}"
          />
        {/if}
      </div>

      <div class="field generic-name-field">
        <label class="label" for="{articleGenericNameInputDomId}">
          Generic name
          <span>e.g. "Rice"</span>
        </label>

        <div class="control">
          <input
            id="{articleGenericNameInputDomId}"
            class="input"
            type="text"
            bind:value="{genericName}"
          />
        </div>
      </div>

      <div class="field tag-text-field">
        <label class="label" for="{articleTagsInputDomId}">
          Tag
          <span>(comma/space separated)</span>
          <span>e.g. "parboiled, discounted"</span>
        </label>

        <div class="control">
          <input
            id="{articleTagsInputDomId}"
            class="input"
            type="text"
            bind:value="{tagTexts}"
          />
        </div>
      </div>
    </fieldset>

    <fieldset class="modal-card-foot">
      <button
        id="{articleSubmitId}"
        class="button is-success"
        on:click|preventDefault="{submitFormCb}"
      >
        Save changes
      </button>

      <button
        class="{`button ${WARNING_NOTIFICATION_CLASS_NAME}`}"
        id="{articleResetId}"
        on:click|preventDefault="{resetFormCb}"
      >Reset</button>
    </fieldset>
  </div>
</div>
