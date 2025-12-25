<script lang="ts">
  import type { Snippet } from 'svelte';
  import { twMerge } from 'tailwind-merge';

  type Props = {
    isOpen?: boolean;
    children: Snippet;
  };
  let { isOpen = false, children }: Props = $props();
</script>

<div
  class={twMerge(
    'grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-out',
    isOpen && 'grid-rows-[1fr]'
  )}
>
  <div class="overflow-hidden">
    {@render children()}
  </div>
</div>
