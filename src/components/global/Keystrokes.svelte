<script lang="ts">
  import AVAILABLE_KEYS from '@/constants/AVAILABLE_KEYS';
  import type { DynamicObject } from '@/types/common';
  import { untrack } from 'svelte';

  let localKeys: DynamicObject = $state({ ...AVAILABLE_KEYS });

  const toggleKey = (c: KeyboardEvent) => {
    if (!(c instanceof KeyboardEvent)) return; // Password auto-filler fires `Event` which is missing `code` for example

    const { type, code, metaKey, ctrlKey } = c;
    const lcKey = code.toLowerCase();
    if (app.keys[lcKey] && type === 'keydown') return;

    if (metaKey || ctrlKey) {
      localKeys = { ...AVAILABLE_KEYS };
      return;
    }

    if (app.gameKeyboardDisabled && !['enter', 'escape', 'shiftleft', 'shiftright'].includes(lcKey))
      return;

    if (lcKey in localKeys) localKeys[lcKey] = type === 'keydown';
  };

  $effect(() => {
    $state.snapshot(localKeys); //

    untrack(() => {
      app.keys = { ...localKeys };
    });
  });
</script>

<svelte:window onkeydown={toggleKey} onkeyup={toggleKey} />

<!-- <div class="fixed right-0 bottom-0 bg-white p-8 text-xs text-gray-800">
  <pre>{JSON.stringify(app.keys, null, 2)}</pre>
</div> -->
