<script>
	const { token, overlay } = STORES;
	const logout = () => {
		document.cookie = 'token= ; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
		$token = undefined;
		$overlay = '';
	};
</script>

<Button on:click={logout}>Log out</Button>
