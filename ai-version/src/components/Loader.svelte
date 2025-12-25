<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children } = $props<{ children: Snippet }>();
  let show = $state(false);

  $effect(() => {
    show = true;
  });

  const fade = (_: any, { duration, delay }: any) => ({
    duration,
    delay,
    css: (t: number) => `opacity: ${t};`
  });
</script>

{#if show}
  <div class="crow vertical fixed inset-0 bg-black/25" in:fade={{ duration: 250, delay: 500 }}>
    <crow
      vertical
      class="
        relative w-full gap-4 bg-black/70 py-6 text-white before:absolute before:right-0
        before:bottom-[calc(100%+theme(space.1))] before:left-0 before:h-1 before:bg-black/50 before:content-[''] after:absolute after:top-[calc(100%+theme(space.1))] after:right-0
        after:left-0 after:h-1 after:bg-black/50 after:content-[''] dark:bg-white/70 dark:text-gray-800 dark:before:bg-white/50 dark:after:bg-white/50
      "
    >
      <h1>
        {@render children()}
      </h1>
      <Spinner />
    </crow>
  </div>
{/if}
