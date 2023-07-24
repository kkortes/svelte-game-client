<script>
  let show = false;

  onMount(() => {
    show = true;
  });

  const fade = (_node, { duration, delay }) => ({
    duration,
    delay,
    css: (t) => `opacity: ${t};`
  });
</script>

{#if show}
  <div class="cy fixed bg-black/25 inset-0" in:fade={{ duration: 250, delay: 500 }}>
    <div
      class="
        cy gap-4 py-6 text-white dark:text-gray-800 relative bg-black/70 dark:bg-white/70 w-full
        before:absolute before:content-[''] before:bg-black/50 dark:before:bg-white/50 before:left-0 before:right-0 before:h-1 before:bottom-[calc(100%+theme(space.1))]
        after:absolute after:content-[''] after:bg-black/50 dark:after:bg-white/50 after:left-0 after:right-0 after:h-1 after:top-[calc(100%+theme(space.1))]
      "
    >
      <h1>
        <slot />
      </h1>
      <div class="relative leading-[0]">
        <Icon class="text-4xl text-white/20 dark:text-gray-800/20" name="spinner-circle" />
        <Icon
          class="text-4xl text-white dark:text-gray-800 absolute inset-0 animate-spin"
          name="spinner-inner"
        />
      </div>
    </div>
  </div>
{/if}
