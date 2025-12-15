<script lang="ts">
  import CHARACTERS from '@/constants/CHARACTERS';
  import customEvent from '@/ts/customEvent';
  import { calculateCombatStatsByCharacter } from '@/ts/utils';
  import { page } from '$app/stores';

  let expGain = $state(40);
  let activePage = $derived($page.route.id?.split('/')[1] || (!app.token ? 'start' : ''));

  const healParty = () =>
    app.characters.forEach((character) => {
      const { currentHealth, maxHealth } = calculateCombatStatsByCharacter(
        CHARACTERS(character, true)
      );
      const heal = Math.ceil(maxHealth * 0.33);
      character.overrides.combatStats.currentHealth = Math.min(currentHealth + heal, maxHealth);
    });

  const damageParty = () =>
    app.characters.forEach((character) => {
      const { currentHealth, maxHealth } = calculateCombatStatsByCharacter(
        CHARACTERS(character, true)
      );

      character.overrides.combatStats.currentHealth = currentHealth - 5;
    });

  const gainExp = () => (app.experience += expGain);
  const gain100Coins = () => (app.coins += 100);
</script>

<crow up class="glass sticky top-0">
  <crow vertical left class="gap-1 p-2">
    <Button onclick={customEvent.bind(undefined, 'pauseCombat', { nothing: 'true' })}>
      Pause combat
    </Button>
    <Button
      onclick={customEvent.bind(undefined, 'resumeCombat', { nothing: 'true' })}
      disabled={app.combat.duration === 0 || app.combat.duration <= app.elapsedMilliseconds}
    >
      Resume combat
    </Button>
    <div>
      Elapsed ms: {app.elapsedMilliseconds.toFixed(0)}
    </div>
    <div>
      Duration: {app.combat.duration}
    </div>
  </crow>
  <crow vertical left class="p-2">
    <div>
      Time sync (server): {new Date(app.serverTimestampSnapshot).toLocaleString()}
    </div>
    <div>
      Time (server): {new Date(app.serverTimestamp).toLocaleString()}
    </div>
    <crow vertical up left>
      <a
        class={tw(
          'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
          activePage === 'debug' && 'rounded-sm border-transparent bg-white text-black'
        )}
        href="/debug"
      >
        Debug
      </a>
      <a
        class={tw(
          'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
          activePage === 'ability-scaling' && 'rounded-sm border-transparent bg-white text-black'
        )}
        href="/ability-scaling"
      >
        Ability&nbsp;Scaling
      </a>
      <a
        class={tw(
          'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
          activePage === 'equipment-scaling' && 'rounded-sm border-transparent bg-white text-black'
        )}
        href="/equipment-scaling"
      >
        Equipment&nbsp;Scaling
      </a>
      <a
        class={tw(
          'border border-b-0 border-transparent px-2 py-0.5 text-gray-600',
          activePage === 'character-scaling' && 'rounded-sm border-transparent bg-white text-black'
        )}
        href="/character-scaling"
      >
        Character&nbsp;Scaling
      </a>
    </crow>
  </crow>
  <crow vertical left class="gap-1 p-2">
    <!-- <Button
      onclick={() => {
        app.characters[0].overrides.combatStats.currentHealth -= 10;
      }}
    >
      Deal 10 damage to char[0]
    </Button> -->
    <crow class="gap-1">
      <Button onclick={healParty}>Heal party</Button>
      <Button onclick={damageParty}>Damage party</Button>
    </crow>
    <crow class="gap-1">
      <Input type="number" bind:value={expGain} small />
      <Button onclick={gainExp}>Gain exp</Button>
      <Button onclick={() => (app.experience = 0)}>Reset exp</Button>
    </crow>
    <crow class="gap-1">
      <Button onclick={gain100Coins}>Gain coins</Button>
      <Button onclick={() => (app.coins = 0)}>Reset coins</Button>
    </crow>
    <crow class="gap-1">
      <Button onclick={() => (app.bossHighscore += 1)}>Increase boss level</Button>
      <Button onclick={() => (app.bossHighscore = 0)}>Reset boss level</Button>
    </crow>
    <Button onclick={() => (app.characters = [])}>Reset characters</Button>
    <Button onclick={() => (app.accountRewards = 1)}>Reset rewards</Button>
  </crow>
</crow>
