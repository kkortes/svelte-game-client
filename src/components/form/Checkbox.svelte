<script>
  export let id = '';
  export let value = false;
</script>

<label class="cx-left gap-2" for={id}>
  <input class="hidden" type="checkbox" {id} checked={value} on:change />
  <div class="rounded-sm cx w-5 h-5 bg-white dark:bg-black">
    <Icon class="text-green-500 hidden" name="check" />
  </div>
  <div class="overflow-hidden">
    <slot />
  </div>
</label>

<style>
  :global(input:checked + * > *) {
    display: flex;
  }
</style>
