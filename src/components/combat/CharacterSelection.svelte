<script lang="ts">
  import Portal from 'svelte-portal';
  import CHARACTERS from '@/constants/CHARACTERS';
  import type { Character } from '@/types/character';

  let {
    runCombat,
    count = 1
  }: {
    runCombat: () => void;
    count?: number;
  } = $props();

  let selectedBrawlers: Character[] = $derived(
    app.selectedBrawlers.map((id) =>
      CHARACTERS(app.characters.find(({ uuid }) => uuid === id) as Character, true)
    )
  );

  let brawlersSelected = $derived(selectedBrawlers.length > 0);
</script>

<crow vertical class="w-full gap-2">
  {#each Array(count) as _, index}
    {@const selectedBrawler = selectedBrawlers[index]}
    {#if !selectedBrawler}
      <crow
        vertical
        class="h-[78px] w-full !flex-none border border-dashed border-gray-300 text-center"
      >
        {#if index === 0}
          <h5>select a brawler</h5>
        {:else}
          <h5>slot {index + 1}</h5>
        {/if}
      </crow>
    {:else}
      <AbilitySelection character={selectedBrawler} renderSides />
    {/if}
  {/each}
</crow>

<Portal target="#sticky-bottom">
  <crow class="gap-3 bg-gradient-to-t from-slate-800 to-transparent p-3">
    <!-- <Button
      tertiary
      disabled={!brawlersSelected || app.combat.duration !== 0}
      onclick={() => (app.selectedBrawlers = [])}
    >
      Cancel
    </Button> -->

    <Button
      big
      bgColor="bg-red-500"
      disabled={!brawlersSelected ||
        app.combat.duration !== 0 ||
        selectedBrawlers.some(
          (brawler) => CHARACTERS(brawler, true).combatStats.currentHealth <= 0
        )}
      onclick={runCombat}
    >
      Fight
    </Button>
  </crow>
</Portal>
