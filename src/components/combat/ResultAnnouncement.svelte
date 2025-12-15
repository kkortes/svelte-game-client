<script lang="ts">
  import { AUDIO, INITIAL_COMBAT } from '@/app.svelte';
  import type { Reward } from '@/types/combat';
  import { backOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

  let { progress, rewards }: { progress: number; rewards: Reward[] } = $props();
  let interval = setInterval(() => {}, 500);
  let rewardsShown = $state(0);
  let delayTicks = 2;

  $effect(() => {
    if (progress >= 1) {
      if (rewardsShown === 0) {
        if (outcome === 'victory') {
          new Howl({
            src: AUDIO['Victory Stinger 1'],
            volume: app.settings.volume.sfx * app.settings.volume.master
          }).play();
        } else {
          new Howl({
            src: AUDIO['Stinger - Ominous Timpani'],
            volume: app.settings.volume.sfx * app.settings.volume.master
          }).play();
        }
      }
      interval = setInterval(() => {
        rewardsShown = rewardsShown + 1;
      }, 500);

      return () => {
        clearInterval(interval);
      };
    }
  });

  let winningTeam = $derived(app.combat.winningTeam);
  let outcome = $derived<'victory' | 'defeat' | 'draw'>(
    winningTeam?.index === 0 ? 'victory' : winningTeam?.index === undefined ? 'draw' : 'defeat'
  );
  let rewardsToShow = $derived(rewards.filter(({ showInUI }) => showInUI));
</script>

{#if progress >= 1}
  <crow class="w-70 [grid-area:1/1]" in:scale={{ duration: 500, delay: 500, easing: backOut }}>
    <crow vertical class="gap-4" up left>
      <VictoryOrLoss {outcome} />

      {#if outcome === 'victory'}
        <Accordion isOpen={rewardsShown > delayTicks}>
          <crow up vertical class="glass w-full p-2">
            <div class="cinzel text-2xl">rewards</div>
            <Hr />
            <crow vertical>
              {#each rewardsToShow as { type, amount }, i}
                <Accordion isOpen={rewardsShown > i + delayTicks + 1}>
                  <crow>+{amount} {type}</crow>
                </Accordion>
              {/each}
              {#each rewardsToShow as { type, amount }, i}
                <Accordion isOpen={rewardsShown <= i + delayTicks + 1}>
                  <crow class="p-0.5">
                    <Icon
                      name="stunned"
                      class="animate-spin text-xl [animation-direction:reverse]"
                    />
                  </crow>
                </Accordion>
              {/each}
            </crow>
            <Hr class="mt-3 mb-4" />
            <crow class="w-full">
              <Button
                tertiary
                onclick={() => {
                  app.experience += rewards.find(({ type }) => type === 'experience')?.amount || 0;
                  app.bossHighscore =
                    rewards.find(({ type }) => type === 'bossHighscore')?.amount ||
                    app.bossHighscore;

                  app.combat = { ...INITIAL_COMBAT };
                  app.liveTeams = [];
                  app.elapsedMilliseconds = 0;

                  app.overlay = '';
                }}
                innerClass="text-lg cinzel border overflow-hidden border-yellow-700 px-4 py-1 text-white [background:radial-gradient(ellipse_farthest-corner_at_right_bottom,_#FEDB37_0%,_#FDB931_8%,_#9f7928_30%,_#8A6E2F_40%,_transparent_80%),_radial-gradient(ellipse_farthest-corner_at_left_top,_#FFFFFF_0%,_#FFFFAC_8%,_#D1B464_25%,_#5d4a1f_62.5%,_#5d4a1f_100%)]"
              >
                claim
              </Button>
            </crow>
          </crow>
        </Accordion>
      {:else}
        <Accordion isOpen={rewardsShown > delayTicks}>
          <crow class="w-full">
            <Button
              big
              tertiary
              onclick={() => {
                app.combat = { ...INITIAL_COMBAT };
                app.liveTeams = [];
                app.elapsedMilliseconds = 0;
                app.overlay = '';
              }}
              secondary
            >
              Go back
            </Button>
          </crow>
        </Accordion>
      {/if}
    </crow>
  </crow>
{/if}
