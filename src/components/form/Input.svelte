<script>
  export let inputRef = undefined;
  export let value;
  export let placeholder;
  export let blur;

  let {
    placeholder: _placeholder,
    value: _value,
    inputRef: _inputRef,
    small,
    class: _class,
    ...props
  } = $$props;

  $: blur && inputRef && inputRef === document.activeElement && ((value = ''), inputRef.blur());
</script>

<div
  class={tw(
    'input relative inline-block border-none bg-none outline-none text-gray-800 dark:text-white',
    _class
  )}
  class:active={value}
  class:small
>
  <input
    class="p-2 rounded bg-white dark:bg-black w-full"
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
    <div
      class="placeholder absolute transition-[bottom,left] bottom-1/2 left-2 rounded translate-y-1/2 pointer-events-none px-1.5 pt-px text-gray-600 dark:text-gray-400 bg-white dark:bg-black"
    >
      {placeholder}
    </div>
  {/if}
</div>

<style>
  input:focus + .placeholder,
  .input.active .placeholder {
    bottom: calc(100% + 6px);
    left: 0px;
  }
</style>
