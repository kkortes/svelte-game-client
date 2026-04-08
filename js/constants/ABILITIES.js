import VFX from '/js/constants/VFX.js';
import SFX from '/js/constants/SFX.js';
import entity from '/js/entity.js';
import { deepMerge } from '/js/helpers.js';

export const ALL_ABILITIES = {
  stab: {
    name: 'Stab',
    type: 'WindUp',
    description: '',
    ticks: 2,
    icon: 'stab',
    basic: true,
    statusEffects: ['isWounded'],
    vfx: VFX.basicAttackFast,
    sfx: SFX.stab,
    damageModifier: -0.05,
    healingModifier: null,
    durationModifier: null
  },
  pierce: {
    name: 'Pierce',
    type: 'WindUp',
    description: '',
    ticks: 3,
    icon: 'bowshot',
    basic: true,
    statusEffects: ['isWounded'],
    vfx: VFX.basicAttackFast,
    sfx: SFX.bowShot,
    damageModifier: -0.05,
    healingModifier: null,
    durationModifier: null
  },
  swing: {
    name: 'Swing',
    type: 'WindUp',
    description: '',
    ticks: 3,
    icon: 'slash',
    basic: true,
    statusEffects: ['isExposed'],
    vfx: VFX.basicAttackRegular,
    sfx: SFX.swing,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: null
  },
  slam: {
    name: 'Slam',
    type: 'WindUp',
    description: '',
    ticks: 4,
    icon: 'slam',
    basic: true,
    statusEffects: ['isConcussed'],
    vfx: VFX.basicAttackSlow,
    sfx: SFX.slam,
    damageModifier: 0.05,
    healingModifier: null,
    durationModifier: null
  },
  punch: {
    name: 'Punch',
    type: 'WindUp',
    description: '',
    ticks: 2,
    icon: 'punch',
    basic: true,
    statusEffects: [],
    vfx: VFX.basicAttackFast,
    sfx: SFX.punch,
    damageModifier: -0.1,
    healingModifier: null,
    durationModifier: null
  },
  block: {
    name: 'Block',
    type: 'Channeling',
    description: 'Raise your shield to block. Prevent all damage for the duration.',
    ticks: 3,
    icon: 'block',
    basic: true,
    statusEffects: [],
    vfx: VFX.block,
    sfx: SFX.stab,
    damageModifier: null,
    healingModifier: null,
    durationModifier: 0
  },
  shieldBash: {
    name: 'Shield Bash',
    type: 'WindUp',
    description: 'Lunge forward and bash your opponent with your shield.',
    ticks: 3,
    icon: 'shieldBash',
    basic: true,
    statusEffects: ['isConcussed'],
    vfx: VFX.basicAttackRegular,
    sfx: SFX.slam,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: null
  },
  kick: {
    name: 'Kick',
    type: 'WindUp',
    description: 'Kick your opponent, stunning them for the duration of their current ability.',
    ticks: 1,
    icon: 'kick',
    basic: false,
    statusEffects: ['isStunned'],
    vfx: VFX.kick,
    sfx: SFX.stab,
    damageModifier: null,
    healingModifier: null,
    durationModifier: Infinity
  },
  whirlwind: {
    name: 'Whirlwind',
    type: 'Channeling',
    description: 'Quickly spin and deal damage each tick.',
    ticks: 10,
    chainLink: 10,
    icon: 'whirlwind',
    basic: false,
    statusEffects: [],
    vfx: VFX.whirlwind,
    sfx: SFX.stab,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: 0
  },
  lacerate: {
    name: 'Lacerate',
    type: 'WindUp',
    description: 'Bleeds your opponent for 20% of your total damage.',
    ticks: 2,
    icon: 'lacerate',
    basic: false,
    statusEffects: ['isBleeding'],
    vfx: VFX.basicAttackFast,
    sfx: SFX.doubleCut,
    damageModifier: null,
    healingModifier: null,
    durationModifier: 1
  },
  demoralizingShout: {
    name: 'Demoralizing Shout',
    type: 'WindUp',
    description: 'Weakens your opponent. They take 50% more damage for the duration of the effect.',
    ticks: 2,
    icon: 'demoShout',
    basic: false,
    statusEffects: ['isVulnerable'],
    vfx: VFX.filler,
    sfx: SFX.demoralizingShout,
    damageModifier: null,
    healingModifier: null,
    durationModifier: 2
  },
  cheesyTactics: {
    name: 'Cheesy Tactics',
    type: 'Channeling',
    description: 'Restores some health.',
    ticks: 9,
    chainLink: 3,
    icon: 'cheese',
    basic: true,
    statusEffects: [],
    vfx: VFX.heal,
    sfx: SFX.chew,
    damageModifier: null,
    healingModifier: 0,
    durationModifier: 0
  },
  bite: {
    name: 'Bite',
    type: 'WindUp',
    description: 'A vicious bite.<br />',
    ticks: 2,
    icon: 'bite',
    basic: true,
    statusEffects: ['isBleeding'],
    vfx: VFX.basicAttackFast,
    sfx: SFX.stab,
    damageModifier: 0,
    healingModifier: null,
    durationModifier: 1
  },
  harden: {
    name: 'Harden',
    type: 'WindUp',
    description: "If armor isn't depleted regain all armor.",
    ticks: 1,
    icon: 'fillArmor',
    basic: true,
    statusEffects: [],
    vfx: VFX.heal,
    sfx: SFX.stab,
    damageModifier: null,
    healingModifier: null,
    durationModifier: null
  },
  playingTheVictim: {
    name: 'Playing the Victim',
    type: 'WindUp',
    description: '',
    ticks: 12,
    icon: 'cross',
    basic: true,
    statusEffects: [],
    vfx: VFX.heal,
    sfx: SFX.stab,
    damageModifier: null,
    healingModifier: null,
    durationModifier: null
  }
};

const scalingCalc = (ticks, modifier = 0) => {
  if (modifier === null) return;

  const maxTicks = 4;
  const mod = 1.25;
  const base = ticks / maxTicks;
  const pow = +Math.pow(base, mod).toFixed(2);
  const result = +(pow * (1 + modifier)).toFixed(2);

  return { base, pow, modifier, result };
};

function damageCalc() {
  const ticks = this.chainLink ? this.ticks / this.chainLink : this.ticks;

  const scaled = scalingCalc(ticks, this.damageModifier);
  return scaled;
}

function healingCalc() {
  const ticks = this.chainLink ? this.ticks / this.chainLink : this.ticks;
  const scaled = scalingCalc(ticks, this.healingModifier);
  return scaled;
}

function durationCalc() {
  if (this.durationModifier === null) return;
  const ticks = this.ticks;

  return {
    result: ticks * (1 + this.durationModifier)
  };
}

function attachCalcs(a) {
  Object.defineProperty(a, 'calc', {
    enumerable: true,
    get() {
      return {
        damage: damageCalc.bind(a),
        healing: healingCalc.bind(a),
        duration: durationCalc.bind(a)
      };
    }
  });
  return a;
}

export default (id, fullBody = false, meta) => {
  const ent = entity(
    ALL_ABILITIES,
    typeof id === 'string' ? id : id.id,
    typeof id === 'string' ? undefined : id.uuid,
    fullBody,
    typeof id === 'string'
      ? meta?.overrides
      : meta?.overrides
        ? deepMerge(id.overrides || {}, meta.overrides || {})
        : id.overrides
  );

  return fullBody ? attachCalcs(ent) : ent;
};
