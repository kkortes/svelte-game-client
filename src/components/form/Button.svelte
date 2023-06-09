<script>
  export let primary = true;
  export let secondary = false;
  export let tertiary = false;
  export let blur = false;

  let inputRef;

  $: blur && inputRef && inputRef === document.activeElement && inputRef.blur();
</script>

<button
  on:click
  bind:this={inputRef}
  class={tw(
    'rounded leading-1 font-bold px-3 py-2 active:translate-y-px',
    primary && 'bg-blue-500 text-white',
    secondary && 'bg-blue-200 text-blue-500',
    tertiary && 'text-blue-500 underline bg-transparent hover:no-underline',
    $$restProps.class
  )}
>
  <slot />
</button>
