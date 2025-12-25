<script lang="ts">
  let { value, options = [], onchange } = $props();
</script>

<label>
  <select required bind:value {onchange}>
    <option selected disabled>Select one</option>
    {#each options as option, i}
      {#if typeof option === 'string'}
        <option value={option}>{option}</option>
      {:else}
        <option value={i}>{option?.name}</option>
      {/if}
    {/each}
  </select>
</label>
