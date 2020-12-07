<script src="./_branch.ts">
</script>

<style lang="scss">
  @import "../../../commons/src/styles/extensions";

  .branch {
    @extend %modal;
  }
</style>

<div class="branch">
  <div id="{brandDomId}" class="modal is-active">
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

        <div class="field post-code-field">
          <label class="label" for="{branchPostCodeInputId}">Select post code</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{branchPostCodeInputId}" bind:value="{postCode}">
                <option value="">----------</option>

                {#await countriesCurrenciesPromise}
                  <option value="" class="{branchPostCodeOptionSelector}">
                    ----------
                  </option>
                {:then { listCurrencies }}
                  {#if listCurrencies}
                    {#each listCurrencies as { id, currency_name, currency_code } (id)}
                      <option
                        value="{id}"
                        class="{branchPostCodeOptionSelector}"
                      >
                        {currency_name}:
                        {currency_code}
                      </option>
                    {/each}
                  {/if}
                {/await}
              </select>
            </div>

            {#if postCodeError}
              <FormCtrlError error="{postCodeError}" />
            {/if}
          </div>
        </div>

        <div class="field city-field">
          <label class="label" for="{branchCityInputId}">Select city</label>

          <div class="control">
            <div class="select is-fullwidth">
              <select id="{branchCityInputId}" bind:value="{city}">
                <option value="" class="{branchCityOptionSelector}">
                  ----------
                </option>

                {#await countriesCurrenciesPromise}
                  <option value="">----------</option>
                {:then { listCurrencies }}
                  {#if listCurrencies}
                    {#each listCurrencies as { id, currency_name, currency_code } (id)}
                      <option value="{id}" class="{branchCityOptionSelector}">
                        {currency_name}:
                        {currency_code}
                      </option>
                    {/each}
                  {/if}
                {/await}
              </select>
            </div>

            {#if cityError}
              <FormCtrlError error="{cityError}" />
            {/if}
          </div>
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
            <FormCtrlError error="{streetError}" />
          {/if}
        </div>

        <div class="field">
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
      </section>

      <footer class="modal-card-foot">
        <button
          id="{branchSubmitId}"
          class="button is-success"
          on:click|preventDefault="{submitFormCb}"
        >
          Save changes
        </button>

        <button
          class="button is-warning"
          id="{branchResetId}"
          on:click|preventDefault="{resetFormCb}"
        >Reset</button>
      </footer>
    </div>
  </div>
</div>
