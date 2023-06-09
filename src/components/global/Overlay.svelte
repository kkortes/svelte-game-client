<script>
  import { recursiveLookup, camelCaseToDashed } from '$src/helpers';

  const { overlay, keys, mqs } = STORES;
  const { setOverlay } = ACTIONS;
  const close = ({ target }) => recursiveLookup(target, ['close']) && setOverlay('');
  const closeSelf = ({ target }) => target.classList.contains('overlay') && setOverlay('');

  $: ({ classes } = $mqs);
  $: ({ escape } = $keys); // This is != $keys.escape on next row (due to how Svelte dirty checks)
  $: escape && setOverlay($overlay ? '' : 'GameMenu');
</script>

<button on:click={closeSelf} class="overlay {classes} strip-defaults" class:show={$overlay}>
  <div />
  <div class="content {camelCaseToDashed($overlay)}">
    {#if $overlay}
      <Async component={`./overlays/${$overlay}.svelte`} on:click={close} />
    {/if}
  </div>
  <div />
</button>

<style>
  .overlay {
    position: fixed;
    inset: 0 0 auto 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    overflow-y: auto;
    overflow-x: hidden;
    opacity: 0;
    display: grid;
    grid-template-rows: 75px 1fr 75px;
    place-items: center;
    opacity: 0;
    transition-property: opacity, transform;
    transition-duration: 0ms;
    pointer-events: none;
    transform: translateY(10px);
  }
  .smartphone {
    grid-template-rows: 10px 1fr 10px;
  }
  .content {
    position: relative;
    margin: 0 auto;
    padding-bottom: 50px;
    max-width: calc(100% - 100px);
    min-width: 700px;
  }
  .smartphone .content {
    min-width: calc(100% - 20px);
  }
  .content.game-menu {
    min-width: 300px;
  }
  :global(.overlay > .content > div) {
    max-width: 765px;
  }
  .show {
    opacity: 1;
    pointer-events: auto;
    transition-duration: 250ms;
    transition-delay: 20ms;
    transform: translateY(0);
  }
</style>
