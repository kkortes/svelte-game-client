<script>
	export let inputRef = undefined;
	export let value;
	export let placeholder;
	export let blur;

	let { placeholder: _placeholder, value: _value, inputRef: _inputRef, small, ...props } = $$props;

	$: blur && inputRef && inputRef === document.activeElement && ((value = ''), inputRef.blur());
</script>

<div class="input" class:active={value} class:small>
	<Frame>
		<input
			type="text"
			{...props}
			autocomplete="off"
			bind:this={inputRef}
			on:keyup
			on:focus
			on:blur
			bind:value
		/>

		{#if placeholder}
			<div class="placeholder">
				{placeholder}
			</div>
		{/if}
	</Frame>
</div>

<style>
	.input {
		position: relative;
		display: inline-block;
		border: 0;
	}
	input:focus + .placeholder,
	.input.active .placeholder {
		bottom: calc(100% + 6px);
		font-size: 14px;
		left: 0px;
		background-color: hsl(var(--bg-color-form));
	}
	.placeholder {
		position: absolute;
		bottom: 50%;
		left: 4px;
		transform: translateY(50%);
		pointer-events: none;
		padding: 2px 6px 0 6px;
		color: hsl(var(--gray));
	}
	.input .placeholder {
		transition: bottom 150ms ease, color 150ms ease, font-size 150ms ease, left 150ms ease,
			background-color 150ms ease;
	}
	input {
		border: none;
		background: none;
		outline: 0;
		font-size: 16px;
		line-height: 20px;
		color: #000;
	}
</style>
