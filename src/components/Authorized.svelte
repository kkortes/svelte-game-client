<script>
	const { token } = STORES;
	const logout = () => {
		document.cookie = 'token= ; Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
		$token = undefined;
	};
</script>

<Button on:click={logout}>Log out</Button>
