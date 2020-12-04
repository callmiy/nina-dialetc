<script src="./branch-utils.ts">
</script>

<style lang="scss">
  @import "../../../commons/src/styles/extensions";

  .a {
    @extend %modal;
  }
</style>

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
          <div
            class:notification="{true}"
            class:is-warning="{notificationTextClass === 'is-warning'}"
            class:is-danger="{notificationTextClass === 'is-danger'}"
          >
            <button
              class="delete"
              on:click|preventDefault="{clearSimpletextErrorCb}"
            ></button>

            {notificationText}
          </div>
        {/if}

        <div class="field">
          <label class="label" for="{brandCurrencyInputDomId}">Post Code</label>

          <div class="control">
            <input
              id="{brandCurrencyInputDomId}"
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
          <label class="label" for="{brandCountryInputDomId}">City</label>

          <div class="control">
            <input
              id="{brandCountryInputDomId}"
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
          <label class="label" for="{brandNameInputDomId}"> Street </label>

          <div class="control">
            <input
              id="{brandNameInputDomId}"
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
          <label class="label" for="{brandPhoneInputDomId}">
            Branch Alias
          </label>

          <div class="control">
            <input
              id="{brandPhoneInputDomId}"
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
