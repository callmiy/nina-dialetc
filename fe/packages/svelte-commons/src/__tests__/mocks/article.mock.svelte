<script lang="ts">
  import { articleVal } from "./mock-utils";

  export let isActive: boolean;
  export let onSubmit: any;
</script>

<div id="article-mock" class:active="{isActive}">
  <span
    id="article-submit-1"
    on:click="{() => {
      onSubmit(articleVal);
    }}"
  >1</span>
</div>
