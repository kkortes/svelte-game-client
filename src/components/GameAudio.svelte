<script lang="ts">
  import { AUDIO } from '@/app.svelte';
  import { untrack } from 'svelte';

  type CustomHowl = Howl & { _src?: string };

  let currentTrack: CustomHowl | undefined = $state();

  let tracks: Record<string, CustomHowl> = {
    ambientArena: new Howl({
      src: AUDIO['Pure Desert Wind'],
      volume: 0,
      loop: true
    })
  };

  $effect(() => {
    $state.snapshot(app.settings.volume);

    untrack(() => {
      currentTrack?.volume(app.settings.volume.master * app.settings.volume.ambient);
    });
  });

  $effect(() => {
    untrack(() => {
      let trackToPlay = 'ambientArena';

      const volume = app.settings.volume.master * app.settings.volume.ambient;
      const prevTrack = currentTrack;
      const nextTrack = tracks[trackToPlay];

      if (prevTrack?._src === nextTrack._src) return;

      nextTrack.play();
      nextTrack.fade(0, volume, 2000);

      if (prevTrack) {
        prevTrack.fade(prevTrack.volume(), 0, 2000);

        const handleFade = () => {
          if (prevTrack.volume() <= 0.001) {
            prevTrack.stop();
            prevTrack.off('fade', handleFade);
          }
        };
        prevTrack.on('fade', handleFade);
      }

      currentTrack = nextTrack;
    });
  });

  onDestroy(() => {
    currentTrack?.stop();
  });
</script>
