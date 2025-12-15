import type { Character } from '@/types/character';
import type { CombatStats } from '@/types/combatStats';
import type { Ability } from '@/types/ability';
import type { VFX } from '@/types/vfx';
import type { SFX } from '@/types/sfx';

export type StatusStack = {
  max: number;
  value: number;
};

export type StatusEffect = {
  ticks: number;
  value: number;
};

export type Combatant = Omit<Character, 'abilities'> & {
  id: string;
  teamIndex: number;
  animations: VFX[];
  injectedAnimations: VFX[];
  audio: SFX[];
  combatStats: Required<CombatStats>;
  eventTimestamp: number;
  eventAbility: Ability['id'];
  eventIndex: number;
  abilities: Required<Ability>[];
  abilitiesCopied: Required<Ability>[];
  damage: number;
  statuses: {
    isBlocking: boolean;
    knockedOut: number;

    isStunned: StatusEffect;
    isBleeding: StatusEffect;
    isVulnerable: StatusEffect;

    isWounded: StatusStack;
    isConcussed: StatusStack;
    isExposed: StatusStack;
  };
  position: {
    x: number;
    y: number;
    rot: number;
  };
};
