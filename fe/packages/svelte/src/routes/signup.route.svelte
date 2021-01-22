<script lang="ts">
  import Signup from "@ta/sc/src/components/signup.svelte";
</script>

<style lang="scss">
  .main {
    display: flex;
    justify-content: center;
  }

  .signup {
    background: #fff;
    padding: 25px;
    margin-top: 20px;

    @media (max-width: 500px) {
      margin: 50px 0;
      border-radius: 8px;
      border: solid 1px #dbdbdb;
    }
  }
</style>

<div class="main">
  <div class="signup">
    <Signup />
  </div>
</div>
