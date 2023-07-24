<script>
  import { recursiveLookup, camelCaseToDashed } from '$src/helpers';

  const { overlay, keys } = STORES;
  const { setOverlay } = ACTIONS;
  const close = ({ target }) => recursiveLookup(target, ['close']) && setOverlay('');
  const closeSelf = ({ target }) => target.classList.contains('overlay') && setOverlay('');

  $: ({ escape } = $keys);
  $: escape && setOverlay($overlay ? '' : 'GameMenu');
  $: isGameMenu = camelCaseToDashed($overlay) === 'game-menu';
</script>

<button
  on:click={closeSelf}
  class={tw(
    'xs:grid-rows-[theme(spacing.8)_1fr_theme(spacing.8)] fixed grid duration-0 overflow-y-auto overflow-x-hidden transition-[opacity,transform] scale-95 pointer-events-none place-items-center opacity-0 grid-rows-[theme(spacing.20)_1fr_theme(spacing.20)] h-full bg-black/80 inset-[0_0_auto_0] overlay border-0 outline-none',
    $overlay && 'opacity-1 pointer-events-auto duration-200 delay-75 scale-100'
  )}
>
  <div />
  <div
    class={tw(
      'relative text-left min-w-[43.75rem] xs:min-w-[calc(100%-theme(spacing.20))] max-w-[calc(100%-theme(spacing.24))] xs:max-w-[calc(100%-theme(spacing.8))]',
      isGameMenu && 'min-w-[theme(spacing.80)]'
    )}
  >
    {#if $overlay}
      <Async component={`./overlays/${$overlay}.svelte`} on:click={close} />
    {/if}
  </div>
  <div />
</button>
