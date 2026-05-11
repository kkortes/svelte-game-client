import { COMBAT_TICK_TIME } from '/js/constants/APP.js';
import STATUS_EFFECTS from '/js/constants/STATUS_EFFECTS.js';

const getGeometry = (n) => ({
  scale: 1 / (1 + Math.log2(Math.max(1, n / 8))),
});

// Compute enriched per-combatant render props from the raw liveTeams shape.
const enrichCombatant = (c, ti, ci, elapsed, scale) => {
  const pos = c.position || { x: 0, y: 0, rot: 0 };
  const { x, y, rot } = pos;

  const raw = Math.round(Math.abs(Math.abs(rot - 540) - 180));
  const z = 10 - Math.floor((raw / 180) * 9);
  const angleDiff = ((rot - 0 + 540) % 360) - 180;
  const facingRight = angleDiff < 0;

  const abilitiesCopied = c.abilitiesCopied || [];
  const totalTime =
    (c.abilities || []).reduce((acc, a) => acc + (a.ticks || 0), 0) * COMBAT_TICK_TIME || 1;
  const individualProgress =
    ((c.statuses?.knockedOut ? c.statuses.knockedOut : elapsed) / totalTime) % 1;

  const anims = c.animations || [];
  const activeByName = (name) =>
    anims.find((a) => a.start < elapsed && a.end > elapsed && a.vfxName === name);

  const attackAnim = anims.find(
    (a) =>
      a.start < elapsed &&
      a.end > elapsed &&
      ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'whirlwind'].includes(a.vfxName),
  );

  // Compute attack start/end points (for sprite charge animation)
  const tx = attackAnim?.targetX ?? x;
  const ty = attackAnim?.targetY ?? y;
  const dX = tx - x,
    dY = ty - y;
  const distance = Math.hypot(dX, dY) || 1;
  const ux = dX / distance,
    uy = dY / distance;
  let anticipate = 0;
  if (attackAnim?.vfxName === 'basicAttackSlow') anticipate = 50;
  if (attackAnim?.vfxName === 'basicAttackRegular') anticipate = 30;
  if (attackAnim?.vfxName === 'basicAttackFast') anticipate = 10;
  const attackStartX = x - ux * anticipate;
  const attackStartY = y - uy * anticipate;
  const step = Math.min(5, distance);
  const attackEndX = x + ux * step;
  const attackEndY = y + uy * step;
  const attackDuration = (attackAnim?.end || 0) - (attackAnim?.start || 0);

  const isStunned = (c.statuses?.isStunned?.ticks || 0) > 0;

  // Single active attack animation class (gated by not-stunned)
  const attackClass = !isStunned && attackAnim ? attackAnim.vfxName : '';
  const attackAnimationName = attackClass ? `bb-${attackClass}` : 'none';
  const attackAnimationDuration = attackClass === 'whirlwind' ? '500ms' : `${attackDuration}ms`;
  const hurtActive = !!activeByName('hurt');
  const blockActive = !!activeByName('block');
  const attackBlockedActive = !!activeByName('attackBlocked');
  const whirlwindActive = !!activeByName('whirlwind');
  const attackDodgedActive = !!activeByName('attackDodged');

  // Health-bar floaters — collect all active hurt/armorHurt/heal animations.
  const floaters = anims
    .filter(
      (a) =>
        a.start < elapsed && a.end > elapsed && ['hurt', 'armorHurt', 'heal'].includes(a.vfxName),
    )
    .map((a) => ({
      id: a.id,
      vfxName: a.vfxName,
      amount: a.amount || 0,
      isCritical: !!a.isCritical,
      random: (parseInt((a.id || '0').slice(0, 8), 16) % 1000) / 1000, // stable pseudo-random from id
      dir: facingRight ? -1 : 1,
    }));

  const statusEffects = ['isBleeding', 'isStunned', 'isVulnerable']
    .map((k) => ({
      key: STATUS_EFFECTS[k].icon,
      text: STATUS_EFFECTS[k].text,
      animation: STATUS_EFFECTS[k].animation,
      ticks: c.statuses?.[k]?.ticks || 0,
    }))
    .filter((s) => s.ticks > 0)
    .sort((a, b) => a.ticks - b.ticks);

  const statusStacks = ['isWounded', 'isConcussed', 'isExposed']
    .map((k) => ({
      key: STATUS_EFFECTS[k].icon,
      text: STATUS_EFFECTS[k].text,
      animation: STATUS_EFFECTS[k].animation,
      value: c.statuses?.[k]?.value || 0,
      max: c.statuses?.[k]?.max || 0,
    }))
    .filter((s) => s.value > 0 && s.max > 0)
    .sort((a, b) => b.value - a.value);

  // Flatten ability cells (for ability bar). Each cell: width px = 12 * ticks.
  const abilityCells = abilitiesCopied.map((a, i) => ({
    idx: i,
    icon: a.icon || 'claw',
    ticks: a.ticks || 1,
    width: 12 * (a.ticks || 1),
    chainLink: a.chainLink || 0,
  }));
  const abilityBarWidth = abilityCells.reduce((acc, a) => acc + a.width, 0) + 2;

  // Knocked-out: filter grayscale
  const knockedOut = !!c.statuses?.knockedOut;

  // Precompute image URL (main is `/images/races/{image}`, here `/static/images/races/{image}`)
  const imageUrl = c.image ? `/static/images/races/${c.image}` : '';

  const size = c.size || 1;
  const spriteHeight = 144 * size;

  return {
    cardId: `${ti}-${ci}`,
    id: c.id || `${ti}-${ci}`,
    name: c.name,
    damage: c.damage || 0,
    currentHealth: c.combatStats?.currentHealth || 0,
    maxHealth: c.combatStats?.maxHealth || 0,
    currentArmor: c.combatStats?.currentArmor || 0,
    maxArmor: c.combatStats?.maxArmor || 0,
    knockedOut,
    isStunned,
    facingRight,
    x,
    y,
    z,
    rot,
    scale,
    // Sprite offsets / vars for position transform
    spriteHeight,
    attackClass,
    attackAnimationName,
    attackAnimationDuration,
    attackStartX,
    attackStartY,
    attackEndX,
    attackEndY,
    attackDuration,
    dir: facingRight ? 1 : -1,
    attackAnimId: attackAnim?.id || '',
    hurtActive,
    blockActive,
    attackBlocked: attackBlockedActive,
    whirlwindActive,
    attackDodgedActive,
    floaters,
    statusEffects,
    statusStacks,
    abilityCells,
    abilityBarWidth,
    individualProgress,
    image: c.image || '',
    imageUrl,
    uuid: c.uuid,
  };
};

export const init = () => {
  let animationId = null;
  let lastTimestamp = 0;
  let audioQueue = [];
  const retriggered = new Map(); // cardId -> last animId seen

  const updateCombatDisplay = () => {
    const teams = $.liveTeams;
    if (!teams?.length) return;

    const totalCombatants = teams.reduce((a, t) => a + (t.combatants?.length || 0), 0);
    const { scale } = getGeometry(totalCombatants);

    const elapsed = $.elapsedMilliseconds;

    const cards = teams.flatMap(
      (team, ti) =>
        team.combatants?.map((c, ci) => enrichCombatant(c, ti, ci, elapsed, scale)) || [],
    );

    $.combatCards = cards;

    // Retrigger attack animation by toggling animation-name via a DOM tickle.
    // Walk through enriched combatants and compare attackAnimId to what we last set.
    cards.forEach((c, idx) => {
      const last = retriggered.get(c.cardId);
      if (c.attackAnimId && c.attackAnimId !== last) {
        retriggered.set(c.cardId, c.attackAnimId);
        window.retriggerCombatantAnim?.(idx);
      } else if (!c.attackAnimId && last) {
        retriggered.set(c.cardId, '');
      }
    });
  };

  window.retriggerCombatantAnim = (idx) => {
    const el = document.querySelectorAll('combatant-sprite')[idx];
    if (!el) return;
    // Vibe's hydrate does setAttribute('style', ...) every flush, wiping any inline
    // animation-name we set. Force a reflow so the browser commits the 'none' state
    // synchronously — then clearing it makes the CSS animation restart fresh before
    // Vibe's next microtask-flush replaces the style attribute.
    el.style.animationName = 'none';
    void el.offsetWidth;
    el.style.animationName = '';
  };

  const playSfx = (sfx) => {
    const variant = sfx.variants?.[Math.floor(Math.random() * sfx.variants.length)];
    const src = window.AUDIO?.[variant];
    if (!src || !window.Howl) return;
    try {
      new window.Howl({
        src: [src],
        volume: ($.settings?.volume?.combat ?? 1) * ($.settings?.volume?.master ?? 0.5),
      }).play();
    } catch {}
  };

  const loop = (timestamp) => {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const deltaTime = timestamp - lastTimestamp;
    $.elapsedMilliseconds += deltaTime;
    lastTimestamp = timestamp;

    const event = $.combat.events[0];
    if (event && $.elapsedMilliseconds > event.eventTimestamp) {
      $.liveTeams = event.teams;
      $.combat.events = $.combat.events.slice(1);
    }

    while (audioQueue.length && audioQueue[0].start <= $.elapsedMilliseconds) {
      playSfx(audioQueue.shift());
    }

    // Re-enrich every tick (cheap, keeps anim state fresh)
    updateCombatDisplay();

    if ($.elapsedMilliseconds > $.combat.duration) {
      $.liveTeams = $.combat.teamsEndState;
      updateCombatDisplay();
      cancelAnimationFrame(animationId);
      animationId = null;

      $.characters.forEach((character) => {
        const myCharacter = $.liveTeams[0]?.combatants?.find((c) => c.uuid === character.uuid);
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
      audioQueue = [...(current.combat.audio || [])].sort((a, b) => a.start - b.start);
      retriggered.clear();
      $.liveTeams = current.combat.teamsStartState;
      updateCombatDisplay();
      animationId = requestAnimationFrame(loop);
      return;
    }

    if (
      !animationId &&
      !current.combat?.duration &&
      current.combat?.teamsStartState !== prev.combat?.teamsStartState
    ) {
      $.elapsedMilliseconds = 0;
      $.liveTeams = current.combat?.teamsStartState || [];
      updateCombatDisplay();
    }
  });
};
