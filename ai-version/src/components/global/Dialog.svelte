<script lang="ts">
  import type { Component as SvelteComponent, ComponentProps } from 'svelte';

  let {
    Component,
    props
  }: { Component?: SvelteComponent; props?: ComponentProps<SvelteComponent> } = $props();

  const close = () => {
    // Let app render next animation frame before closing
    // This prevents mouseenter for things like tooltips
    requestAnimationFrame(() => {
      app.dialog = undefined;
    });
  };
</script>

<div
  class={tw(
    'xs:grid-rows-[theme(spacing.8)_1fr_theme(spacing.8)] dialog pointer-events-none fixed inset-0 grid h-full scale-95 grid-rows-[theme(spacing.20)_1fr_theme(spacing.20)] place-items-center overflow-x-hidden overflow-y-auto border-0 bg-black/10 opacity-0 shadow-[inset_0_0px_10vw_rgba(0,0,0,0.5)] backdrop-blur-[1px] transition-[opacity,transform] duration-0 outline-none',
    Component && 'pointer-events-auto scale-100 opacity-100 delay-75 duration-200'
  )}
>
  <div></div>
  <div
    class="xs:min-w-[calc(100%-theme(spacing.20))] xs:max-w-[calc(100%-theme(spacing.8))] relative w-[20rem] max-w-[calc(100%-theme(spacing.24))] text-left"
  >
    {#if Component}
      <Component {...props} {close} />
    {/if}
  </div>
  <div></div>
</div>
