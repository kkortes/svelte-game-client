<script lang="ts">
  import { AUDIO } from '@/app.svelte';
  import { correctHealth } from '@/ts/equipment';
  import { getLevelByExperience } from '@/ts/level';

  let previousLevel: number | null = $state(null);

  const closeSelf = ({ target }: any) => {
    if (target.classList.contains('my-ludus')) {
      app.showAccountProgression = false;
    }
  };
  const close = () => (app.dialog = undefined);

  $effect(() => {
    if (!app.serverTimestampSnapshot) return;

    let currentLevel = getLevelByExperience(app.experience);

    if (previousLevel !== null && currentLevel > previousLevel) {
      app.showAccountProgression = true;
      app.characters.map((character) => correctHealth(character));
      new Howl({
        src: AUDIO['Fire & Shimmer'],
        volume: app.settings.volume.sfx * app.settings.volume.master
      }).play();
    }

    previousLevel = currentLevel;
  });
</script>

<button
  class={tw(
    'xs:grid-rows-[theme(spacing.8)_1fr_theme(spacing.8)] dialog pointer-events-none fixed inset-0 z-10 grid h-full scale-120 grid-rows-[theme(spacing.20)_1fr_theme(spacing.20)] place-items-center overflow-x-hidden overflow-y-auto border-0 bg-black/10 opacity-0 shadow-[inset_0_0px_10vw_rgba(0,0,0,0.5)] backdrop-blur-[1px] transition-all delay-75 duration-200 outline-none',
    app.showAccountProgression && 'pointer-events-auto scale-100 opacity-100'
  )}
>
  <div></div>
  <div
    class="xs:min-w-[calc(100%-theme(spacing.20))] xs:max-w-[calc(100%-theme(spacing.8))] relative w-[20rem] max-w-[calc(100%-theme(spacing.24))] text-left"
  >
    <MyLudus {closeSelf} />
  </div>
  <div></div>
</button>
