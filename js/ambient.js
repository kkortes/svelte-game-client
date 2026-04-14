let currentTrack = null;
let tracks = null;

const getVolume = () => ($.settings?.volume?.master ?? 0.5) * ($.settings?.volume?.ambient ?? 0.25);

const crossfade = (next) => {
  if (!next || currentTrack === next) return;

  const volume = getVolume();
  const prev = currentTrack;

  next.play();
  next.fade(0, volume, 2000);

  if (prev) {
    prev.fade(prev.volume(), 0, 2000);
    const handleFade = () => {
      if (prev.volume() <= 0.001) {
        prev.stop();
        prev.off('fade', handleFade);
      }
    };
    prev.on('fade', handleFade);
  }

  currentTrack = next;
};

export const init = () => {
  if (!window.Howl || !window.AUDIO) return;

  tracks = {
    arena: new window.Howl({ src: [window.AUDIO['Pure Desert Wind']], volume: 0, loop: true }),
    wilderness: new window.Howl({ src: [window.AUDIO['Summer Day In Nature']], volume: 0, loop: true })
  };

  $.on('afterUpdate', (current, prev) => {
    if (!tracks) return;

    // Update volume when settings change
    if (currentTrack && current.settings?.volume !== prev.settings?.volume) {
      currentTrack.volume(getVolume());
    }

    // Switch tracks based on game state
    const inCombat = current.combat?.duration > 0;
    const inWilderness = current.bossHighscore >= 15;

    // Pause ambient during combat (combat has its own SFX)
    if (inCombat && currentTrack) {
      currentTrack.fade(currentTrack.volume(), 0, 1000);
      return;
    }

    // Resume/switch ambient after combat
    if (!inCombat && prev.combat?.duration > 0) {
      const target = inWilderness ? tracks.wilderness : tracks.arena;
      crossfade(target);
      return;
    }

    // Initial play or wilderness transition
    if (!currentTrack && current.token) {
      crossfade(inWilderness ? tracks.wilderness : tracks.arena);
    } else if (inWilderness && currentTrack === tracks.arena) {
      crossfade(tracks.wilderness);
    } else if (!inWilderness && currentTrack === tracks.wilderness) {
      crossfade(tracks.arena);
    }
  });
};
