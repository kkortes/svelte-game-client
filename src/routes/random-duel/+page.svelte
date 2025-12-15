<script>
  import { generateCombat, healFull, prepareTeams } from '@/ts/combat';
  import { getExperienceRangeForLevel, getLevelByExperience } from '@/ts/level';

  let count = $derived(Math.floor(getLevelByExperience(app.experience) / 5) + 1);
  let selectedBrawlersPretty = $derived(
    app.selectedBrawlers.length || count === 1 ? Math.max(app.selectedBrawlers.length, 1) : 'X'
  );

  $effect(() => {
    app.maxBrawlers = count;
  });

  const runCombat = async () => {
    const { minXp, maxXp } = getExperienceRangeForLevel(getLevelByExperience(app.experience));
    console.log(minXp, maxXp);
    const characters = await app.socket.sendAsync('pvp/get-random-opponent', {
      count: app.selectedBrawlers.length,
      minXp,
      maxXp
    });

    if (characters.length) {
      const selected = app.characters.filter(({ uuid }) => app.selectedBrawlers.includes(uuid));
      if (!selected) return;

      const myCharacters = $state.snapshot(selected);
      app.selectedBrawlers = [];
      app.combat = generateCombat(
        prepareTeams(myCharacters, healFull(characters.slice(0, myCharacters.length)))
      );

      app.overlay = 'Combat';
    } else {
      // Fight bot
      console.error('No opponents found, fighting bot (not implemented)');
    }
  };
</script>

<div class="mb-8">
  <Headline text="random duel">
    <crow class="w-full !justify-between">
      <Pill text="{selectedBrawlersPretty}&nbsp;vs&nbsp;{selectedBrawlersPretty}" />
      <!-- <CoreStats combatStats={creature.combatStats} /> -->
    </crow>
  </Headline>

  <crow>
    <crow class="aspect-square w-40 !flex-none rounded-full bg-black/40 text-9xl text-white">
      ?
    </crow>
  </crow>
</div>

<CharacterSelection {runCombat} {count} />
