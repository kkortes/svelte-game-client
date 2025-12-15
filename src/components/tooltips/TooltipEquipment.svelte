<script lang="ts">
  import type { Equipment } from '@/types/equipment';
  import ABILITIES from '@/constants/ABILITIES';
  import type { Character } from '@/types/character';
  import { prettyCombatStatKey, prettyCombatStatValue } from '@/types/combatStats';

  let {
    name,
    level,
    description,
    combatStats,
    abilities,
    character
  }: Equipment & { character: Character } = $derived(app.tooltip?.props);

  let activeAbilities = $derived(abilities?.filter((ability) => ABILITIES(ability, true).basic));
  let availableAbilities = $derived(
    abilities?.filter((ability) => !ABILITIES(ability, true).basic)
  );

  let { regularCombatStats, luckyCombatStats } = $derived.by(() => {
    const stats = Object.entries(combatStats);
    const regularStats = ['damage', 'maxHealth', 'maxArmor'];
    const regularCombatStats = stats.filter(([key]) => regularStats.includes(key));
    const luckyCombatStats = stats.filter(([key]) => !regularStats.includes(key));

    return {
      regularCombatStats,
      luckyCombatStats
    };
  });
</script>

<crow
  left
  vertical
  class="pointer-events-none !w-60 gap-2 rounded-md px-2.5 pt-1.5 pb-3 text-sm leading-[18px] text-gray-700 shadow-sm transition-all"
>
  <crow vertical left class="w-full">
    <crow class="w-full !justify-between">
      <div class="text-lg text-black">{name}</div>
      <div class="cinzel">level {level}</div>
    </crow>

    <Hr class="mb-0" />
  </crow>
  {#if regularCombatStats.length > 0}
    <crow vertical left class="!w-1/2">
      {#each regularCombatStats as [key, value]}
        <crow class="w-full !justify-between text-sm">
          <strong class="text-black"> {prettyCombatStatKey(key)} </strong>
          <span class="text-black">{value}</span>
        </crow>
      {/each}
    </crow>
  {/if}
  {#if luckyCombatStats.length > 0}
    <crow vertical left class="!w-1/2">
      {#each luckyCombatStats as [key, value]}
        <crow class="w-full !justify-between text-sm">
          <strong class="text-black"> {prettyCombatStatKey(key)} </strong>
          <span class="text-green-500">{prettyCombatStatValue(key, value)}</span>
        </crow>
      {/each}
    </crow>
  {/if}
  {#if description}
    <span class="text-sm italic">{@html description}</span>
  {/if}

  {#if activeAbilities.length > 0}
    <crow left up vertical class="gap-1">
      <AbilityBar {character} dndDisabled small minimalistic abilities={activeAbilities} />
    </crow>
  {/if}
  {#if availableAbilities.length > 0}
    <Hr class="mb-0.5" />
    <crow class="w-full gap-4">
      <!-- <div class="text-sm text-gray-500">Abilities</div> -->
      <AbilityInventory {character} {availableAbilities} small />
    </crow>
  {/if}
</crow>
