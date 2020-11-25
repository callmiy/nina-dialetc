<script lang="ts">
  import {
    shopBrandNameInputDomId,
    closeShopBrandComponentId,
    resetFormBtnId,
    shopBrandDomId,
    shopBrandCountryInputDomId,
    shopBrandCurrencyInputDomId,
    shopBrandPhoneInputDomId,
    simpleTextErrorCloseId,
    submitId,
  } from "@talat/commons/src/shop-brand-dom";
  import {
    IS_ACTIVE_CLASS_NAME,
    NOTHING_TO_SAVE_WARNING_MESSAGE,
  } from "@talat/commons/src/utils";

  /* FORM ATTRIBUTES */
  let name: string;
  let country: string = "";
  let currency: string = "";
  let phone: string = "";

  let simpleTextError = "";
  let simpleTextErrorClass = "";

  export let isActive = false;

  /* CALLBACKS */

  const closeComponentCb = () => {
    isActive = false;
  };

  const resetFormCb = () => {
    name = "";
    country = "";
    currency = "";
    phone = "";
  };

  const submitFormCb = () => {
    const formEmpty = !name && !country && !currency && !phone;

    if (formEmpty) {
      simpleTextError = NOTHING_TO_SAVE_WARNING_MESSAGE;
      simpleTextErrorClass = "is-warning";
    }
  };

  function clearSimpletextErrorCb() {
    simpleTextError = "";
    simpleTextErrorClass = "";
  }
</script>

<style lang="scss">
  @import "../../../commons/src/styles/extensions";

  .a {
    @extend %modal;
  }
</style>

<div class="a">
  <div id={shopBrandDomId} class="modal" class:is-active={isActive}>
    <div class="modal-background" />

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Shop Brand</p>

        <button
          class="delete"
          aria-label="close"
          id={closeShopBrandComponentId}
          on:click|preventDefault={closeComponentCb} />
      </header>

      <section class="modal-card-body">
        {#if simpleTextError}
          <div
            class:notification={true}
            class:is-warning={simpleTextErrorClass === 'is-warning'}>
            <button
              class="delete"
              id={simpleTextErrorCloseId}
              on:click|preventDefault={clearSimpletextErrorCb} />

            {simpleTextError}
          </div>
        {/if}

        <div class="field">
          <label class="label" for={shopBrandNameInputDomId}>
            Shop brand name
            <span>e.g. "edeka"</span>
          </label>

          <div class="control">
            <input
              id={shopBrandNameInputDomId}
              class="input"
              type="text"
              bind:value={name} />
          </div>
        </div>

        <div class="field">
          <label class="label" for={shopBrandCountryInputDomId}>Country</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id={shopBrandCountryInputDomId} bind:value={country}>
                <option value="">----------</option>

                <option value="de">Germany</option>

                <option value="fr">France</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label
            class="label"
            for={shopBrandCurrencyInputDomId}>Currency</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id={shopBrandCurrencyInputDomId} bind:value={currency}>
                <option value="">----------</option>

                <option value="eur">EUR</option>

                <option value="usd">USD</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for={shopBrandPhoneInputDomId}>
            Telephone
          </label>

          <div class="control">
            <input
              id={shopBrandPhoneInputDomId}
              class="input"
              type="text"
              bind:value={phone} />
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button
          id={submitId}
          class="button is-success"
          on:click|preventDefault={submitFormCb}>
          Save changes
        </button>

        <button
          class="button is-warning"
          id={resetFormBtnId}
          on:click|preventDefault={resetFormCb}>Reset</button>
      </footer>
    </div>
  </div>
</div>
