export const init = () => {
  let animationId = null;
  let lastTimestamp = 0;

  const tick = (timestamp) => {
    if (!$.combat.duration) {
      animationId = null;
      return;
    }

    if (!lastTimestamp) lastTimestamp = timestamp;
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    if ($.elapsedMilliseconds < $.combat.duration) {
      $.elapsedMilliseconds += delta;

      const events = $.combat.events;
      const currentEvent = events.findLast(e => e.eventTimestamp <= $.elapsedMilliseconds);
      if (currentEvent) $.liveTeams = currentEvent.teams;
    }

    animationId = requestAnimationFrame(tick);
  };

  $.on('afterUpdate', (current, prev) => {
    if (current.combat?.duration > 0 && !animationId) {
      lastTimestamp = 0;
      $.elapsedMilliseconds = 0;
      animationId = requestAnimationFrame(tick);
    }
  });
};
