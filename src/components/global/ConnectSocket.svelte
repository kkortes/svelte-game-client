<script>
  import aaw from 'async-await-websockets';
  import { browser } from '$app/environment';

  const { WEBSOCKET_CONNECT } = ENV;
  const { socket } = STORES;
  const { notify } = ACTIONS;

  let connections = 0;

  onMount(() => {
    if (browser && !window.socket) {
      window.ws = aaw(WEBSOCKET_CONNECT);

      ws.on(
        'open',
        () => (
          ($socket = ws),
          connections && notify({ success: 'Connected to game server' }),
          (connections += 1)
        )
      );
      ws.on('close', () => notify({ error: `Can't connect to game server` }));
    }
  });
</script>
