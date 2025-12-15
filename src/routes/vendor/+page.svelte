<script lang="ts">
  import EQUIPMENT, { ALL_EQUIPMENT } from '@/constants/EQUIPMENT';
  import type { Equipment } from '@/types/equipment';
  import { slotsInPrettyName } from '@/ts/equipment';
  import { confirmWithDialog } from '@/ts/dialog';
  import { formatCoins } from '@/ts/coin';
  import BasicConfirmation from '@/components/dialog/BasicConfirmation.svelte';

  let allEquipment: Equipment[] = $state(
    Object.keys(ALL_EQUIPMENT).map((key) => EQUIPMENT(key, true))
  );
  let filteredEquipment: Equipment[] = $state(allEquipment);

  const craftEquipment = (itemId: Equipment['id']) => {
    const item = EQUIPMENT(itemId, false);
    const { cost, level } = EQUIPMENT(item, true);
    item.overrides = { level };
    const { silver } = formatCoins(cost);

    confirmWithDialog(BasicConfirmation as any, {
      text: `Are you sure you want to acquire this equipment for <span class="text-white">${silver} coins</span>?`,
      confirm: () => {
        app.coins -= cost;
        app.inventory.push(item);
      }
    });
  };
</script>

<Headline text="vendor" />

<EquipmentFilter {allEquipment} bind:filteredEquipment />

<crow vertical up left class="-mx-4 mt-4 !w-auto">
  <crow up left class="gap-4 px-6 py-2">
    <div class="cinzel flex-1">Name</div>
    <div class="cinzel flex-1">Slots in</div>
    <!-- <div class="cinzel flex-1">Level</div> -->
    <div class="cinzel flex-1">Cost</div>
    <div class="cinzel w-20"></div>
  </crow>
  {#each filteredEquipment as item, i (item.uuid)}
    <crow left class="w-full gap-4 px-6 py-2 {i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}">
      <crow left class="flex-1 gap-2">
        <!-- <div class="w-6">
          <div class="overflow-hidden rounded-full">
            <img src="/images/equipment/{item.equipmentName}/01.png" alt="" />
          </div>
        </div> -->

        <EquipmentLink {...item} />
      </crow>
      <div class="flex-1 text-sm text-gray-600">{slotsInPrettyName(item.slotsIn)}</div>
      <!-- <div class="flex-1 text-sm text-gray-600">{item.level}</div> -->
      <div class="flex-1">
        <Coins renderAll amount={item.cost} class="right" />
      </div>
      <crow class="w-20 !flex-none" right>
        <Button
          disabled={app.coins < item.cost}
          tertiary
          onclick={craftEquipment.bind(undefined, item.id)}
        >
          Acquire
        </Button>
      </crow>
    </crow>
  {/each}
</crow>
