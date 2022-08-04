<script>
	import { getCookie } from '$src/helpers';

	const { socket, token } = STORES;

	let connected = false,
		authorized = false;

	$: !connected && $socket && (connected = true);

	onMount(() => ($token = getCookie()?.token));

	$: $token,
		connected &&
			(async () => {
				authorized = await $socket.asyncEmit('user/authenticate', { token: $token });
			})();
</script>

{#if !connected}
	<Loader>Connecting to server</Loader>
{:else if authorized}
	<Authorized />
{:else if !$token}
	<Unauthorized />
{/if}
