<script>
	const { socket } = STORES;

	const ping = async () => {
		const result = await $socket.asyncEmit('ping');
		alert(result);
	};
</script>

<button on:click={ping}>Pingy</button>
