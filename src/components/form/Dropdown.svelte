<script lang="ts">
  import { emptySlot } from '@/helpers';
  import type { ChangeEvent } from '@/types/common';

  type Option =
    | {
        name?: string;
        icon: string;
      }
    | string;

  let {
    value = 'Choose one',
    options = [],
    onchange
  }: { value?: string; options: Option[]; onchange?: (e: Event) => void } = $props();
</script>

<div class="relative rounded-sm border border-gray-200">
  <select class="absolute inset-0 h-full w-full opacity-0" bind:value {onchange}>
    <optgroup label="Choose one">
      {#each options as option, i}
        {#if typeof option === 'string'}
          <option value={option}>{option}</option>
        {:else}
          <option value={i}>{option?.name}</option>
        {/if}
      {/each}
    </optgroup>
  </select>
  <Frame class="dark:bg-black">
    <crow class="!justify-between">
      {#if options.find(emptySlot)}
        <span class="first-letter:uppercase" class:default={value === 'Choose one'}>{value}</span>
      {:else}
        {value || 'N/A'}
      {/if}
      <Icon class="text-gray-800 dark:text-white" name="down" />
    </crow>
  </Frame>
</div>
