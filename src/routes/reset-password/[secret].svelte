<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const { socket } = STORES;
	const { notify } = ACTIONS;

	let password = '';
	let error = undefined;

	const reset = async () => {
		try {
			await $socket.asyncEmit('user/password/set-new', {
				secret: $page.params.secret,
				password
			});

			await goto('/', { replaceState: true });
			notify({ success: 'your new password was set' });
		} catch (error) {
			notify(error);
		}
	};
	$: $socket &&
		(async () => {
			try {
				await $socket.asyncEmit('user/password/reset-eligibility', {
					secret: $page.params.secret
				});
				error = false;
			} catch (e) {
				error = e.error;
			}
		})();
</script>

<h2>Password reset</h2>

{#if error}
	<div>{error}<br /><br /><a href="/">Go to startpage</a></div>
{:else if error === false}
	<form on:submit|preventDefault={reset}>
		<Input type="password" bind:value={password} placeholder="Enter a new password" />
		<Button type="submit">Submit</Button>
	</form>
{/if}
