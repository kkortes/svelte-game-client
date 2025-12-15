<script lang="ts">
  import { AUDIO } from '@/app.svelte';
  import { getLevelByExperience } from '@/ts/level';
  import { untrack } from 'svelte';

  let { closeSelf } = $props();

  let sliderRef: HTMLDivElement;
  let LEVELS = Array(25)
    .fill(0)
    .map((_, i) => i + 1);

  $effect(() => {
    $state.snapshot(app.showAccountProgression);
    if (!app.showAccountProgression) return;

    sliderRef.children[app.accountRewards - 1].scrollIntoView({
      behavior: 'instant',
      block: 'nearest',
      inline: 'center'
    });
  });

  $effect(() => {
    $state.snapshot(app.showAccountProgression);
    if (!untrack(() => app.serverTimestampSnapshot)) return;

    const level = getLevelByExperience(app.experience);

    sliderRef.children[level - 1].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });
  });

  const claimReward = (level: number) => {
    if (level === getLevelByExperience(app.experience)) {
      setTimeout(() => {
        app.showAccountProgression = false;
      }, 500);
    }
    new Howl({
      src: AUDIO['Special Lootbox 13'],
      volume: app.settings.volume.master * app.settings.volume.sfx
    }).play();
    app.accountRewards += 1;
    app.coins += 100;
  };

  const rewardForLevel = (level: number) => {
    const rewards = ['100_coins', 'character_stats'];

    if (level % 5 === 0 || level === 1) {
      rewards.push('ludus_upgrade');
    }
    return rewards;
  };
</script>

<crow
  role="none"
  onclick={closeSelf}
  bind:this={sliderRef}
  left
  class="my-ludus fixed inset-0 snap-x snap-mandatory gap-20 overflow-x-scroll px-[calc(50vw-theme(spacing.52))]"
>
  {#each LEVELS as level}
    {@const accountLevel = getLevelByExperience(app.experience)}
    {@const claimed = level <= app.accountRewards}
    {@const disabled = level > app.accountRewards + 1 || accountLevel < level}
    {@const rewards = rewardForLevel(level)}
    <crow
      class={tw('glass !w-104 !flex-none snap-center border border-dashed !bg-white/95 p-4')}
      vertical
    >
      <h4 class="cinzel">Level {level}</h4>
      <Hr class="my-3.5" />
      <div>
        <crow vertical class="gap-4">
          <crow class="gap-8" up left>
            {#if rewards.includes('100_coins')}
              <crow up left vertical>
                <strong>Account</strong>
                <crow class="gap-1">
                  +1
                  <Coin type="silver" class="text-2xl" />
                </crow>
                {#if rewards.includes('ludus_upgrade')}
                  <span>+1&nbsp;brawler</span>
                {/if}
              </crow>
            {/if}
            {#if rewards.includes('character_stats')}
              <crow vertical up left>
                <strong>Brawlers</strong>
                <crow class="gap-1">
                  +4
                  <Icon name="maxHealth" original />
                </crow>
                <crow class="gap-1">
                  +2
                  <Icon name="damage" original />
                </crow>
              </crow>
            {/if}
          </crow>

          {#if claimed}
            <crow class="top-half absolute left-[calc(100%-theme(spacing.10))] !h-6 !flex-none">
              <Icon name="checkmark" class="text-green-400" />
            </crow>
          {:else}
            <Button
              class="absolute top-[calc(100%+theme(spacing.4))]"
              {disabled}
              big
              onclick={claimReward.bind(undefined, level)}
              primary
            >
              Claim
            </Button>
          {/if}
        </crow>
      </div>
      <crow class="mt-4 min-h-20 w-full !items-stretch">
        <crow class="-mx-4 -mb-4 rounded-b bg-yellow-500/10"> Premium rewards TBA. </crow>
      </crow>
    </crow>
  {/each}
</crow>
