<script lang="ts">
  import { slotsInPrettyName } from '@/ts/equipment';
  import type { Equipment, EquipmentType } from '@/types/equipment';

  type EquipmentFilterType = 'all' | EquipmentType;

  let {
    allEquipment,
    filteredEquipment = $bindable()
  }: {
    allEquipment: Equipment[];
    filteredEquipment: Equipment[];
  } = $props();
  let filter = $state('all');

  const EQUIPMENT_TYPES: EquipmentFilterType[] = [
    'oneHand',
    'offHand',
    'twoHand',
    'armor',
    'accessory',
    'trinket'
  ];

  const filterBy = (type: EquipmentFilterType) => {
    if (type === filter) type = 'all';

    filteredEquipment = allEquipment.filter(
      (equipment: Equipment) => equipment.slotsIn.includes(type) || type === 'all'
    );

    filter = type;
  };
</script>

<crow class="!content-stretch !items-stretch !justify-stretch gap-1">
  <Button
    active={'all' === filter}
    class="flex-1"
    tertiary
    onclick={filterBy.bind(undefined, 'all')}
  >
    All ({allEquipment.length})
  </Button>
  {#each EQUIPMENT_TYPES as type}
    <Button
      active={type === filter}
      class="flex-1"
      tertiary
      onclick={filterBy.bind(undefined, type)}
    >
      {slotsInPrettyName(type)} ({allEquipment.filter((equipment: Equipment) =>
        equipment.slotsIn.includes(type)
      ).length})
    </Button>
  {/each}
</crow>
