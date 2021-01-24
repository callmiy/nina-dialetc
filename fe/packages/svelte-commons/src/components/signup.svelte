<script lang="ts">
  import { signupMutationExec } from "@ta/cm/src/apollo/signup";
  import {
    signupDomId,
    signupEmailInputId,
    signupErrorMsgSelector,
    signupPasswordInputId,
    signupRepeatPasswordInputId,
    signupSubmitId,
    signupSubmitLabel,
  } from "@ta/cm/src/selectors";

  let email = "";
  let password = "";
  let repeatPassword = "";
  let errors: undefined | string[];

  async function submitFormCb() {
    const result = await signupMutationExec({
      email,
      password,
      repeatPassword,
    });

    if (result.__typename === "SignupErrors") {
      errors = result.errors;
    }
  }
</script>

<style lang="postcss">
  .error-msg {
    display: flex;
    align-items: center;
    color: #dd4b39;
    padding: 0.5em 0;
  }
</style>

<div id="{signupDomId}">
  {#if errors}
    {#each errors as error}
      <div class="{`${signupErrorMsgSelector} error-msg`}">
        <span> {error} </span>
      </div>
    {/each}
  {/if}

  <div class="field">
    <label class="label" for="{signupEmailInputId}"> Email </label>

    <div class="control">
      <input
        id="{signupEmailInputId}"
        class="input"
        type="text"
        bind:value="{email}"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="{signupPasswordInputId}"> Password </label>

    <div class="control">
      <input
        id="{signupPasswordInputId}"
        class="input"
        type="text"
        bind:value="{password}"
      />
    </div>
  </div>

  <div class="field">
    <label class="label" for="{signupRepeatPasswordInputId}">
      Repeat Password
    </label>

    <div class="control">
      <input
        id="{signupRepeatPasswordInputId}"
        class="input"
        type="text"
        bind:value="{repeatPassword}"
      />
    </div>
  </div>

  <button
    id="{signupSubmitId}"
    class="button is-success"
    on:click|preventDefault="{submitFormCb}"
  >
    {signupSubmitLabel}
  </button>
</div>
