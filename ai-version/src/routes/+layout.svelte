<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';

  let { children } = $props();

  const { IS_PROD } = ENV;

  $effect(() => {
    app.settings.lockSidebar = activePage;
  });

  let activePage = $derived($page.route.id?.split('/')[1] || (!app.token ? 'start' : ''));
</script>

<svelte:head>
  <link rel="icon" href="/static/icons/storm.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&family=Averia+Serif+Libre:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Belanosima:wght@400;600;700&family=Berkshire+Swash&family=Cabin:ital,wght@0,400..700;1,400..700&family=Cinzel:wght@400..900&family=Finlandica:ital,wght@0,400..700;1,400..700&family=Geist:wght@100..900&family=Merienda:wght@300..900&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Skranji:wght@400;700&family=Spectral+SC:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Stoke:wght@300;400&family=Viga&display=swap"
    rel="stylesheet"
  />
  <title>Svelte game client</title>
</svelte:head>

<ClientClock />
<ConnectSocket />
<Keystrokes />
<GameAudio />

{#if !IS_PROD}
  <!-- <DevBar /> -->
  <DebugAppData />
{/if}

<crow data-page-id={activePage} class="w-full">
  <Authorization>
    <crow class="h-full w-full pt-4">
      <Sidebar />
      <card
        class="relative min-h-full! flex-1 rounded-xl rounded-tr-none rounded-br-none rounded-bl-none border-b-0 border-r-transparent"
      >
        <!-- this is solely to make sticky work -->
        <crow up left vertical class="flex-1 py-4">
          {@render children()}
        </crow>

        <div
          class="sticky bottom-[calc(theme(spacing.0))] w-[calc(100%+theme(spacing.4))] -left-2 -right-2 w-full"
        >
          <div id="sticky-bottom" class="overflow-hidden bg-white/20"></div>
        </div>

        <Topbar />
      </card>
      <div class={tw('sticky top-14 w-0 overflow-hidden bg-white/30')}>asd</div>
    </crow>
  </Authorization>
</crow>

<Overlay />

<Dialog {...app.dialog} />

{#if app.tooltip}
  <Tooltip {...app.tooltip} />
{/if}
<Notifications />

<style lang="postcss">
  :global {
    :root {
      body {
        /* background: linear-gradient(to bottom right, var(--color-white), var(--color-gray-400)); */

        &.dark {
          /* background: linear-gradient(
            to bottom right,
            var(--color-slate-900),
            var(--color-gray-900)
          ); */
        }
      }
    }
  }
</style>
