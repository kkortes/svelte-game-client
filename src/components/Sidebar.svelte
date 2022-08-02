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
				{text}
			</div>
		{/each}
	</Crow>
</div>

<style>
	.sidebar {
		background: #fff;
		height: 100%;
		width: 50px;
	}
</style>
