<script lang="ts">
  import Signup from "@ta/sc/src/components/signup.svelte";
</script>

<style lang="postcss">
  .signup {
    background: #fff;
    padding: 25px;
    margin-top: 20px;
  }

  @media (min-width: 500px) {
    .signup {
      margin: 50px 0;
      border-radius: 8px;
      border: solid 1px #dbdbdb;
    }
  }
</style>

<div class="signup">
  <form action="">
    <Signup />
  </form>
</div>
