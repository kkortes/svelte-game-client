<script>
  $: ({ component, ...props } = $$restProps);
  $: [making, vite, happy] = component.replace('./', '').replace('.svelte', '').split('/');
</script>

{#await happy ? import(`./${making}/${vite}/${happy}.svelte`) : import(`./${making}/${vite}.svelte`) then { default: component }}
  <svelte:component this={component} {...props} on:click />
{:catch}
  <div class="cy bg-black p-4 text-yellow-500 text-center">
    Error loading.<br />Restart your game to fix it.
    <span class="text-gray-500 text-sm mt-2">
      (We're aware of this issue and hope for<br />a fix in the future. It's framework related.)
    </span>
    🤷‍♂️
  </div>
{/await}
