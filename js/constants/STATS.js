export const STAT_LABELS = {
  maxHealth: 'Health',
  maxArmor: 'Armor',
  damage: 'Damage',
  resistance: 'All resistances',
  criticalChance: 'Critical chance',
  criticalDamage: 'Critical damage',
  blockChance: 'Block chance',
  dodgeChance: 'Dodge chance',
  magicChance: 'Magic chance',
};

export const REGULAR_STATS = ['maxHealth', 'maxArmor', 'damage'];

export const LUCKY_STATS = [
  'criticalChance',
  'criticalDamage',
  'blockChance',
  'dodgeChance',
  'magicChance',
];

export const MODIFIER_STATS = [...REGULAR_STATS, 'resistance'];
