<script lang="ts">
  import app from '@/app.svelte';
  import { page } from '$app/stores';
  import CHARACTERS from '@/constants/CHARACTERS';
  import { calculateCombatStatsByCharacter } from '@/ts/utils';
  import { goto } from '$app/navigation';
  import { getLevelByExperience } from '@/ts/level';
  import { confirmWithDialog } from '@/ts/dialog';
  import type { Character } from '@/types/character';
  import BasicConfirmation from '@/components/dialog/BasicConfirmation.svelte';
  import CoreStats from '@/components/character/CoreStats.svelte';
  import Accordion from '@/components/Accordion.svelte';

  const retireCharacter = async (character: Character) => {
    confirmWithDialog(BasicConfirmation as any, {
      text: `You are retiring <span class="text-white">${character.name}</span>.<br /><br />Do you wish to proceed?`,
      confirm: async () => {
        app.selectedBrawlers = app.selectedBrawlers.filter((uuid) => uuid !== character.uuid);
        await goto('/brawlers');
        app.characters = [];
      }
    });
  };

  let characterIndex = $derived($page.params.characterIndex);
  let characterRef = $derived(app.characters[characterIndex as any]);
  let character = $derived(CHARACTERS(characterRef, true));
  let combatStats = $derived(calculateCombatStatsByCharacter(character));
</script>

{#snippet RetireInfo()}
  <div class="p-2 text-sm">Only possible until level 5</div>
{/snippet}

<GoBack onclick={() => history.back()} />

<Headline text={character.name}>
  <crow right class="w-full gap-1">
    <crow up left class="mr-2 !flex-none">
      <Accordion isOpen={!app.settings.showDetailedCharacterView}>
        <CoreStats {combatStats} />
      </Accordion>
    </crow>
    <Button
      onclick={() =>
        (app.settings.showDetailedCharacterView = !app.settings.showDetailedCharacterView)}
      tertiary
      innerClass="py-1 px-2"
    >
      <Icon name="down" class={tw(app.settings.showDetailedCharacterView && '-scale-y-[1]')} />
      {app.settings.showDetailedCharacterView ? 'Simple view' : 'Show stats'}
    </Button>
    {#if getLevelByExperience(app.experience) <= 4}
      <crow
        class="!flex-none gap-2"
        left
        use:tooltip={{ children: RetireInfo, direction: 'up', lockInPlace: true }}
      >
        <Button
          class="bg-red-200 text-red-400"
          innerClass="py-1 px-2"
          onclick={() => retireCharacter(character)}
          tertiary
        >
          Retire
        </Button>
        <!-- <span class="text-xs text-gray-400">(possible until level 5)</span> -->
      </crow>
    {/if}
  </crow>
</Headline>

<crow vertical class="gap-4">
  <crow left up class="gap-4">
    <crow left vertical>
      <!-- <Headline text={character.name} /> -->

      <crow class="aspect-[11/12] w-full">
        <CharacterAvatar {...character} />
      </crow>
    </crow>

    <crow class="!flex-2" up left vertical>
      <Accordion isOpen={app.settings.showDetailedCharacterView}>
        <div>
          <crow up left class="!flex-none gap-8">
            <crow up left vertical>
              <Headline text="base stats" small />
              <!-- <div class="mb-4">
            <CoreStats {combatStats} />
          </div> -->
              <Stats
                stats={Object.entries(combatStats).filter(([key]) =>
                  ['maxHealth', 'maxArmor', 'damage'].includes(key)
                )}
              />

              <div class="h-10" />

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
            <crow up left vertical>
              <Headline text="modifiers" small />

              <Stats
                stats={Object.entries(combatStats.modifiers).filter(([key]) =>
                  ['maxHealth', 'maxArmor', 'damage', 'resistance'].includes(key)
                )}
              />

              <div class="h-4" />

              <Headline text="Resistances" small />

              <Stats
                stats={Object.entries(combatStats.limits).filter(([key]) =>
                  ['wounded', 'concussed', 'exposed'].includes(key)
                )}
              />
            </crow>
          </crow>
        </div>
      </Accordion>
      <crow vertical up left>
        <Accordion isOpen={app.settings.showDetailedCharacterView}>
          <div class="h-4" />
          <Headline text="equipment" small />
        </Accordion>
        <CharacterEquipment {character} />
      </crow>
    </crow>
  </crow>
  <div class="h-4" />
  <AbilitySelection {character} />
</crow>
