<script lang="ts">
  import Headline from '@/components/Headline.svelte';

  // import Portal from 'svelte-portal';
</script>

<Headline text="Game guide" />

<strong>Battle Brawlers</strong> is a strategy auto-battler playable in your browser.
<br /><br />
Your main objective is to upgrade your <i>Ludus</i> by obtaining experience and leveling it up.
<br /><br />
You can recruit Brawlers to fight for you. Each Brawler can be equipped with unique items and abilities.
<br /><br />
Every 5 Ludus levels, you unlock an additional Brawler slot.
<br /><br /><br />

<Headline text="Combat" small />
Combat is automatic once you start a fight.
<br /><br />
<strong>Battle Brawlers</strong> uses a <i>tick system</i>. A tick cycle is normally
<strong>12 ticks</strong>, but it can expand up to <strong>15 ticks</strong>. Each ability you place
in your <strong>Active Abilities</strong> has its own tick length, which represents how long the
ability takes to cast or remain active.
<br /><br />
Tick cycles repeat until a winner is determined.
<br /><br /><br />
<Headline text="The arena" small />
There’s a vast roster of fights available in the arena. Each fight features its own unique set of enemies
and rewards.
<br /><br />
Boss fights unlock additional content in <strong>Battle Brawlers</strong>. But be wary! Luck-based
combat stats are disabled during boss fights!

<!-- <div class="h-[3000px] w-5 bg-green-100" /> -->

<!-- <Portal target="#sticky-bottom">
  <crow class="gap-3 bg-gradient-to-t from-black to-transparent p-4" right>
    <Button tertiary onclick={() => {}}>Cancel</Button>

    <Button big bgColor="bg-red-500" onclick={() => {}}>Fight</Button>
  </crow>
</Portal> -->
