<script lang="ts">
  import { dndzone } from 'svelte-dnd-action';
  import { calculateTickStart } from '@/ts/utils';
  import { flip } from 'svelte/animate';
  import type { AbilityRef } from '@/types/ability';
  import ABILITIES from '@/constants/ABILITIES';
  import type { CharacterRef } from '@/types/character';
  import CHARACTERS from '@/constants/CHARACTERS';

  let flipDurationMs = 300;
  let dragDisabled = $state(false);

  let {
    character,
    abilities,
    transformDraggedCharacterAbility,
    considerCharacterAbilities,
    finalizeCharacterAbilities,
    dndDisabled = false,
    constrainAxisY = false,
    small = false,
    minimalistic = false,
    hideOverflow = false
  }: {
    character: CharacterRef;
    abilities: AbilityRef[];
    transformDraggedCharacterAbility?: (draggedElement: any, data: any, _index: any) => void;
    considerCharacterAbilities?: (e: any) => void;
    finalizeCharacterAbilities?: (e: any) => void;
    dndDisabled?: boolean;
    constrainAxisY?: boolean;
    small?: boolean;
    minimalistic?: boolean;
    hideOverflow?: boolean;
  } = $props();

  let hydratedAbilities = $derived(abilities.map((a) => ABILITIES(a, true)));

  const lastTick = $derived(
    hydratedAbilities
      .map((ability, i) => {
        const tickStart = calculateTickStart(hydratedAbilities, i);
        const tickEnd = tickStart + ability.ticks;
        return { ...ability, tickStart, tickEnd };
      })
      .filter(({ tickStart }) => tickStart < CHARACTERS(character, true).maxTicks)
      .at(-1)?.tickEnd
  );
</script>

<div class={tw('w-full px-1 py-2', small && 'pb-0')}>
  <div class="relative w-[calc((100%/18)*18)]">
    <crow class="w-full" up>
      {#each Array(small ? 12 : 15) as _, i}
        <crow class="-ml-px aspect-[2/3] flex-1 border border-dashed border-gray-300"></crow>
      {/each}

      {#if !dndDisabled}
        <div
          class={tw(
            'absolute -top-2 -bottom-4 w-px -translate-x-px border-r border-solid transition-all duration-200'
          )}
          style="left:calc((100%/{small ? 12 : 15})*12);"
        >
          <!-- <crow vertical right class="absolute bottom-full text-center text-xs">
          <strong class="text-black">Ability&nbsp;sequence</strong>{lastTick}&nbsp;ticks
        </crow> -->
        </div>
      {/if}
      {#if !minimalistic}
        <div
          class={tw(
            'absolute -top-2 -bottom-2 z-10 w-px -translate-x-px border-r border-dashed transition-all duration-200'
          )}
          style="left:calc((100%/{small ? 12 : 15})*{lastTick});"
        >
          <crow vertical right class="absolute bottom-full text-center text-xs">
            <strong class="leading-3 text-black">Ability&nbsp;sequence</strong>{lastTick}&nbsp;ticks
          </crow>
        </div>
      {/if}
      <!-- {#if !small}
      <div
        class={tw(
          'absolute -top-2 -bottom-2 left-[calc((100%/15)*15)] w-px border-r border-dashed'
        )}
      >
        <crow vertical right class="absolute bottom-full text-center text-xs">
          {#if !dndDisabled}
            <strong class="text-black">Max</strong>
          {/if}
          15&nbsp;ticks
        </crow>
      </div>
    {/if} -->
    </crow>

    <crow
      up
      left
      class="absolute inset-0 w-full rounded-lg"
      use:dndzone={{
        items: abilities,
        flipDurationMs,
        constrainAxisY,
        transformDraggedElement: transformDraggedCharacterAbility,
        dropTargetStyle: { outline: 'rgba(100, 100, 100, 0.5) solid 2px' },
        dragDisabled: dndDisabled || dragDisabled,
        ...(dndDisabled ? { type: 'creature' } : { type: character.uuid })
      }}
      onconsider={considerCharacterAbilities}
      onfinalize={finalizeCharacterAbilities}
    >
      {#each hydratedAbilities as ability, i (ability.uuid)}
        {@const tickStart = calculateTickStart(hydratedAbilities, i)}
        <crow
          role="listitem"
          animate:flip={{ duration: dndDisabled ? 0 : flipDurationMs }}
          use:tooltip={{
            children: TooltipAbility,
            props: { ...ability, character: CHARACTERS(character, true) },
            direction: 'up',
            lockInPlace: true
          }}
          class={tw(
            'relative -ml-px h-full !flex-none rounded border border-gray-500 bg-white',
            ability.basic ? 'border-gray-300 bg-gray-100' : 'z-10',
            !dndDisabled && tickStart > 11 && 'border-red-300 bg-red-100',
            !dndDisabled && tickStart > 11 && hideOverflow && '!hidden'
          )}
          style="width: calc(((100%/{small ? 12 : 15})*{ability.ticks}) + 1px);"
        >
          <AbilityIcon {ability} hideTickCount {small} disabled={!dndDisabled && tickStart > 11} />
          <!-- {ability.uuid.substring(0, 5)} -->
        </crow>
      {/each}
    </crow>
  </div>
</div>
