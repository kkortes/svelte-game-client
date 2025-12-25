<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    class: classes,
    title
  }: { children?: Snippet; class?: string; title?: string } = $props();
</script>

<div class="frame text-gray-200">
  {#if title}
    <crow left class="title cinzel text-gray-400">{title}</crow>
  {/if}
  <crow class={tw('vertical text-md gap-2 p-4 text-gray-400', classes)}>
    {@render children?.()}
  </crow>
</div>

<style>
  .frame {
    border-top: 3px solid;
    border-right: 3px solid;
    border-bottom: 3px solid;
    border-left: 3px solid;
    border-image-slice: 3 3 3 3;
    border-image-source: url(/images/ui/frame.png);
    border-image-repeat: repeat;
    background: rgba(0, 0, 0, 0.75);
    box-shadow: rgb(0 0 0 / 80%) 0px 0px 100px inset;
  }
  .title {
    position: relative;
    margin: -3px 0 0 0;
    padding: 0 8px;
    height: 33px;
    background-image: url(/images/ui/frame-header.jpg);
    background-position: left 2px;
    background-repeat: repeat-x;
  }
</style>
