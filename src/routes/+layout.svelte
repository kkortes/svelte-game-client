<script lang="ts">
  import '../app.css';
  import '../crow.css';
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

<ClientClock />
<ConnectSocket />
<Keystrokes />
<GameAudio />

{#if !IS_PROD}
  <DevBar />
  <DebugAppData />
{/if}

<div
  data-page-id={activePage}
  class={tw('bg-blur min-h-screen w-screen', isFrontpage ? 'crow' : 'crow up')}
>
  <div
    class={tw(
      'xs:w-[calc(100%-theme(space.4))] pt-20 pb-3',
      !isAuthenticated ? 'crow !flex-none' : 'flex w-full max-w-7xl'
    )}
  >
    <Authorization>
      <div class="flex min-h-[calc(100vh-theme(spacing.20)-theme(spacing.3))] flex-1 gap-3">
        <div
          class={tw(
            'sticky top-3 h-[calc(100vh-theme(spacing.6))] w-56 rounded border border-transparent bg-white/30 p-4',
            !IS_PROD && 'top-48'
          )}
        >
          left side
        </div>
        <crow vertical class="h-full flex-1">
          <div class="grid h-full w-full">
            <crow
              left
              up
              vertical
              class={tw(
                'relative !h-auto rounded border border-transparent bg-white p-4 [grid-area:1/1]'
              )}
            >
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
            </crow>

            <crow up class="-mt-7 !h-7 !flex-none !justify-between px-1 [grid-area:1/1]">
              <crow up right class="gap-1">
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === '' && 'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/"
                >
                  Game Guide
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'components' &&
                      'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/components"
                >
                  Components
                </a>
                <a
                  class={tw(
                    'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
                    activePage === 'crow' && 'rounded-t-sm border-transparent bg-white text-black'
                  )}
                  href="/crow"
                >
                  Crow
                </a>
              </crow>
            </crow>
          </div>
        </crow>
        <div
          class={tw(
            'pointer-events-none sticky top-3 h-[calc(100vh-theme(spacing.6))] w-56 rounded border border-transparent bg-white/30 p-4 opacity-100'
          )}
        >
          right side
        </div>
      </div>
    </Authorization>
  </div>
</div>

<Topbar />
<Logo />
<Overlay />

<Dialog {...app.dialog} />

{#if app.tooltip}
  <Tooltip {...app.tooltip} />
{/if}
<Notifications />

<style>
  :global {
    :root body {
      background-image: url('/images/parchment-bg-2250x1500.jpg');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
    :root:has([data-page-id='start']) body {
      background-image: url('/images/parchment-bg-2250x1500.jpg');
    }
  }
</style>
