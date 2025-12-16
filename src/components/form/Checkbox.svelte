<script lang="ts">
  let { value = $bindable(false), onchange, children, ...rest } = $props();
</script>

<label>
  <input type="checkbox" checked={value} {onchange} {...rest} />
  {@render children?.()}
</label>
