<script>
	import aaw from 'async-await-websockets';
	import { browser } from '$app/env';

	const { WEBSOCKET_CONNECT } = ENV;
	const { socket } = STORES;
	const { notify } = ACTIONS;

	onMount(() => {
		if (browser && !window.socket) {
			window.socket = aaw(WEBSOCKET_CONNECT);
			window.socket.on('connect', () => ($socket = window.socket));
			window.socket.on('connect_error', () =>
				notify({ error: 'Game server unreachable, trying again soon' })
			);
		}
	});
</script>
