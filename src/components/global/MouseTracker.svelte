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
  class:visible
  class:freeze
  class="mouse-tracker"
  style={`left: calc(${left}px + ${offsetLeft}px); top: calc(${top}px + ${offsetTop}px);`}
  bind:this={parent}
>
  <Tooltip {parent} {direction}>
    {#if tip}
      <Async component={`./tooltips/${tip}.svelte`} {props} />
    {/if}
  </Tooltip>
</div>

<svelte:window on:mousemove={trackCursor} />

<style>
  .mouse-tracker {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
  }
  :global(.visible .tooltip.tooltip) {
    opacity: 1;
  }
  :global(.freeze .tooltip.tooltip) {
    pointer-events: auto;
  }
</style>
