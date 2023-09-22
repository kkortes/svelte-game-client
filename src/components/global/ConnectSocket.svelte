<script>
  import aaw from 'async-await-websockets';
  import { browser } from '$app/environment';

  const { WEBSOCKET_CONNECT } = ENV;
  const { socket } = STORES;
  const { notify } = ACTIONS;

  onMount(() => {
    if (browser && !window.ws) {
      window.ws = aaw(WEBSOCKET_CONNECT);
      ws.on('broadcast', console.info);
      ws.on('open', () => ($socket = ws), notify({ success: 'Connected to game server' }));
      ws.on('close', () => notify({ error: `Can't connect to game server` }));
    }
  });
</script>
