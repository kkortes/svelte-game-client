<script lang="ts">
  let { class: classes }: { class?: string } = $props();
</script>

<div class={tw('grid items-center text-4xl text-white', classes)}>
  <Icon class="opacity-20 [grid-area:1/1] dark:text-gray-800" name="spinner-circle" />
  <Icon class="animate-spin [grid-area:1/1] dark:text-gray-800" name="spinner-inner" />
</div>
