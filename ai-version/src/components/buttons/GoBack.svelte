<script lang="ts">
  let { onclick, class: classes }: any = $props();
</script>

<div class="absolute -top-7 -left-5.5 text-xs">
  <Button tertiary secondary {onclick}>
    <span>‹</span> Back
  </Button>
</div>
