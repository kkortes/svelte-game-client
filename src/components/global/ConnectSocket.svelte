<script lang="ts">
  import type { AsyncAwaitWebsocket } from 'async-await-websockets';
  import aaw from 'async-await-websockets/client';
  import { browser } from '$app/environment';
  import { notify } from '@/ts/actions';

  const { WEBSOCKET_CONNECT } = ENV;

  $effect(() => {
    if (browser && !app.socket) {
      const ws = aaw(WEBSOCKET_CONNECT) as AsyncAwaitWebsocket;
      ws.on('broadcast', console.info);
      ws.on('open', () => {
        app.socket = ws;
        notify({ success: 'Connected to game server' });
      });
      ws.on('close', () => {
        notify({ error: `Can't connect to game server` });
      });
    }
  });
</script>
