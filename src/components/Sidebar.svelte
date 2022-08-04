<script>
	const links = [
		{
			url: '1',
			text: '1'
		},
		{
			url: '2',
			text: '2'
		}
	];
</script>

<div class="sidebar">
	<Crow vertical up gutter={8}>
		{#each links as { url, text }}
			<div on:click={() => console.log(url)}>
				<Icon name="crow" />
				{text}
			</div>
		{/each}
	</Crow>
</div>

<style>
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		background-color: hsl(var(--bg-color-form));
		height: 100%;
		width: 50px;
	}
</style>
