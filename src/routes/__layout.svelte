<script>
	import '$src/store/settings';

	const { isDev } = ENV;
</script>

<ConnectSocket />
<Keystrokes />

{#if isDev}
	<Sidebar />
{/if}

<div class="content">
	<Crow>
		<slot />
	</Crow>
</div>

<Notifications />

<style>
	.content {
		padding: 75px 20px;
		width: 100%;
		height: 100%;
		max-width: 800px;
		margin: 0 auto;
	}
</style>
