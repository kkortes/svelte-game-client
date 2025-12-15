<script lang="ts">
  import CHARACTERS from '@/constants/CHARACTERS';
  import { ALL_FIGHTS } from '@/constants/FIGHTS';
  import { getExperienceReward, getLevelByExperience } from '@/ts/level';
  import { runCombatSimulations } from '@/ts/utils';
  import type { Character } from '@/types/character';

  const { IS_PROD } = ENV;

  const SIMULATION_COUNT = 10;

  const fights = ALL_FIGHTS.sort((a, b) => {
    // 1) Group by minLevel
    if (a.minLevel !== b.minLevel) return a.minLevel - b.minLevel;

    // 2) Within the same minLevel, put non-bosses first, bosses last
    if (a.boss !== b.boss) return a.boss ? 1 : -1;

    // 3) If both are (non-)bosses, sort by maxLevel
    return a.maxLevel - b.maxLevel;
  }).map((fight) => ({
    ...fight,
    characters: fight.characters.map((character) => ({
      ...character,
      overrides: {
        ...character?.overrides,
        level: fight.minLevel,
        equipment: {
          mainHand: { overrides: { level: fight.minLevel } },
          offHand: { overrides: { level: fight.minLevel } },
          armor: { overrides: { level: fight.minLevel } }
        }
      }
    }))
  }));
  // .slice(0, 1);

  let hideTreshold = $derived(app.bossHighscore + 5);
  let ludusLevel = $derived(getLevelByExperience(app.experience));
</script>

<Headline text="the arena" />

<crow vertical up left class="-mx-4 !w-auto">
  <crow up left class="gap-4 px-6 py-2 text-stone-900">
    <div class="cinzel flex-1">name</div>
    <div class="cinzel !w-12 text-center">level</div>
    <div class="cinzel !w-12 text-left">loot</div>

    {#if !IS_PROD}
      <div class="cinzel !w-12 text-right">win</div>
    {/if}
    <!-- <div class="cinzel flex-2 text-right">stats</div> -->
    <crow class="!w-30 !flex-none" right>
      <!-- Name -->
    </crow>
  </crow>
  {#each fights as { characters, id, name, minLevel, maxLevel, boss }, i}
    {@const wins = runCombatSimulations(
      SIMULATION_COUNT,
      [$state.snapshot(app.characters[0] as Character)],
      characters,
      undefined,
      id
    )}
    {@const isLocked = hideTreshold < minLevel}
    {@const bossCompleted = boss && app.bossHighscore >= minLevel}

    <Clickable
      href="/the-arena/{id}"
      onclick={(e) => {
        if (isLocked || bossCompleted) {
          e.preventDefault();
          return;
        }
      }}
      class={tw(
        'crow left w-full gap-4 px-6 py-2 text-sm transition-all duration-500',
        i % 2 === 0 ? 'bg-stone-50' : 'bg-stone-100',
        boss && 'boss mt-12 py-8',
        !isLocked &&
          !bossCompleted &&
          'hover:bg-gradient-to-r hover:from-transparent hover:via-stone-200 hover:to-transparent active:from-stone-100 active:via-stone-50 active:to-stone-100',
        (isLocked || bossCompleted) && 'cursor-default',
        isLocked && 'opacity-50'
      )}
    >
      <crow left class="cinzel flex-1 gap-2 text-base text-nowrap">
        {isLocked ? '?' : name}
        {#if boss}
          <Pill text="Bossfight" />
        {/if}
      </crow>
      <div class="!w-12 text-center">{minLevel} {minLevel === maxLevel ? '' : `- ${maxLevel}`}</div>
      <div class={tw('!w-12 text-left')}>
        <div class={tw(ludusLevel > maxLevel && 'text-gray-400 line-through')}>
          {getExperienceReward(characters.length, minLevel, maxLevel, boss)} XP
        </div>
      </div>
      {#if !IS_PROD}
        <div class="!w-12 text-right">{(wins / SIMULATION_COUNT) * 100}%</div>
      {/if}
      <!-- <div class="flex-2">
        <crow right>
          <CoreStats combatStats={creature.combatStats} small />
        </crow>
      </div> -->
      <crow right class="!w-30 !flex-none gap-6">
        {#each characters as character}
          {@const { image } = CHARACTERS(character, true)}
          <crow right class={tw('!w-4 !flex-none gap-2', boss && '!w-12')}>
            <div class={tw('-my-2 -mr-6 w-10', boss && 'w-20')}>
              <crow
                class={tw(
                  'glass relative aspect-square w-full overflow-hidden !rounded-none',
                  !isLocked && 'up'
                )}
              >
                {#if isLocked}
                  <crow class="w-5 !flex-none rounded-full bg-gray-800/40 font-bold text-white">
                    ?
                  </crow>
                {:else}
                  <img
                    class={tw(
                      'h-auto w-[120%] max-w-none scale-x-[-1] [grid-area:1/1]',
                      bossCompleted && 'grayscale'
                    )}
                    src="/images/races/{image}"
                    alt=""
                  />
                  {#if bossCompleted}
                    <crow class="absolute inset-0">
                      <Icon name="checkmark" class="text-4xl text-green-500 drop-shadow-lg" />
                    </crow>
                  {/if}
                {/if}
              </crow>
            </div>
          </crow>
        {/each}
      </crow>
    </Clickable>
  {/each}
</crow>

<style>
  :global(.boss + .boss) {
    margin-top: 0 !important;
  }
  :global(.boss:has(+ .boss)) {
    margin-bottom: 0 !important;
  }
</style>
