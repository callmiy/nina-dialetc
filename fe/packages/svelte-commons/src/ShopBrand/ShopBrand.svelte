<script lang="ts">
  import {
    shopBrandDomId,
    shopBrandNameInputDomId,
  } from "@talat/commons/src/shop-brand-dom";

  export let name: string;
  export let isActive = false;
  export let closeComponent = () => {
    isActive = false;
  };
</script>

<style lang="scss">
  @import "../../../commons/src/styles/extensions";

  .a {
    @extend %modal;
  }
</style>

<div class="a">
  <div class="modal" class:is-active={isActive}>
    <div class="modal-background" />
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">New Shop Brand</p>
        <button
          class="delete"
          aria-label="close"
          on:click|preventDefault={closeComponent} />
      </header>
      <section class="modal-card-body">
        <div class="field" id={shopBrandDomId}>
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
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button
          class="button"
          on:click|preventDefault={closeComponent}>Cancel</button>
      </footer>
    </div>
  </div>
</div>
