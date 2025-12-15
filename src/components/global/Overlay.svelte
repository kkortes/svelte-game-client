<script lang="ts">
  import { recursiveLookup } from '@/helpers';
  import { untrack } from 'svelte';

  const close = ({ target }: any) => recursiveLookup(target, ['close']) && (app.overlay = '');
  const closeSelf = ({ target }: any) => target.classList.contains('overlay') && (app.overlay = '');

  $effect(() => {
    if (escape && !app.gameKeyboardDisabled) {
      untrack(() => {
        app.overlay ? (app.overlay = '') : (app.overlay = 'GameMenu');
      });
    }
  });

  let { escape } = $derived(app.keys);
  let isGameMenu = $derived(app.overlay === 'GameMenu');
  let isCombatLog = $derived(app.overlay === 'Combat');
</script>

<button
  onclick={closeSelf}
  class={tw(
    'xs:grid-rows-[theme(spacing.8)_1fr_theme(spacing.8)] overlay pointer-events-none fixed inset-[0_0_auto_0] z-20 grid h-full scale-95 grid-rows-[theme(spacing.20)_1fr_theme(spacing.20)] place-items-center overflow-x-hidden overflow-y-auto border-0 bg-black/20 opacity-0 shadow-[inset_0_0px_10vw_rgba(0,0,0,0.5)] backdrop-blur-[1px] transition-[opacity,transform] duration-0 outline-none',
    app.overlay && 'pointer-events-auto scale-100 opacity-100 delay-75 duration-200',
    isCombatLog &&
      "bg-[url('/images/arena.png')] bg-cover bg-center bg-no-repeat shadow-[inset_0_0px_10vw_rgba(0,0,0,1)]"
  )}
>
  <div></div>
  <div
    class={tw(
      'xs:min-w-[calc(100%-theme(spacing.20))] xs:max-w-[calc(100%-theme(spacing.8))] relative max-w-[calc(100%-theme(spacing.24))] min-w-[43.75rem] text-left',
      isGameMenu && 'min-w-[theme(spacing.80)]'
    )}
  >
    {#if app.overlay}
      <Async component={`./overlays/${app.overlay}.svelte`} onclick={close} />
    {/if}
  </div>
  <div></div>
</button>
