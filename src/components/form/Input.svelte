<script>
	export let inputRef;
	export let value;
	export let hide;
	export let placeholder;

	let {
		placeholder: _placeholder,
		value: _value,
		inputRef: _inputRef,
		hide: _hide,
		small,
		center,
		...props
	} = $$props;

	$: hide && inputRef && inputRef.blur();
</script>

<div class="input" class:active={value} class:small class:center class:hide>
	<Frame thin>
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
	.hide {
		display: none !important;
		pointer-events: none;
	}
	.input {
		position: relative;
		display: inline-block;
		border: 0;
	}
	.center input {
		text-align: center;
	}
	input:focus + .placeholder,
	.input.active .placeholder {
		bottom: calc(100% + 10px);
		color: #fff;
		font-size: 14px;
		left: 0;
	}
	.placeholder {
		position: absolute;
		bottom: 50%;
		left: 4px;
		transform: translateY(50%);
		pointer-events: none;
		border-radius: 2px;
		padding: 0 4px;
		color: gray;
	}
	.input .placeholder {
		transition: bottom 150ms ease, color 150ms ease, font-size 150ms ease, left 150ms ease;
	}
	input {
		border: none;
		background: none;
		outline: 0;
		font-size: 16px;
		line-height: 20px;
		color: #fff;
	}
</style>
