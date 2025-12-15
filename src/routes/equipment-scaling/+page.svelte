<script lang="ts">
  import EQUIPMENT, { ALL_EQUIPMENT } from '@/constants/EQUIPMENT';

  let chosenEquipment = $state('sword');

  let equipmentPool = $derived([
    EQUIPMENT(chosenEquipment),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 1 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 2 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 3 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 4 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 5 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 6 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 7 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 8 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 9 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 10 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 11 } }),
    EQUIPMENT(chosenEquipment, false, { overrides: { level: 12 } })
  ]);
</script>

<Headline text="equipment scaling" />

<!--onchange={({ target: { value } }) => console.info(value)}-->
<Dropdown
  options={Object.keys(ALL_EQUIPMENT)}
  value={chosenEquipment}
  onchange={({ target: { value } }: any) => (chosenEquipment = value)}
/>

{#each equipmentPool as equipment, i (`${equipment.id}_${i}`)}
  {@const hydratedEquipment = EQUIPMENT(equipment, true)}
  <crow left class="gap-2">
    {#if i === 0}
      base
    {:else}
      level {i}
    {/if}
    <EquipmentLink {...hydratedEquipment} />
  </crow>
{/each}

<!-- <Debug data={equipment} /> -->
