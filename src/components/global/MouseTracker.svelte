<script>
  const freezers = [''];

  const { tooltip } = STORES;

  let x = 0,
    y = 0,
    left = 0,
    top = 0,
    parent;

  const trackCursor = ({ clientX, clientY }) => {
    parent = parent;

    x = clientX;
    y = clientY;

    if (!freeze) {
      left = x;
      top = y;
    }
  };

  $: ({ direction, visible, tip, props } = $tooltip);

  $: freeze = freezers.includes(tip);
  $: offsetTop = freeze ? 0 : direction === 'up' ? -30 : direction === 'down' ? 30 : 0;
  $: offsetLeft = freeze ? 0 : direction === 'left' ? -30 : direction === 'right' ? 30 : 0;
</script>

<div
  bind:this={parent}
  style={`left: calc(${left}px + ${offsetLeft}px); top: calc(${top}px + ${offsetTop}px);`}
  class:visible
  class:freeze
  class="fixed top-1/2 left-1/2 w-0 h-0"
>
  <Tooltip {parent} {direction}>
    {#if tip}
      <Async component={`./tooltips/${tip}.svelte`} {props} />
    {/if}
  </Tooltip>
</div>

<svelte:window on:mousemove={trackCursor} />

<style>
  :global(.visible .tooltip.tooltip) {
    opacity: 1;
  }
  :global(.freeze .tooltip.tooltip) {
    pointer-events: auto;
  }
</style>
