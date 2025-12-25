<script lang="ts">
  let { value = $bindable(), ...rest } = $props();
</script>

<label>
  <input type="text" autocomplete="off" bind:value {...rest} />
</label>
