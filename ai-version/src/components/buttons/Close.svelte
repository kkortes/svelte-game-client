<script lang="ts">
  let { onclick, class: classes }: any = $props();
</script>

<button
  {onclick}
  class={tw('close crow absolute top-1 right-1 h-6 w-6 bg-black active:translate-y-px', classes)}
>
  <Icon name="cross" class="text-red-600" />
</button>
