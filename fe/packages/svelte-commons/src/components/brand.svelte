<script src="./_brand.ts">
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
          <Notification
            closeId="{notificationTextCloseId}"
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
            <FormCtrlError error="{nameError}" />
          {/if}
        </div>

        <div class="field country-field">
          <label class="label" for="{brandCountryInputDomId}">Country</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{brandCountryInputDomId}" bind:value="{country}">
                <option value="">----------</option>

                {#await countriesCurrenciesPromise}
                  <option value="">----------</option>
                {:then { listCountries }}
                  {#if listCountries && listCountries.edges}
                    {#each listCountries.edges as { node: { id, countryName } } (id)}
                      <option value="{id}" class="{brandCountryOptionSelector}">
                        {countryName}
                      </option>
                    {/each}
                  {/if}
                {/await}
              </select>
            </div>

            {#if countryError}
              <FormCtrlError error="{countryError}" />
            {/if}
          </div>
        </div>

        <div class="field currency-field">
          <label class="label" for="{brandCurrencyInputDomId}">Currency</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{brandCurrencyInputDomId}" bind:value="{currency}">
                <option value="">----------</option>

                {#await countriesCurrenciesPromise}
                  <option value="">----------</option>
                {:then { listCurrencies }}
                  {#if listCurrencies}
                    {#each listCurrencies as { id, currencyName, currencyCode } (id)}
                      <option
                        value="{id}"
                        class="{brandCurrencyOptionSelector}"
                      >
                        {currencyName}:
                        {currencyCode}
                      </option>
                    {/each}
                  {/if}
                {/await}
              </select>
            </div>

            {#if currencyError}
              <FormCtrlError error="{currencyError}" />
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
