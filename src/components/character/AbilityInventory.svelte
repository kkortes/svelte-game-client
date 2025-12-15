<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import type { AbilityRef } from '@/types/ability';
  import ABILITIES from '@/constants/ABILITIES';
  import type { Character } from '@/types/character';
  import CHARACTERS from '@/constants/CHARACTERS';

  let flipDurationMs = 300;

  let {
    character,
    availableAbilities,
    transformDraggedAvailableAbility,
    considerAvailableAbilities,
    finalizeAvailableAbilities,
    dropFromOthersDisabled = false,
    small = false
  }: {
    character: Character;
    availableAbilities: AbilityRef[];
    transformDraggedAvailableAbility?: (draggedElement: any, data: any, _index: any) => void;
    considerAvailableAbilities?: (e: any) => void;
    finalizeAvailableAbilities?: (e: any) => void;
    dropFromOthersDisabled?: boolean;
    small?: boolean;
  } = $props();

  let hydratedAbilities = $derived(availableAbilities.map((a) => ABILITIES(a, true)));
  let hasNonbasicAbilities = $derived(
    character.abilities?.some((ability) => !ABILITIES(ability, true).basic)
  );
</script>

<crow
  class={tw(
    'available-abilities min-h-[calc(98px*3)] w-full !flex-none gap-2 rounded-lg border border-gray-300 bg-gray-50 p-2',
    small ? 'min-h-0 w-auto gap-1 border-none bg-transparent p-0' : 'inset-shadow-sm',
    availableAbilities.length ? 'left up' : ''
  )}
  use:dndzone={{
    items: availableAbilities,
    flipDurationMs,
    dropFromOthersDisabled,
    transformDraggedElement: transformDraggedAvailableAbility,
    dropTargetStyle: {},
    type: character.uuid
  }}
  onconsider={considerAvailableAbilities}
  onfinalize={finalizeAvailableAbilities}
>
  {#if hydratedAbilities.length}
    {#each hydratedAbilities as ability (ability.uuid)}
      <crow
        class={tw(
          'relative h-20 w-20 !flex-none gap-2 rounded border-[0.5px] border-gray-400 bg-white',
          small && 'h-10 w-10 gap-1',
          ability.basic && 'border-gray-300 bg-gray-100'
        )}
        use:tooltip={{
          children: TooltipAbility,
          props: { ...ability, character: CHARACTERS(character, true) },
          direction: 'up',
          lockInPlace: true
        }}
        animate:flip={{ duration: flipDurationMs }}
      >
        <AbilityIcon {ability} {small} />

        <!-- {ability.uuid.substring(0, 5)} -->
      </crow>
    {/each}
  {:else if hasNonbasicAbilities}
    <span class="text-gray-400">Abilities from equipped gear will appear here</span>
  {:else}
    <span class="text-gray-400">Abilities from equipped gear will appear here</span>
  {/if}
</crow>
