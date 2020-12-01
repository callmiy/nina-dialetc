<script src="./shop-brand.ts">
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
          <label class="label" for="{shopBrandNameInputDomId}">
            Shop brand name
            <span>e.g. "edeka"</span>
          </label>

          <div class="control">
            <input
              id="{shopBrandNameInputDomId}"
              class="input"
              type="text"
              bind:value="{name}"
            />
          </div>
        </div>

        <div class="field">
          <label
            class="label"
            for="{shopBrandCountryInputDomId}"
          >Country</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{shopBrandCountryInputDomId}" bind:value="{country}">
                <option value="">----------</option>

                {#await countriesCurrenciesPromise}
                  <option value="">----------</option>
                {:then { listCountries }}
                  {#if listCountries}
                    {#each listCountries as { id, country_name } (id)}
                      <option
                        value="{id}"
                        class="{shopBrandCountryOptionSelector}"
                      >
                        {country_name}
                      </option>
                    {/each}
                  {/if}
                {/await}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label
            class="label"
            for="{shopBrandCurrencyInputDomId}"
          >Currency</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select
                id="{shopBrandCurrencyInputDomId}"
                bind:value="{currency}"
              >
                <option value="">----------</option>

                {#await countriesCurrenciesPromise}
                  <option value="">----------</option>
                {:then { listCurrencies }}
                  {#if listCurrencies}
                    {#each listCurrencies as { id, currency_name, currency_code } (id)}
                      <option
                        value="{id}"
                        class="{shopBrandCurrencyOptionSelector}"
                      >
                        {currency_name}:
                        {currency_code}
                      </option>
                    {/each}
                  {/if}
                {/await}
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="{shopBrandPhoneInputDomId}">
            Telephone
          </label>

          <div class="control">
            <input
              id="{shopBrandPhoneInputDomId}"
              class="input"
              type="text"
              bind:value="{phone}"
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
