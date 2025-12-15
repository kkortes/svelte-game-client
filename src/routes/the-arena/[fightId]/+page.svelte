<script lang="ts">
  import { page } from '$app/stores';
  import { generateCombat, prepareTeams } from '@/ts/combat';
  import { goto } from '$app/navigation';
  import { ALL_FIGHTS } from '@/constants/FIGHTS';
  import CHARACTERS from '@/constants/CHARACTERS';
  import { allowedNumberOfCharacters, getExperienceReward } from '@/ts/level';
  import { calculateCombatStatsByCharacter, runCombatSimulations } from '@/ts/utils';
  import type { Character, CharacterRef } from '@/types/character';

  const { IS_PROD } = ENV;

  const {
    params: { fightId }
  } = $page;

  let fight = ALL_FIGHTS.find(({ id }) => id === fightId) as any;
  let characters = $derived(
    fight.characters.map((character: CharacterRef[]) => ({
      ...character,
      overrides: {
        level: fight.minLevel,
        equipment: {
          mainHand: { overrides: { level: fight.minLevel } },
          offHand: { overrides: { level: fight.minLevel } },
          armor: { overrides: { level: fight.minLevel } }
        }
      }
    }))
  );

  $effect(() => {
    app.maxBrawlers = fight.allowedNumberOfCharacters;
  });

  const runCombat = () => {
    const selected = app.characters.filter(({ uuid }) => app.selectedBrawlers.includes(uuid));
    if (!selected) return;

    app.combat = generateCombat(
      prepareTeams($state.snapshot(selected), characters),
      undefined,
      fight.id
    );
    console.info(app.combat);

    app.selectedBrawlers = [];

    app.overlay = 'Combat';
  };

  let brawlersSelected = $derived(app.selectedBrawlers.length > 0);
  let descriptionOpen = $derived(!brawlersSelected && fight.characters.length === 1);
</script>

<GoBack onclick={() => goto('/the-arena')} />

<Headline text={fight.name}>
  <crow class="w-full !justify-between">
    <crow left class="gap-2">
      <Pill text="{fight.allowedNumberOfCharacters}&nbsp;vs&nbsp;{fight.characters.length}" />
      {#if fight.boss}
        <Pill text="bossfight" />
        <Pill text="luck disabled" class="bg-red-200 text-red-400" />
      {/if}
    </crow>
    <span class="text-gray-400">
      {#if !IS_PROD}
        {(runCombatSimulations(
          10,
          [$state.snapshot(app.characters[0] as Character)],
          characters,
          undefined,
          fight.id
        ) /
          10) *
          100}% win chance
      {/if}
      <!-- {getExperienceReward(fight.characters.length, fight.minLevel, fight.maxLevel, fight.boss)} XP -->
    </span>
    <!-- <CoreStats combatStats={creature.combatStats} /> -->
  </crow>
</Headline>

{#each characters as character}
  {@const creature = CHARACTERS(character, true)}
  {@const combatStats = calculateCombatStatsByCharacter(creature)}
  <!-- <Headline text={creature.name} small>
    <CoreStats combatStats={creature.combatStats} />
  </Headline> -->

  <crow left class="!items-stretch !justify-stretch overflow-hidden">
    <crow
      class={tw(
        'w-0 !flex-none opacity-0 transition-all duration-200',
        !descriptionOpen && 'w-20 opacity-100'
      )}
    >
      <CoreStats {combatStats} small vertical />
    </crow>
    <!-- <pre>
    {JSON.stringify(creature, null, 2)}
    </pre> -->

    <crow up left vertical>
      <Accordion isOpen={descriptionOpen}>
        <div class="min-h-54 max-w-100 pb-8 text-sm">
          <!-- <crow left class="mb-6">
            Stats with gear:
            <CoreStats combatStats={calculateCombatStatsByCharacter(creature)} />
          </crow> -->
          <crow left class="mb-6">
            <CoreStats {combatStats} />
          </crow>
          {#if !IS_PROD && false}
            <crow up left vertical>
              <Headline text="lucky stats" small />

              <Stats
                class="text-green-500"
                stats={Object.entries(combatStats).filter(([key]) =>
                  [
                    'criticalChance',
                    'criticalDamage',
                    'blockChance',
                    'dodgeChance',
                    'magicChance'
                  ].includes(key)
                )}
              />
            </crow>
          {/if}
          {@html creature.description}
        </div>
      </Accordion>
      <crow class="relative w-full" vertical left up>
        <Accordion isOpen={descriptionOpen}>
          <crow class="w-full !justify-between">
            <h5>Abilities</h5>
          </crow>
        </Accordion>
        <AbilityBar character={creature} abilities={creature.abilities} dndDisabled minimalistic />
      </crow>
    </crow>

    <crow
      class={tw(
        'pointer-events-none relative w-40 !flex-none -scale-x-[1] bg-contain bg-center bg-no-repeat transition-all duration-200',
        !descriptionOpen && 'w-20'
      )}
    >
      <img src="/images/races/{creature.image}" class="absolute top-0 right-0 left-0" alt="" />
    </crow>
  </crow>
{/each}

<Hr class="mt-6 mb-6" />

<CharacterSelection {runCombat} count={fight.allowedNumberOfCharacters} />

<!-- <Debug data={selectedBrawlers} /> -->
