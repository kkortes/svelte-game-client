<script>
	const { socket } = STORES;

	const ping = async () => $socket.asyncEmit('pong');
</script>

<button on:click={ping}>Ping</button>
