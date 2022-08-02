<script>
	const { isDev } = ENV;
</script>

<ConnectSocket />

<Crow left up gutter={12}>
	{#if isDev}
		<Sidebar />
	{/if}
	<slot />
</Crow>
