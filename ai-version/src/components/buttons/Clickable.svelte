<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    class: classes,
    onclick,
    href,
    style,
    ...rest
  }: {
    class?: string;
    onclick?: (e: Event) => void;
    href?: string;
    children: Snippet;
    style?: string;
    [key: string]: any;
  } = $props();
</script>

{#if href}
  <a {href} {onclick} class={classes} {style} {...rest}>
    {@render children()}
  </a>
{:else}
  <button {onclick} class={classes} {style} {...rest}>
    {@render children()}
  </button>
{/if}
