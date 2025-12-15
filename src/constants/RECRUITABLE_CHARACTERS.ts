import ABILITIES from '@/constants/ABILITIES';
import EQUIPMENT from '@/constants/EQUIPMENT';
import CHARACTERS, { DEFAULT_EQUIPMENT } from '@/constants/CHARACTERS';

const DEFAULT_ABILITIES = [
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch'),
  ABILITIES('punch')
];

export const RECRUITABLE_CHARACTERS = [
  CHARACTERS('elfMale', false, {
    overrides: {
      name: 'Elon',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('bow', false, {
          overrides: {
            name: 'Basic Bow',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('pierce', false, {
                overrides: { name: 'Basic Pierce', statusEffects: [] }
              }),
              ABILITIES('pierce', false, {
                overrides: { name: 'Basic Pierce', statusEffects: [] }
              }),
              ABILITIES('pierce', false, {
                overrides: { name: 'Basic Pierce', statusEffects: [] }
              }),
              ABILITIES('pierce', false, { overrides: { name: 'Basic Pierce', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('elfFemale', false, {
    overrides: {
      name: 'Evyn',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('sword', false, {
          overrides: {
            name: 'Basic Sword',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, {
                overrides: { name: 'Basic Swing', statusEffects: [] }
              }),
              ABILITIES('swing', false, {
                overrides: { name: 'Basic Swing', statusEffects: [] }
              })
            ]
          }
        }),
        offHand: EQUIPMENT('sword', false, {
          overrides: {
            name: 'Basic Sword',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('trollMale', false, {
    overrides: {
      name: 'Throk',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('heavyClub', false, {
          overrides: {
            name: 'Basic Heavy Club',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('slam', false, { overrides: { name: 'Basic Slam', statusEffects: [] } }),
              ABILITIES('slam', false, { overrides: { name: 'Basic Slam', statusEffects: [] } }),
              ABILITIES('slam', false, { overrides: { name: 'Basic Slam', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('trollFemale', false, {
    overrides: {
      name: 'Tabam',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('club', false, {
          overrides: {
            name: 'Basic Club',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              }),
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              })
            ]
          }
        }),
        offHand: EQUIPMENT('club', false, {
          overrides: {
            name: 'Basic Club',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              }),
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('goblinMale', false, {
    overrides: {
      name: 'Grish',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('dagger', false, {
          overrides: {
            name: 'Basic Dagger',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } })
            ]
          }
        }),
        offHand: EQUIPMENT('dagger', false, {
          overrides: {
            name: 'Basic Dagger',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } }),
              ABILITIES('stab', false, { overrides: { name: 'Basic Stab', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('goblinFemale', false, {
    overrides: {
      name: 'Gling',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('twoHandedSpear', false, {
          overrides: {
            name: 'Basic Spear',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('stab', false, {
                overrides: { name: 'Basic Stab', ticks: 4, statusEffects: [] }
              }),
              ABILITIES('stab', false, {
                overrides: { name: 'Basic Stab', ticks: 4, statusEffects: [] }
              }),
              ABILITIES('stab', false, {
                overrides: { name: 'Basic Stab', ticks: 4, statusEffects: [] }
              })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('humanMale', false, {
    overrides: {
      name: 'Hans',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('axe', false, {
          overrides: {
            name: 'Basic Axe',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        }),
        offHand: EQUIPMENT('axe', false, {
          overrides: {
            name: 'Basic Axe',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('humanFemale', false, {
    overrides: {
      name: 'Helena',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('sword', false, {
          overrides: {
            name: 'Basic Sword',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } }),
              ABILITIES('swing', false, { overrides: { name: 'Basic Swing', statusEffects: [] } })
            ]
          }
        }),
        offHand: EQUIPMENT('shield', false, {
          overrides: {
            name: 'Basic Shield',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('block'),
              ABILITIES('shieldBash', false, {
                overrides: { name: 'Basic Shield Bash', statusEffects: [] }
              })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('dwarfMale', false, {
    overrides: {
      name: 'Dürak',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('hammer', false, {
          overrides: {
            name: 'Basic Hammer',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              }),
              ABILITIES('slam', false, {
                overrides: { name: 'Basic Slam', ticks: 3, statusEffects: [] }
              })
            ]
          }
        }),
        offHand: EQUIPMENT('shield', false, {
          overrides: {
            name: 'Basic Shield',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('block'),
              ABILITIES('shieldBash', false, {
                overrides: { name: 'Basic Shield Bash', statusEffects: [] }
              })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  }),
  CHARACTERS('dwarfFemale', false, {
    overrides: {
      name: 'Denea',
      equipment: {
        ...DEFAULT_EQUIPMENT,
        mainHand: EQUIPMENT('twoHandedAxe', false, {
          overrides: {
            name: 'Basic Great Axe',
            cost: 0,
            level: 1,
            abilities: [
              ABILITIES('swing', false, {
                overrides: { name: 'Basic Swing', ticks: 4, statusEffects: [] }
              }),
              ABILITIES('swing', false, {
                overrides: { name: 'Basic Swing', ticks: 4, statusEffects: [] }
              }),
              ABILITIES('swing', false, {
                overrides: { name: 'Basic Swing', ticks: 4, statusEffects: [] }
              })
            ]
          }
        })
      },
      abilities: DEFAULT_ABILITIES,
      combatStats: { currentHealth: 24 }
    }
  })
];
