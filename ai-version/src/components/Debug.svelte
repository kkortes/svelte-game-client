<script lang="ts">
  let { data } = $props();

  const { IS_DEV } = ENV;
</script>

{#if IS_DEV}
  <code>
    <pre class="text-[10px]">{JSON.stringify(data, null, 2)}</pre>
  </code>
{/if}
