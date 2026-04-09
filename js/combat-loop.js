export const init = () => {
  let animationId = null;
  let lastTimestamp = 0;
  let audioQueue = [];
  let audioPlayed = new Set();
  const shownVfx = new Set();

  const spawnFloater = (cardEl, amount, type) => {
    const el = document.createElement('combat-floater');
    el.textContent = type === 'heal' ? `+${amount}` : `-${amount}`;
    el.setAttribute('data-type', type);
    cardEl.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  };

  const checkFloaters = () => {
    const elapsed = $.elapsedMilliseconds;
    const teams = $.liveTeams;
    if (!teams?.length) return;

    teams.forEach((team, ti) => {
      team.combatants?.forEach((c, ci) => {
        if (!c.animations) return;
        c.animations.forEach(anim => {
          if (shownVfx.has(anim.id)) return;
          if (anim.start > elapsed || anim.end < elapsed) return;
          if (!['hurt', 'armorHurt', 'heal'].includes(anim.vfxName)) return;

          shownVfx.add(anim.id);
          const card = document.querySelector(`[data-combat-card="${ti}-${ci}"]`);
          if (card && anim.amount) spawnFloater(card, anim.amount, anim.vfxName);
        });
      });
    });
  };

  const flattenCombatant = (c, ti, ci) => ({
    name: c.name, damage: c.damage,
    currentHealth: c.combatStats?.currentHealth || 0,
    maxHealth: c.combatStats?.maxHealth || 0,
    currentArmor: c.combatStats?.currentArmor || 0,
    maxArmor: c.combatStats?.maxArmor || 0,
    knockedOut: !!c.statuses?.knockedOut,
    bleedTicks: c.statuses?.isBleeding?.ticks || 0,
    stunTicks: c.statuses?.isStunned?.ticks || 0,
    vulnTicks: c.statuses?.isVulnerable?.ticks || 0,
    woundedVal: c.statuses?.isWounded?.value || 0, woundedMax: c.statuses?.isWounded?.max || 0,
    concussedVal: c.statuses?.isConcussed?.value || 0, concussedMax: c.statuses?.isConcussed?.max || 0,
    exposedVal: c.statuses?.isExposed?.value || 0, exposedMax: c.statuses?.isExposed?.max || 0,
    cardId: `${ti}-${ci}`
  });

  const updateCombatDisplay = () => {
    const teams = $.liveTeams;
    if (!teams?.length) return;
    $.combatTeam0 = (teams[0]?.combatants || []).map((c, i) => flattenCombatant(c, 0, i));
    $.combatTeam1 = (teams[1]?.combatants || []).map((c, i) => flattenCombatant(c, 1, i));
  };

  const playSfx = (sfx) => {
    const variant = sfx.variants[Math.floor(Math.random() * sfx.variants.length)];
    const src = window.AUDIO?.[variant];
    if (!src || !window.Howl) return;
    new window.Howl({
      src: [src],
      volume: ($.settings?.volume?.combat || 1) * ($.settings?.volume?.master || 0.5)
    }).play();
  };

  const loop = (timestamp) => {
    if (!lastTimestamp) lastTimestamp = timestamp;

    const deltaTime = timestamp - lastTimestamp;
    $.elapsedMilliseconds += deltaTime;
    lastTimestamp = timestamp;

    // Process next event from front of queue (shifts events off as they're consumed)
    const event = $.combat.events[0];
    if (event && $.elapsedMilliseconds > event.eventTimestamp) {
      $.liveTeams = event.teams;
      $.combat.events = $.combat.events.slice(1);
      // Flatten combat display for Vibe template binding
      updateCombatDisplay();
    }

    // Play combat audio SFX as their start times are reached
    while (audioQueue.length && audioQueue[0].start <= $.elapsedMilliseconds) {
      playSfx(audioQueue.shift());
    }

    // Spawn floating damage/heal numbers
    checkFloaters();

    // Combat ended
    if ($.elapsedMilliseconds > $.combat.duration) {
      $.liveTeams = $.combat.teamsEndState;
      updateCombatDisplay();
      cancelAnimationFrame(animationId);
      animationId = null;

      // Sync character health directly (matching original InCombat behavior)
      $.characters.forEach(character => {
        const myCharacter = $.liveTeams[0]?.combatants?.find(c => c.uuid === character.uuid);
        if (myCharacter) {
          character.overrides.combatStats.currentHealth = myCharacter.combatStats.currentHealth;
        }
      });
      return;
    }

    animationId = requestAnimationFrame(loop);
  };

  const pauseCombat = () => {
    cancelAnimationFrame(animationId);
    animationId = null;
  };

  const resumeCombat = () => {
    if ($.combat.duration > 0 && $.elapsedMilliseconds < $.combat.duration) {
      lastTimestamp = 0;
      animationId = requestAnimationFrame(loop);
    }
  };

  document.addEventListener('pauseCombat', pauseCombat);
  document.addEventListener('resumeCombat', resumeCombat);

  $.on('afterUpdate', (current, prev) => {
    if (current.combat?.duration > 0 && !prev.combat?.duration && !animationId) {
      lastTimestamp = 0;
      $.elapsedMilliseconds = 0;
      // Build sorted audio queue from combat audio data
      audioQueue = [...(current.combat.audio || [])].sort((a, b) => a.start - b.start);
      audioPlayed = new Set();
      shownVfx.clear();
      // Initial display from teamsStartState
      $.liveTeams = current.combat.teamsStartState;
      updateCombatDisplay();
      animationId = requestAnimationFrame(loop);
    }
  });
};
