<script src="./branch-utils.ts">
</script>

<style lang="scss">
  @import "../../../commons/src/styles/extensions";

  .a {
    @extend %modal;
  }
</style>

<div class="a">
  <div id="{shopBrandDomId}" class="modal is-active">
    <div class="modal-background"></div>

    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Shop Brand</p>

        <button
          class="delete"
          aria-label="close"
          id="{closeShopBrandComponentId}"
          on:click|preventDefault="{closeComponentCb}"
        ></button>
      </header>

      <section class="modal-card-body">
        {#if simpleTextError}
          <div
            class:notification="{true}"
            class:is-warning="{simpleTextErrorClass === 'is-warning'}"
            class:is-danger="{simpleTextErrorClass === 'is-danger'}"
          >
            <button
              class="delete"
              id="{simpleTextErrorCloseId}"
              on:click|preventDefault="{clearSimpletextErrorCb}"
            ></button>

            {simpleTextError}
          </div>
        {/if}

        <div class="field">
          <label class="label" for="{shopBrandCurrencyInputDomId}">Post Code</label>

          <div class="control">
            <input
              id="{shopBrandCurrencyInputDomId}"
              class="input"
              type="text"
              bind:value="{postCode}"
            />

            {#if postCodeError}
              <FormCtrlError error="{postCodeError}" />
            {/if}
          </div>
        </div>

        <div class="field">
          <label class="label" for="{shopBrandCountryInputDomId}">City</label>

          <div class="control">
            <input
              id="{shopBrandCountryInputDomId}"
              class="input"
              type="text"
              bind:value="{city}"
            />

            {#if cityError}
              <FormCtrlError error="{cityError}" />
            {/if}
          </div>
        </div>

        <div class="field">
          <label class="label" for="{shopBrandNameInputDomId}"> Street </label>

          <div class="control">
            <input
              id="{shopBrandNameInputDomId}"
              class="input"
              type="text"
              bind:value="{street}"
            />
          </div>

          {#if streetError}
            <FormCtrlError error="{streetError}" />
          {/if}
        </div>

        <div class="field">
          <label class="label" for="{shopBrandPhoneInputDomId}">
            Branch Alias
          </label>

          <div class="control">
            <input
              id="{shopBrandPhoneInputDomId}"
              class="input"
              type="text"
              bind:value="{branchAlias}"
            />
          </div>
        </div>
      </section>

      <footer class="modal-card-foot">
        <button
          id="{submitId}"
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
