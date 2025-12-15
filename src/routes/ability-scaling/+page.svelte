<script lang="ts">
  import ABILITIES, { ALL_ABILITIES } from '@/constants/ABILITIES';

  let chosenAbility = $state('punch');

  let abilitiesPool = $derived([
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 1 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 2 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 3 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 4 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 5 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 6 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 7 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 8 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 9 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 10 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 11 } })],
    [ABILITIES(chosenAbility, false, { overrides: { ticks: 12 } })]
  ]);
</script>

<Headline text="ability scaling" />

<!--onchange={({ target: { value } }) => console.info(value)}-->
<Dropdown
  options={Object.keys(ALL_ABILITIES)}
  value={chosenAbility}
  onchange={({ target: { value } }: any) => (chosenAbility = value)}
/>

{#each abilitiesPool as abilities, i (i)}
  <AbilityBar {abilities} dndDisabled small minimalistic character={app.characters[0]} />
{/each}

<!-- <Debug data={equipment} /> -->
