<script>
  export let primary = true;
  export let secondary = false;
  export let tertiary = false;
  export let blur = false;

  let inputRef;

  $: blur && inputRef && inputRef === document.activeElement && inputRef.blur();

  let { style, ...props } = $$restProps;
</script>

<button
  {...props}
  {style}
  on:click
  class:primary
  class:secondary
  class:tertiary
  bind:this={inputRef}
>
  <slot />
</button>

<style>
  button {
    border: 0;
    padding: 8px 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    border-radius: 3px;
  }
  button:hover {
    text-decoration: none;
    cursor: pointer;
  }
  button:active {
    transform: translateY(1px);
  }
  .primary {
    background: hsl(var(--blue));
    color: #fff;
  }
  .secondary {
    background: hsla(var(--blue), 0.15);
    color: hsl(var(--blue));
  }
  .tertiary {
    background: none;
    color: hsl(var(--blue));
    text-decoration: underline;
  }
</style>
