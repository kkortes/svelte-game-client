<script>
	import { fly } from 'svelte/transition';

	const { notifications } = STORES;
	const { removeFirstNotification } = ACTIONS;

	let ref;
	let animation = {};
	let animating = false;
	let freeze = false;

	const reset = () => ((animating = false), removeFirstNotification());

	const removeFirst = (items) => {
		if (items.length && !animating) {
			animation = ref.animate(
				{
					transform: 'translateY(-44px)'
				},
				{
					delay: 3000,
					duration: 600,
					easing: 'ease'
				}
			);
			requestAnimationFrame(() => (animating = true));

			animation.onfinish = reset;
		}
	};

	$: ref && removeFirst([...$notifications]);

	const hover = (enter) => ((freeze = enter), animation[enter ? 'pause' : 'play']());
</script>

<div
	class="notifications"
	class:animating
	class:freeze
	bind:this={ref}
	on:mouseenter={hover.bind(undefined, true)}
	on:mouseleave={hover.bind(undefined, false)}
>
	<Crow vertical gutter={4} right>
		{#each [...$notifications] as notification (notification)}
			{@const { type, message } = JSON.parse(notification)}
			<div>
				<div in:fly={{ x: 50 }}>
					<div class={`notification ${type}`}>
						{message}
					</div>
				</div>
			</div>
		{/each}
	</Crow>
</div>

<style>
	:global(.notifications.animating .crow > div:first-child) {
		transition: opacity 400ms ease 3000ms;
		opacity: 0;
	}
	:global(.notifications.freeze .crow > div:first-child) {
		transition: opacity 150ms ease;
		opacity: 1;
	}
	.notifications {
		position: fixed;
		top: 8px;
		right: 0px;
		color: hsl(var(--gray));
	}
	.notification {
		background-color: #fff;
		padding: 8px;
		border-right: 7px solid #fff;
		font-size: 18px;
	}
	.notification:first-letter {
		text-transform: uppercase;
	}
	.error {
		border-color: hsl(var(--red));
	}
	.warning {
		border-color: hsl(var(--orange));
	}
	.success {
		border-color: hsl(var(--green));
	}
	.information {
		border-color: hsl(var(--blue));
	}
</style>
