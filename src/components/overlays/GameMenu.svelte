<script>
	const { token, overlay } = STORES;
</script>

<div class="game-menu">
	<Frame>
		<Crow vertical gutter={4}>
			<Button secondary on:click={() => ($overlay = 'ReleaseNotes')}>Release notes</Button>
			{#if $token}
				<Logout />
			{/if}
		</Crow>
	</Frame>
	<div class="close">
		<Close on:click />
	</div>
</div>

<style>
	.close {
		position: absolute;
		top: 2px;
		right: 2px;
	}
</style>
