<script>
	const styles = (styles, style = '') => {
		const combined = ((styles, style) => ({
			style: `${Object.entries(styles)
				.reduce(
					(a, [property, value]) =>
						![false, undefined].includes(value) ? [...a, `${property}: ${value};`] : a,
					[]
				)
				.join(' ')}${style}`
		}))(styles, style);
		return combined?.style ? combined : {};
	};

	export let gutter = undefined;
	export let vertical = false;
	export let fly = false;
	export let up = false;
	export let right = false;
	export let left = false;
	export let down = false;
	export let fit = undefined;

	let { class: classes, style, ...props } = $$restProps;
</script>

<div
	{...props}
	class={['crow', classes].filter((v) => v).join(' ')}
	class:vertical
	class:horizontal={!vertical}
	class:fit
	class:fly
	class:up
	class:right
	class:down
	class:left
	{...styles(
		{
			gap: typeof gutter === 'number' && `${gutter * 2}px`,
			['--fit']: typeof fit !== 'undefined' && `calc(${typeof fit === 'number' ? `${fit}px` : fit})`
		},
		style
	)}
>
	<slot />
</div>

<style>
	.crow {
		display: grid;
		min-height: 100%;
		min-width: 100%;
		align-content: center;
		justify-content: center;
		align-items: center;
		justify-items: center;
	}
	.up {
		align-items: start;
		align-content: start;
	}
	.right {
		justify-content: end;
		justify-items: end;
	}
	.down {
		align-content: end;
		align-items: end;
	}
	.left {
		justify-content: start;
		justify-items: start;
	}
	.vertical:not(.fit) {
		grid-auto-flow: row;
		justify-content: stretch;
	}
	.horizontal:not(.fit) {
		grid-auto-flow: column;
		align-content: stretch;
	}
	.vertical.fit {
		grid-auto-flow: column;
		grid-template-rows: repeat(auto-fit, minmax(0, var(--fit, auto)));
	}
	.horizontal.fit {
		grid-auto-flow: row;
		grid-template-columns: repeat(auto-fit, minmax(0, var(--fit, auto)));
	}
	.vertical.fly {
		grid-template-rows: repeat(auto-fit, minmax(0, 1fr));
	}
	.horizontal.fly {
		grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
	}
</style>
