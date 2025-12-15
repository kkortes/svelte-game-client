import { AbilityType, type Ability, type AbilityRef } from '@/types/ability';
import VFX from '@/constants/VFX';
import SFX from '@/constants/SFX';
import entity from '@/ts/entity';
import type { DynamicObject } from '@/types/common';
import { deepMerge } from '@/helpers';

export const ALL_ABILITIES = {
  stab: {
    name: 'Stab',
    type: AbilityType.WindUp,
    description: '', //"Thrust with your weapon's sharp end.",
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
    type: AbilityType.WindUp,
    description: '', //"Thrust with your weapon's sharp end.",
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
    type: AbilityType.WindUp,
    description: '', // 'Swing your weapon in a wide arc.',
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
    type: AbilityType.WindUp,
    description: '', //'Attack your opponent with a devestating slam.',
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
    type: AbilityType.WindUp,
    description: '', //'Throw a punch at your opponent.',
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
    type: AbilityType.Channeling,
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
    type: AbilityType.WindUp,
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
    type: AbilityType.WindUp,
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
    type: AbilityType.Channeling,
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
    type: AbilityType.WindUp,
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
    type: AbilityType.WindUp,
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
    type: AbilityType.Channeling,
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
    type: AbilityType.WindUp,
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
    type: AbilityType.WindUp,
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
    type: AbilityType.WindUp,
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

const scalingCalc = (ticks: number, modifier: number = 0) => {
  if (modifier === null) return;

  const maxTicks = 4;
  const mod = 1.25; //;- modifier;
  const base = ticks / maxTicks;
  const pow = +Math.pow(base, mod).toFixed(2);
  const result = +(pow * (1 + modifier)).toFixed(2);

  return { base, pow, modifier, result };
};

function damageCalc(this: Ability) {
  const ticks = this.chainLink ? this.ticks / this.chainLink : this.ticks;

  const scaled = scalingCalc(ticks, this.damageModifier);
  return scaled;
}

function healingCalc(this: Ability) {
  const ticks = this.chainLink ? this.ticks / this.chainLink : this.ticks;
  const scaled = scalingCalc(ticks, this.healingModifier);
  return scaled;
}

function durationCalc(this: Ability) {
  if (this.durationModifier === null) return;
  const ticks = this.ticks;

  return {
    result: ticks * (1 + this.durationModifier)
  };
}

// for (const ability of Object.values(ALL_ABILITIES)) {
//   Object.defineProperty(ability, 'calc', {
//     enumerable: true,
//     get() {
//       return {
//         damage: damageCalc.bind(this),
//         healing: healingCalc.bind(this)
//       };
//     }
//   });
// }

function attachCalcs(a: Ability) {
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

export default (id: string | AbilityRef, fullBody: boolean = false, meta?: DynamicObject) => {
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
  ) as Ability;

  return (fullBody ? attachCalcs(ent) : ent) as Required<Ability>;
};
