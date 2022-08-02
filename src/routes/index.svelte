<script>
	const { socket } = STORES;

	let connected = false;

	$: !connected && $socket && (connected = true);
</script>

{#if connected}
	<Unauthorized />
{:else}
	<Loader>Connecting to server</Loader>
{/if}
