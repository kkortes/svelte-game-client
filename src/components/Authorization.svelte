<script lang="ts">
  import { getCookie } from '@/helpers';
  import type { Snippet } from 'svelte';
  import { version } from '../../package.json';
  import { notify } from '@/ts/actions';

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
            app.characters = response.gameState.characters;
            app.inventory = response.gameState.inventory;
            app.experience = response.gameState.experience;
            app.coins = response.gameState.coins;
            app.accountRewards = response.gameState.accountRewards;
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

{#if !connected}
  <Loader>Connecting to server</Loader>
{:else if authorized}
  {@render children?.()}
{:else if !app.token}
  <Unauthorized />
{/if}
