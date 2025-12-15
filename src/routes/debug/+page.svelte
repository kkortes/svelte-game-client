<script lang="ts">
  import { calculateCombatStatsByCharacter, prepareCombatant, seededRandom } from '@/ts/utils';
  import { generateCombat } from '@/ts/combat';
  import CHARACTERS from '@/constants/CHARACTERS';
  import type { Team } from '@/types/team';
  import type { Character } from '@/types/character';
  import { INITIAL_COMBAT } from '@/app.svelte';

  let teams = $derived<Team[]>(app.combat.teamsStartState);
  let teamCount = $state(2);
  let combatantCount = $state(1);

  let characters: Character[] = [
    CHARACTERS('elfMale'),
    CHARACTERS('elfFemale'),
    CHARACTERS('humanMale'),
    CHARACTERS('humanFemale'),
    CHARACTERS('trollMale'),
    CHARACTERS('trollFemale'),
    CHARACTERS('dwarfMale'),
    CHARACTERS('dwarfFemale'),
    CHARACTERS('goblinMale'),
    CHARACTERS('goblinFemale'),
    CHARACTERS('succubus'),
    CHARACTERS('rat')
  ];

  const initializeCombat = () => {
    const generateCombatants = (teamIndex: number) =>
      Array.from({ length: combatantCount }, (_, combatantIndex) =>
        prepareCombatant(
          characters[seededRandom(0, characters.length - 1, `ff${combatantIndex}_${teamIndex}`)],
          teamCount,
          combatantCount,
          teamIndex,
          combatantIndex
        )
      );

    const generatedTeams = Array.from({ length: teamCount }, (_, index) => ({
      name: `Team ${index}`,
      index,
      combatants: generateCombatants(index)
    }));

    // Inject account character
    generatedTeams[0].combatants = [
      prepareCombatant(app.characters[0], generatedTeams.length, 1, 0, 0)
    ];

    app.combat.teamsStartState = generatedTeams;
  };

  const startCombat = () => {
    app.combat = generateCombat($state.snapshot(teams), 'myseed');
    console.info($state.snapshot(app.combat));
  };

  const reset = () => {
    app.characters[0].overrides.combatStats.currentHealth = calculateCombatStatsByCharacter(
      CHARACTERS(app.characters[0], true)
    ).maxHealth;
    app.combat = INITIAL_COMBAT;
    app.liveTeams = [];
    app.elapsedMilliseconds = 0;
  };

  $effect(initializeCombat);
</script>

<crow class="fixed bottom-1/2 left-20 w-40 gap-2 bg-gray-300 p-2" vertical>
  Teams {teamCount}:
  <input type="range" min="1" max="8" bind:value={teamCount} />

  Combatants {combatantCount}:
  <input type="range" min="1" max="6" bind:value={combatantCount} />

  <Button onclick={reset}>Reset</Button>
  <Button onclick={startCombat} disabled={app.combat.duration !== 0}>Start combat</Button>
</crow>

{#if app.combat.teamsStartState.length}
  <Combat />
{/if}
