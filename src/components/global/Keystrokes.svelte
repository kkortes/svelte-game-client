<script>
  import AVAILABLE_KEYS from '$src/constants/AVAILABLE_KEYS';

  const { keys, keyLock } = STORES;

  let localKeys = { ...AVAILABLE_KEYS };

  const toggleKey = (c) => {
    if (!(c instanceof KeyboardEvent)) return; // Password auto-filler fires `Event` which is missing `code` for example
    const { type, code, metaKey, ctrlKey } = c;
    const lcKey = code.toLowerCase();
    if ($keys[lcKey] && type === 'keydown') return;

    if (metaKey || ctrlKey) {
      localKeys = { ...AVAILABLE_KEYS };
      return;
    }

    if ($keyLock && !['enter', 'escape', 'shiftleft', 'shiftright'].includes(lcKey)) return;

    if (lcKey in localKeys) localKeys[lcKey] = type === 'keydown';
  };

  $: $keys = localKeys;
</script>

<svelte:window on:keydown={toggleKey} on:keyup={toggleKey} />

<!-- <div class="keys">
	<pre>{JSON.stringify($keys, null, 2)}</pre>
</div>

<style>
	.keys {
		position: fixed;
		bottom: 0;
		right: 0;
		background: #fff;
		color: #000;
		padding: 10px;
		text-align: left;
	}
</style> -->
