<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    text,
    right,
    children,
    small = false,
    class: classes
  }: {
    text: string;
    right?: boolean;
    children?: Snippet;
    small?: boolean;
    class?: string;
  } = $props();
</script>

<crow class={tw('!justify-between gap-4', right ? 'right' : 'left', classes)}>
  {#if small}
    <h5>{text}</h5>
  {:else}
    <h3>{text}</h3>
  {/if}
  {#if children}
    {@render children()}
  {/if}
</crow>

<Hr class={tw('mt-2 mb-4', small && 'mt-1 mb-3')} left={!right} {right} />
