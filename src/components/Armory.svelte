<script lang="ts">
  import EQUIPMENT from '@/constants/EQUIPMENT';
  import { confirmWithDialog } from '@/ts/dialog';
  import { dismantle, equip } from '@/ts/equipment';
  import type { Equipment } from '@/types/equipment';
  import type { Component } from 'svelte';
  import BasicConfirmation from '@/components/dialog/BasicConfirmation.svelte';
  import { formatCoins } from '@/ts/coin';

  let { type } = $props();
  let items = $state(app.inventory);

  const dismantleItem = (item: Equipment) => {
    const { silver } = formatCoins(item.cost);
    const extraText =
      silver > 0
        ? `You will be refunded <span class="text-white">${silver} coin(s)</span> for this equipment.`
        : 'This equipment has no value.';
    confirmWithDialog(BasicConfirmation as any, {
      text: `${extraText}<br /><br /><span class="text-white">Are you sure?</span>`,
      confirm: () => {
        app.coins += item.cost;
        dismantle(item);
      }
    });
  };
</script>

<div class="my-3">
  <crow vertical up left>
    {#each items as item, i (item.uuid)}
      {@const equipment = EQUIPMENT(item, true)}
      <crow class="w-full !justify-between gap-2 py-1" left>
        <EquipmentLink {...equipment} />
        {#if type === 'equipment'}
          <Button tertiary onclick={() => equip(item)}>Equip</Button>
        {:else}
          <Button
            class="bg-red-400 text-white"
            tertiary
            onclick={dismantleItem.bind(undefined, equipment)}
          >
            {equipment.cost > 0 ? 'Refund' : 'Dismantle'}
          </Button>
        {/if}
      </crow>
    {/each}
  </crow>
</div>
