<script lang="ts">
  let props = $props();
  let {
    children,
    class: classes,
    current,
    max,
    text = '',
    isTime = false,
    isLoading = false,
    center = false,
    percentage = false,
    left = false
  } = $derived(props);

  //  let minutes = $derived(Math.floor(timeToRefill / 60000));
  // let seconds = $derived(Math.floor((timeToRefill % 60000) / 1000));
  // let timeToRefillFormatted = $derived(
  //   `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  // );
</script>

<div
  class={tw(
    'relative grid h-7 w-full bg-gray-500/50 text-white inset-shadow-sm',
    center && 'h-6 overflow-hidden rounded-sm'
  )}
>
  <div
    class={tw(
      'h-full bg-red-800 transition-all duration-200 ease-in-out [grid-area:1/1]',
      isTime && 'duration-250 ease-linear',
      classes
    )}
    style="width: {Math.max(0, (current / max) * 100)}%"
  ></div>

  <crow class={tw('px-2 text-sm [grid-area:1/1] text-shadow-xs', center ? '' : '!justify-between')}>
    {#if isLoading}
      <Spinner class="text-sm" />
    {:else if isTime}
      {@const minutes = Math.floor((max - current) / 60000)}
      {@const seconds = Math.floor(((max - current) % 60000) / 1000) + 1}
      {@const timeToRefillFormatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
      <crow class="w-10">
        {timeToRefillFormatted}
      </crow>
    {:else}
      <div class={tw(left && '')}>
        {#if text}
          {text}
        {/if}
      </div>
      {#if percentage}
        {Math.max(0, (current / max) * 100).toFixed(0)}%
      {:else}
        {current} / {max}
      {/if}
    {/if}
  </crow>

  {#if children}
    {@render children()}
  {/if}
</div>
