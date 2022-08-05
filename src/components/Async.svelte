<script>
	$: ({ component, ...props } = $$restProps);
	$: [making, vite, happy] = component.replace('./', '').replace('.svelte', '').split('/');
</script>

{#await happy ? import(`./${making}/${vite}/${happy}.svelte`) : import(`./${making}/${vite}.svelte`) then { default: component }}
	<svelte:component this={component} {...props} on:click />
{:catch}
	<Crow>
		<div class="load-error">
			Error loading.<br />Restart your game to fix it.
			<span>
				(We're aware of this issue and hope for<br />a fix in the future. It's framework related.)
			</span>
			🤷‍♂️
		</div>
	</Crow>
{/await}

<style>
	.load-error {
		display: grid;
		place-items: center;
		background: #000;
		padding: 8px;
		font-size: 18px;
		line-height: 22px;
		color: yellow;
		text-align: center;
	}
	span {
		margin-top: 8px;
		font-size: 14px;
		line-height: 16px;
		color: gray;
	}
</style>
