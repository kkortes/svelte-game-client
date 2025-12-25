<script lang="ts">
  let { onclick, component, ...props }: any = $props();

  let [making, vite, happy] = $derived(
    component.replace('./', '').replace('.svelte', '').split('/')
  );
</script>

{#await happy ? import(`./${making}/${vite}/${happy}.svelte`) : import(`./${making}/${vite}.svelte`) then { default: component }}
  <svelte:component this={component} {...props} {onclick} />
{:catch}
  <crow vertical class="bg-black p-4 text-center text-yellow-500">
    Error loading.<br />Restart your game to fix it.
    <span class="mt-2 text-sm text-gray-500">
      (We're aware of this issue and hope for<br />a fix in the future. It's framework related.)
    </span>
    🤷‍♂️
  </crow>
{/await}
