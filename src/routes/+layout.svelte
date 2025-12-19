<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import type { Snippet } from 'svelte';
  import app from '@/app.svelte';
  import DebugAppData from '@/components/DebugAppData.svelte';

  let { children }: { children: Snippet } = $props();

  const { IS_PROD } = ENV;

  let isFrontpage = $derived($page.route.id === '/' && !app.token);
  let isAuthenticated = $derived(!!app.token);
  let activePage = $derived($page.route.id?.split('/')[1] || (!app.token ? 'start' : ''));
</script>

<svelte:head>
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

<crow vertical>
  <div
    data-page-id={activePage}
    class={tw('bg-blur min-h-screen w-screen', isFrontpage ? 'crow' : 'crow up')}
  >
    <div class={tw('pt-12 pb-3', !isAuthenticated ? 'crow' : 'flex w-full max-w-7xl')}>
      <Authorization>
        <div class="flex min-h-[calc(100vh-theme(spacing.20)-theme(spacing.3))] flex-1 gap-3">
          <div
            class={tw(
              'sticky top-14 h-[calc(100vh-theme(spacing.6))] w-56 rounded border border-transparent bg-white/30 p-4'
            )}
          >
            left side
          </div>
          <crow vertical class="h-full flex-1">
            <div class="grid h-full w-full">
              <card class="rounded [grid-area:1/1]">
                <div class="relative w-full flex-1">
                  <div>
                    {@render children()}
                  </div>
                </div>
                <div class="sticky bottom-[calc(theme(spacing.3))] left-0 w-full">
                  <div
                    id="sticky-bottom"
                    class="-m-[calc(theme(spacing.4)+1px)] overflow-hidden rounded-b"
                  ></div>
                </div>
              </card>

              <crow up class="-mt-7 !h-7 !justify-between px-3 [grid-area:1/1]">
                <crow up right class="gap-1">
                  <a
                    class={tw(
                      'text-muted-foreground rounded-lg rounded-b-none border border-b-0 border-transparent px-2 py-0.5',
                      activePage === '' && 'bg-card border-border text-foreground'
                    )}
                    href="/"
                  >
                    Game Guide
                  </a>
                  <a
                    class={tw(
                      'text-muted-foreground rounded-lg rounded-b-none border border-b-0 border-transparent px-2 py-0.5',
                      activePage === 'components' && 'bg-card border-border text-foreground'
                    )}
                    href="/components"
                  >
                    Components
                  </a>
                  <a
                    class={tw(
                      'text-muted-foreground rounded-lg rounded-b-none border border-b-0 border-transparent px-2 py-0.5',
                      activePage === 'cards' && 'bg-card border-border text-foreground'
                    )}
                    href="/cards"
                  >
                    Cards
                  </a>
                </crow>
              </crow>
            </div>
          </crow>
          <div
            class={tw(
              'sticky top-14 h-[calc(100vh-theme(spacing.6))] w-56 rounded border border-transparent bg-white/30 p-4'
            )}
          >
            right side
          </div>
        </div>
      </Authorization>
    </div>
  </div>

  <Topbar />
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
