<script lang="ts">
  import CoreStats from '@/components/character/CoreStats.svelte';
  import CHARACTER, { ALL_CHARACTERS } from '@/constants/CHARACTERS';
  import { calculateCombatStatsByCharacter } from '@/ts/utils';

  let chosenCharacter = $state('elfMale');
  let equipmentScaling = $state(true);
  let characterScaling = $state(true);

  const overrider = (level: number) => {
    return {
      overrides: {
        level: characterScaling ? level : 1,
        equipment: {
          mainHand: { overrides: { level: equipmentScaling ? level : 0 } },
          offHand: { overrides: { level: equipmentScaling ? level : 0 } },
          armor: { overrides: { level: equipmentScaling ? level : 0 } }
        }
      }
    };
  };

  let characterPool = $derived([
    CHARACTER(chosenCharacter, false, overrider(1)),
    CHARACTER(chosenCharacter, false, overrider(2)),
    CHARACTER(chosenCharacter, false, overrider(3)),
    CHARACTER(chosenCharacter, false, overrider(4)),
    CHARACTER(chosenCharacter, false, overrider(5)),
    CHARACTER(chosenCharacter, false, overrider(6)),
    CHARACTER(chosenCharacter, false, overrider(7)),
    CHARACTER(chosenCharacter, false, overrider(8)),
    CHARACTER(chosenCharacter, false, overrider(9)),
    CHARACTER(chosenCharacter, false, overrider(10)),
    CHARACTER(chosenCharacter, false, overrider(11)),
    CHARACTER(chosenCharacter, false, overrider(12)),
    CHARACTER(chosenCharacter, false, overrider(13)),
    CHARACTER(chosenCharacter, false, overrider(14)),
    CHARACTER(chosenCharacter, false, overrider(15)),
    CHARACTER(chosenCharacter, false, overrider(16)),
    CHARACTER(chosenCharacter, false, overrider(17)),
    CHARACTER(chosenCharacter, false, overrider(18)),
    CHARACTER(chosenCharacter, false, overrider(19)),
    CHARACTER(chosenCharacter, false, overrider(20)),
    CHARACTER(chosenCharacter, false, overrider(21)),
    CHARACTER(chosenCharacter, false, overrider(22)),
    CHARACTER(chosenCharacter, false, overrider(23)),
    CHARACTER(chosenCharacter, false, overrider(24)),
    CHARACTER(chosenCharacter, false, overrider(25))
  ]);
</script>

<Headline text="character scaling" />

<crow left class="gap-2">
  <div>
    <Checkbox
      id="characterScaling"
      bind:value={characterScaling}
      onchange={({ target: { checked } }: any) => (characterScaling = checked)}
    >
      Character scaling
    </Checkbox>
  </div>
  <div>
    <Checkbox
      id="equipmentScaling"
      bind:value={equipmentScaling}
      onchange={({ target: { checked } }: any) => (equipmentScaling = checked)}
    >
      Equipment scaling
    </Checkbox>
  </div>
</crow>
<!--onchange={({ target: { value } }) => console.info(value)}-->
<Dropdown
  options={Object.keys(ALL_CHARACTERS)}
  value={chosenCharacter}
  onchange={({ target: { value } }: any) => (chosenCharacter = value)}
/>

{#each characterPool as character, i (`${character.id}_${i}`)}
  {@const hydratedCharacter = {
    ...CHARACTER(character, true),
    combatStats: calculateCombatStatsByCharacter(CHARACTER(character, true))
  }}
  <crow left class="!justify-between gap-2">
    <crow left class="gap-2">
      level {i + 1}

      <EquipmentLink {...hydratedCharacter} />
    </crow>
    <CoreStats {...hydratedCharacter} small />
  </crow>
{/each}

<crow vertical left class="bg-gray-100 p-4">
  <Headline text="Equipment" small />
  <CharacterEquipment character={CHARACTER(characterPool[24], true)} />
</crow>

<!-- <Debug data={equipment} /> -->
