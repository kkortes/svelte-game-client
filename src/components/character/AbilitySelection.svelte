<script lang="ts">
  import { untrack } from 'svelte';
  import { page } from '$app/stores';
  import app from '@/app.svelte';
  import type { Ability, AbilityRef } from '@/types/ability';
  import {
    calculateAvailableAbilitiesByCharacter,
    calculateCombatStatsByCharacter
  } from '@/ts/utils';
  import EQUIPMENT from '@/constants/EQUIPMENT';
  import ABILITIES from '@/constants/ABILITIES';
  import type { Character } from '@/types/character';
  import Button from '@/components/form/Button.svelte';
  import { generateCombat, healFull, prepareTeams } from '@/ts/combat';
  import CHARACTERS from '@/constants/CHARACTERS';
  import CoreStats from './CoreStats.svelte';
  import { goto } from '$app/navigation';

  let { character, renderSides }: { character: Character; renderSides?: boolean } = $props();

  let availableAbilities: AbilityRef[] = $state([]);
  let dropFromOthersDisabled = $state(false);
  let constrainAxisY = $state(false);
  let showAvailableAbilities = $state(false);

  let characterEquipment = $derived(character.overrides.equipment);

  const considerCharacterAbilities = (e: any) => {
    character.overrides.abilities = e.detail.items;
  };
  const finalizeCharacterAbilities = (e: any) => {
    character.overrides.abilities = e.detail.items;
  };

  const transformDraggedCharacterAbility = (draggedElement: any, data: any, _index: any) => {
    if (ABILITIES(data, true).basic) {
      dropFromOthersDisabled = true;
      constrainAxisY = true;
    } else {
      dropFromOthersDisabled = false;
      constrainAxisY = false;
    }
    app.tooltip = undefined;
  };

  const considerAvailableAbilities = (e: any) => {
    e.detail.items
      .sort((a: AbilityRef, b: AbilityRef) =>
        ABILITIES(a, true).name.localeCompare(ABILITIES(b, true).name)
      )
      .sort((a: AbilityRef, b: AbilityRef) => ABILITIES(a, true).ticks - ABILITIES(b, true).ticks);

    availableAbilities = e.detail.items;
  };

  const finalizeAvailableAbilities = (e: any) => {
    availableAbilities = e.detail.items;
  };

  const transformDraggedAvailableAbility = (draggedElement: any, _data: any, _index: any) => {
    const ticks = draggedElement.querySelector('.ticks');
    if (ticks) {
      ticks.remove();
    }
    app.tooltip = undefined;
  };

  const ensureDefaultAbilities = () => {
    const isShield = !!(
      characterEquipment.offHand &&
      EQUIPMENT(characterEquipment.offHand, true).slotsIn === 'offHand'
    );
    const isTwoHanded = !!(
      characterEquipment.mainHand &&
      EQUIPMENT(characterEquipment.mainHand, true).slotsIn === 'twoHand'
    );
    const isOneHandedMainhand = !!(
      characterEquipment.mainHand &&
      EQUIPMENT(characterEquipment.mainHand, true).slotsIn === 'oneHand'
    );
    const isOneHandedOffhand = !!(
      characterEquipment.offHand &&
      EQUIPMENT(characterEquipment.offHand, true).slotsIn === 'oneHand'
    );
    const isOneHandedWeapon = isOneHandedMainhand || isOneHandedOffhand;

    const mainHandAbilities = characterEquipment.mainHand
      ? EQUIPMENT(characterEquipment.mainHand, true)
          .abilities.map((ability) => ABILITIES(ability, true))
          .filter(({ basic }) => basic)
          .map((ability, i) => ({
            ...ABILITIES(ability),
            uuid: `${character.id}::mainHand::${characterEquipment.mainHand?.id}::${ability.id}::${ability.name}::${i}`
          }))
      : [];

    const offHandAbilities = characterEquipment.offHand
      ? EQUIPMENT(characterEquipment.offHand, true)
          .abilities.map((ability) => ABILITIES(ability, true))
          .filter(({ basic }) => basic)
          .map((ability, i) => ({
            ...ABILITIES(ability),
            uuid: `${character.id}::offHand::${characterEquipment.offHand?.id}::${ability.id}::${ability.name}::${i}`
          }))
      : [];

    // const instanceKey = `${character.id}::${slot}::${equipment.id}::${a.id}::${abilityIndex}`;
    // Unarmed
    const punches = [
      ABILITIES({ id: 'punch', uuid: `${character.id}::mainHand::_::punch::0` }),
      ABILITIES({ id: 'punch', uuid: `${character.id}::mainHand::_::punch::1` }),
      ABILITIES({ id: 'punch', uuid: `${character.id}::mainHand::_::punch::2` }),
      ABILITIES({ id: 'punch', uuid: `${character.id}::offHand::_::punch::3` }),
      ABILITIES({ id: 'punch', uuid: `${character.id}::offHand::_::punch::4` }),
      ABILITIES({ id: 'punch', uuid: `${character.id}::offHand::_::punch::5` })
    ];
    let defaultAbilities = [...punches];

    if (isTwoHanded) {
      defaultAbilities = mainHandAbilities;
    } else if (isShield) {
      defaultAbilities = [];

      if (isOneHandedWeapon) {
        defaultAbilities.push(...mainHandAbilities);
      } else {
        defaultAbilities.push(...punches.slice(0, 3));
      }

      defaultAbilities.push(...offHandAbilities);
    } else if (isOneHandedWeapon) {
      defaultAbilities = [];
      if (isOneHandedMainhand) {
        defaultAbilities.push(...mainHandAbilities);
      } else {
        defaultAbilities.push(...punches.slice(0, 3));
      }
      if (isOneHandedOffhand) {
        defaultAbilities.push(...offHandAbilities);
      } else {
        defaultAbilities.push(...punches.slice(3, 6));
      }
    }

    const currentAbilities = character.abilities.map((ability) =>
      !ABILITIES(ability, true).basic ? ability : undefined
    );

    const abs = [
      ...currentAbilities
        .map((ability) => {
          if (ability) return $state.snapshot(ability);

          const defaultAbility = defaultAbilities.shift();

          return defaultAbility;
        })
        .filter((a) => a),
      ...defaultAbilities
    ] as Ability[];

    // Earlier .id instead of .uuid
    // @ts-expect-error
    if (JSON.stringify(abs.map((a) => a?.uuid).sort((a, b) => a.localeCompare(b))) !== JSON.stringify(character.abilities.map((a) => a.uuid).sort((a, b) => a.localeCompare(b)))) { 
      character.overrides.abilities = abs;
    } // prettier-ignore
  };

  const ensureAvailableAbilities = () => {
    const abilities = calculateAvailableAbilitiesByCharacter(character);

    // Decide what abilities a character can use
    availableAbilities = abilities
      .filter(({ uuid }) => !character.overrides.abilities.find((a) => a.uuid === uuid))
      .filter((ability) => !ABILITIES(ability, true).basic)
      .sort((a: AbilityRef, b: AbilityRef) =>
        ABILITIES(a, true).name.localeCompare(ABILITIES(b, true).name)
      )
      .sort((a: AbilityRef, b: AbilityRef) => ABILITIES(a, true).ticks - ABILITIES(b, true).ticks);

    // Remove abilities that are no longer available from character
    character.overrides.abilities = character.overrides.abilities.filter(
      (ability) =>
        abilities.some(({ uuid }) => uuid === ability.uuid) || ABILITIES(ability, true).basic
    );
  };

  $effect(() => {
    $state.snapshot(characterEquipment);

    untrack(() => {
      ensureDefaultAbilities();
      ensureAvailableAbilities();
    });
  });

  let characterIndex = $derived($page.params.characterIndex);

  const tryOutBuild = () => {
    const selected = app.characters[parseInt(characterIndex, 10)];
    if (!selected) return;

    const myCharacter = $state.snapshot(selected);

    let creature = CHARACTERS('trainingDummy', true);

    app.combat = generateCombat(prepareTeams(healFull([myCharacter]), [creature]));
    console.info(app.combat);

    app.overlay = 'Combat';
  };
</script>

<crow vertical class="w-full">
  <crow left class="!items-stretch !justify-stretch overflow-hidden">
    {#if renderSides}
      <crow
        class={tw(
          'pointer-events-none relative w-40 !flex-none bg-contain bg-center bg-no-repeat transition-all duration-200',
          renderSides && 'w-20'
        )}
      >
        <img
          src="/images/races/{character.image.replace('.png', '-mugshot.png')}"
          class="absolute top-0 right-0 left-0 opacity-20"
          alt=""
        />
        <CoreStats combatStats={calculateCombatStatsByCharacter(character)} small vertical />
      </crow>
    {/if}

    <crow class="relative w-full" vertical left up>
      {#if !renderSides}
        <crow class="w-full !justify-between">
          <h5>Active abilities</h5>
          <Button onclick={tryOutBuild} tertiary>Try out build</Button>
        </crow>
      {/if}
      <AbilityBar
        {character}
        abilities={character.overrides.abilities}
        {considerCharacterAbilities}
        {finalizeCharacterAbilities}
        {transformDraggedCharacterAbility}
        {constrainAxisY}
        minimalistic={renderSides}
        hideOverflow={renderSides && !showAvailableAbilities}
      />
    </crow>

    {#if renderSides}
      <crow class={tw('w-0 !flex-none gap-1 transition-all duration-200', renderSides && 'w-20')}>
        <Button
          onclick={() => (showAvailableAbilities = !showAvailableAbilities)}
          tertiary
          innerClass="py-2"
        >
          <Icon name="down" class={tw(showAvailableAbilities && '-scale-y-[1]')} />
        </Button>
        <Button
          onclick={() => {
            app.selectedBrawlers = app.selectedBrawlers.filter((uuid) => uuid !== character.uuid);
          }}
          tertiary
          innerClass="py-2 bg-red-200 text-red-600"
        >
          <Icon name="cross" class={tw(showAvailableAbilities && '-scale-y-[1]')} />
        </Button>
      </crow>
    {/if}
  </crow>

  <Accordion isOpen={!renderSides || showAvailableAbilities}>
    <div>
      <crow class="relative my-2 w-full gap-2 overflow-hidden p-1" vertical left up>
        <crow class="w-full !justify-between">
          <h5>Available abilities</h5>

          {#if !characterIndex}
            <Button
              onclick={() =>
                goto(
                  `/brawlers/${app.characters.findIndex(({ uuid }) => uuid === character.uuid)}`
                )}
              tertiary
            >
              Character sheet
            </Button>
          {/if}
        </crow>
        <AbilityInventory
          {character}
          {availableAbilities}
          {considerAvailableAbilities}
          {finalizeAvailableAbilities}
          {transformDraggedAvailableAbility}
          {dropFromOthersDisabled}
        />
      </crow>
    </div>
  </Accordion>
</crow>

<!-- <Debug data={character} /> -->
