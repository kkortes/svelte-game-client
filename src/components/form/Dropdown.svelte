<script>
  import { emptySlot } from '$src/helpers';

  export let value = 'Choose one';
  export let options = [];
</script>

<div class="relative">
  <select class="absolute w-full h-full inset-0 opacity-0" bind:value on:change>
    <optgroup label="Choose one">
      {#each options as option, i}
        {#if emptySlot(option)}
          <option value={option}>{option}</option>
        {:else}
          <option value={i}>{option?.name}</option>
        {/if}
      {/each}
    </optgroup>
  </select>
  <Frame>
    <div class="cx !justify-between">
      {#if options.find(emptySlot)}
        <span class="first-letter:uppercase" class:default={value === 'Choose one'}>{value}</span>
      {:else if options[value]?.icon}
        <Icon name={options[value].icon} />
      {:else}
        {value || 'N/A'}
      {/if}
      <Icon class="text-black" name="down" />
    </div>
  </Frame>
</div>
