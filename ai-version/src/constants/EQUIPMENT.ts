import type { Equipment, EquipmentRef } from '@/types/equipment';
import entity from '@/ts/entity';
import type { DynamicObject } from '@/types/common';
import { deepMerge } from '@/helpers';

const DEFAULT_COST = 100;
const DEFAULT_LEVEL = 1;

export const ALL_EQUIPMENT = {
  sword: {
    name: 'Sword',
    description: 'A simple sword.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  axe: {
    name: 'Axe',
    description: 'A simple axe.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  hammer: {
    name: 'Hammer',
    description: 'A simple hammer.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  improvedHammer: {
    name: 'Improved Hammer',
    description: 'An improved hammer.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: 3,
    combatStats: {
      damage: 10
    }
  },
  shield: {
    name: 'Shield',
    description: 'A simple shield.',
    slotsIn: 'offHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      blockChance: 0.3
    }
  },
  twoHandedAxe: {
    name: 'Great Axe',
    description: 'A mighty two-handed axe.',
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  twoHandedSpear: {
    name: 'Spear',
    description: 'A mighty two-handed spear.',
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  heavyClub: {
    name: 'Heavy Club',
    description: "A mighty two-handed club.<br />It's slammer time!",
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  club: {
    name: 'Club',
    description: 'A simple club.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  greatSword: {
    name: 'Greatsword',
    description: 'A mighty two-handed sword.',
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  bow: {
    name: 'Bow',
    description: 'A simple bow.',
    slotsIn: 'twoHand',
    cost: DEFAULT_COST * 2,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  dagger: {
    name: 'Dagger',
    description: 'A really sharp dagger.',
    slotsIn: 'oneHand',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      damage: 0
    }
  },
  giantsHeart: {
    name: "Giant's Heart",
    description: 'It still pulsates oddly enough.',
    slotsIn: 'trinket',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      maxHealth: 1,
      damage: 1,
      maxArmor: 1
    }
  },
  leatherBoots: {
    name: 'Leather Boots',
    description: 'Fine protection.',
    slotsIn: 'armor',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      maxArmor: 0
    }
  },
  ring: {
    name: 'Ring',
    description: 'A simple ring.',
    slotsIn: 'accessory',
    cost: DEFAULT_COST,
    level: DEFAULT_LEVEL,
    combatStats: {
      maxHealth: 5,
      damage: 1
    },
    abilities: []
  }
};

const applyScaling = (equipment: Equipment) => {
  // Do stuff
  return equipment;
};

export default (id: string | EquipmentRef, fullBody: boolean = false, meta?: DynamicObject) =>
  applyScaling(
    entity(
      ALL_EQUIPMENT,
      typeof id === 'string' ? id : id.id,
      typeof id === 'string' ? undefined : id.uuid,
      fullBody,
      typeof id === 'string'
        ? meta?.overrides
        : meta?.overrides
          ? deepMerge(id.overrides || {}, meta.overrides || {})
          : id.overrides
    ) as Equipment
  ) as Required<Equipment>;
