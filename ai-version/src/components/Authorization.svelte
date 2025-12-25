<script lang="ts">
  import { getCookie } from '@/helpers';
  import type { Snippet } from 'svelte';
  import { version } from '../../package.json';
  import { notify } from '@/ts/actions';
  import { page } from '$app/state';

  const { IS_DEV } = ENV;

  let { children }: { children?: Snippet } = $props();

  onMount(() => (app.token = getCookie()?.token));

  let authorized: any = $state(false);
  let connected = $derived(app.socket);

  $effect(() => {
    if (app.token && connected) {
      (async () => {
        try {
          const response = await app.socket.sendAsync('user/authenticate', {
            token: app.token,
            clientVersion: version,
            IS_DEV
          });

          if (response?.gameState) {
            app.experience = response.gameState.experience;
          }

          if (response?.serverTimestampSnapshot) {
            app.serverTimestampSnapshot = response.serverTimestampSnapshot;
            // app.syncTimestampSnapshot = Date.now();
            authorized = true;
          }
        } catch (e) {
          notify(e);
          app.token = undefined;
        }
      })();
    } else {
      authorized = false;
    }
  });
</script>

<!-- remove page.route.id in the future -->
{#if !connected && page.route.id !== '/cards'}
  <Loader>Connecting to server</Loader>
{:else if authorized || page.route.id === '/cards'}
  {@render children?.()}
{:else if !app.token}
  <Unauthorized />
{/if}
