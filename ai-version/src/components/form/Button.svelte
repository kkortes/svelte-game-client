<script lang="ts">
  let { children, onclick, ...rest }: any = $props();
</script>

<button {onclick} {...rest}>
  {@render children?.()}
</button>
