import type { AbilityRef } from '@/types/ability';
import type { CombatStats } from '@/types/combatStats';
import type { DynamicObject } from '@/types/common';

export type EquipmentSlot = 'mainHand' | 'offHand' | 'armor' | 'accessory' | 'trinket';
export type EquipmentType = EquipmentSlot | 'oneHand' | 'twoHand';

export type EquipmentRef = {
  uuid?: string;
  id: string;
  overrides?: DynamicObject;
};

export type Equipment = EquipmentRef & {
  name: string;
  slotsIn: Required<EquipmentType>;
  cost: number;
  level: number;
  description: string;
  combatStats: CombatStats;
  abilities: AbilityRef[];
};

export type CharacterEquipment = {
  mainHand: EquipmentRef | null;
  offHand: EquipmentRef | null;
  armor: EquipmentRef | null;
  accessory: EquipmentRef | null;
  trinket: EquipmentRef | null;
};
