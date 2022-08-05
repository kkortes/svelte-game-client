<script>
  import { emptySlot } from '$src/helpers';

  export let value = 'Choose one';
  export let options = [];
</script>

<div class="dropdown">
  <!-- svelte-ignore a11y-no-onchange -->
  <select bind:value on:change>
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
    <Crow left>
      <div>
        {#if options.find(emptySlot)}
          <span class:default={value === 'Choose one'}>{value}</span>
        {:else if options[value]?.color}
          <span style={`color: ${options[value].color};`}>
            {options[value].name}
          </span>
        {:else if options[value]?.icon}
          <Icon name={options[value].icon} />
        {:else}
          {value || 'N/A'}
        {/if}
        <Icon name="down" size={14} color="hsl(var(--gray))" />
      </div>
    </Crow>
  </Frame>
</div>

<style>
  span {
    display: inline-block;
  }
  span::first-letter {
    text-transform: uppercase;
  }
  .dropdown {
    position: relative;
  }
  select {
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    opacity: 0;
  }
  select:focus {
    outline: 0.5px solid rgba(255, 255, 255, 0.5);
  }
  :global(.dropdown .frame .content.content) {
    padding-right: 36px;
  }
  :global(.dropdown .frame .icon-down.icon-down) {
    position: absolute;
    top: 50%;
    right: 8px;
    transform: translate(0, -50%);
  }
  .default {
    color: hsl(var(--gray));
  }
</style>
