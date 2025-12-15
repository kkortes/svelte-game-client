<script lang="ts">
  import EQUIPMENT from '@/constants/EQUIPMENT';
  import { slotsInPrettyName, unequip } from '@/ts/equipment';
  import type { Character } from '@/types/character';
  import type { EquipmentSlot } from '@/types/equipment';

  let { character }: { character: Character } = $props();
</script>

{#each Object.entries(character.equipment) as [slot, equipment] (`${character.uuid}-${slot}-${equipment?.uuid}`)}
  <crow left class="w-full !justify-between gap-2">
    <crow left class="gap-2">
      <div class="w-20">{slotsInPrettyName(slot as EquipmentSlot)}</div>

      {#if slot === 'offHand' && character.equipment.mainHand && EQUIPMENT(character.equipment.mainHand, true).slotsIn === 'twoHand'}
        <span class="text-gray-400">
          {EQUIPMENT(character.equipment.mainHand, true).name}
        </span>
      {:else if slot === 'mainHand' && !character.equipment.mainHand}
        <span class="text-gray-400">Fist</span>
      {:else if slot === 'offHand' && !character.equipment.offHand}
        <span class="text-gray-400">Fist</span>
      {:else if equipment}
        <EquipmentLink {...EQUIPMENT(equipment, true)} />
      {:else}
        -
      {/if}
    </crow>

    {#if equipment}
      <Button tertiary onclick={() => unequip(equipment, slot as EquipmentSlot)}>Unequip</Button>
    {/if}
  </crow>
{/each}
