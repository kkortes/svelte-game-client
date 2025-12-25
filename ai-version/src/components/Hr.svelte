<script lang="ts">
  let {
    left,
    right,
    class: classes
  }: { left?: boolean; right?: boolean; class?: string } = $props();
</script>

<hr
  class={tw(
    'mt-1 mb-2 h-px w-full border-0 bg-gradient-to-r',
    !left && 'from-transparent via-gray-800/40 to-transparent',
    left && 'from-gray-800/40 to-transparent',
    right && 'from-transparent to-gray-800/40',
    classes
  )}
/>
