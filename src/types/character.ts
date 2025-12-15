import type { CharacterKey } from '@/constants/CHARACTERS';
import type { AbilityRef } from '@/types/ability';
import type { CombatStats } from '@/types/combatStats';
import type { CharacterEquipment } from '@/types/equipment';
// import type { DynamicObject } from '@/types/common';

export type Race = 'elf' | 'human' | 'troll' | 'dwarf' | 'goblin';

export type CharacterRef = {
  uuid?: string;
  id: string;
  overrides: {
    abilities: AbilityRef[];
    equipment: CharacterEquipment;
    combatStats: CombatStats;
  };
};

export type Character = CharacterRef & {
  name: string;
  description: string;
  race: CharacterKey;
  level: number;
  image: string;
  size: number;
  equipment: CharacterEquipment;
  abilities: AbilityRef[];
  maxTicks: number;
  element: string;
  combatStats?: Required<CombatStats>;
};
