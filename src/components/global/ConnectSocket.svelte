<script>
	import aaw from 'async-await-websockets';
	import { browser } from '$app/env';

	const { WEBSOCKET_CONNECT } = ENV;
	const { socket } = STORES;

	onMount(() => {
		if (browser && !window.socket) {
			window.socket = aaw(WEBSOCKET_CONNECT);
			window.socket.on('connect', () => {
				$socket = window.socket;
			});
			window.socket.on('connect_error', () => {
				console.log('couldnt connect');
			});
		}
	});
</script>
