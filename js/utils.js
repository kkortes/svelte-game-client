import seedRandom from 'seedrandom';
import { COMBAT_TICK_TIME, COMBAT_RING_BASE_RADIUS } from '/js/constants/APP.js';
import EQUIPMENT from '/js/constants/EQUIPMENT.js';
import ABILITIES, { TYPE } from '/js/constants/ABILITIES.js';
import CHARACTERS from '/js/constants/CHARACTERS.js';
import { deepAdd } from '/js/helpers.js';
import { getLevelByExperience } from '/js/level.js';
import { generateCombat, prepareTeams } from '/js/combat.js';

export const runCombatSimulations = (simulationCount, allies, foes, seed, fightId) =>
  Array(simulationCount)
    .fill(0)
    .reduce((wins, _, i) => {
      if (!allies[0]) return wins;

      const combat = generateCombat(prepareTeams(allies, foes), `${seed}${i}`, fightId);

      if (combat?.winningTeam?.index === 0) return wins + 1;

      return wins;
    }, 0);

export const calculateCombatStats = (...args) => {
  const combined = args.reduce((acc, obj) => {
    for (const [key, value] of Object.entries(obj)) {
      acc[key] = (acc[key] || 0) + value;
    }
    return acc;
  }, {});
  return combined;
};

export const calculateAvailableAbilitiesByCharacter = (character) =>
  Object.entries(character.equipment).flatMap(([slot, eq]) => {
    if (!eq) return [];
    const equipment = EQUIPMENT(eq, true);

    return equipment.abilities.map((a, abilityIndex) => {
      const instanceKey = `${character.id}::${slot}::${equipment.id}::${a.id}::${abilityIndex}`;
      return {
        ...a,
        uuid: instanceKey,
      };
    });
  });

export const calculateCombatStatsByCharacter = (character) => {
  const isNPC = false;
  const characterLevel = character?.level || getLevelByExperience($.experience);
  const HEALTH_PER_LEVEL = isNPC ? 8 : 4;
  const DAMAGE_PER_LEVEL = isNPC ? 4 : 2;
  const ARMOR_PER_LEVEL = isNPC ? 2 : 0;

  const levelCombatStats = {
    maxHealth: HEALTH_PER_LEVEL * (characterLevel - 1),
    damage: DAMAGE_PER_LEVEL * (characterLevel - 1),
    maxArmor: ARMOR_PER_LEVEL * (characterLevel - 1),
  };

  const parts = [
    character.combatStats,
    levelCombatStats,
    ...Object.values(character.equipment)
      .filter((equipment) => equipment !== null)
      .map((equipment) => EQUIPMENT(equipment, true)?.combatStats ?? {}),
  ];

  return parts.reduce((acc, cur) => deepAdd(acc, cur), {});
};

export const calculateTickStart = (abilities, index) => {
  let tickStart = 0;
  for (let i = 0; i < index; i++) {
    tickStart += abilities[i]?.ticks || 0;
  }
  return tickStart;
};

export const prepareCombatant = (
  characterRef,
  teamCount,
  combatantCount,
  teamIndex,
  combatantIndex,
) => {
  const character = CHARACTERS(characterRef, true);

  const rotation = 360 / teamCount;
  const combatStats = calculateCombatStatsByCharacter(character);

  combatStats.currentArmor = combatStats.maxArmor;

  const abilitiesHydrated = character.abilities
    .map((ability) => ABILITIES(ability, true))
    .map((ability) => {
      const { calc, ...rest } = ability;

      return {
        ...rest,
        calc: undefined,
        damage: ability?.calc?.damage()?.result || 0,
        healing: ability?.calc?.healing()?.result || 0,
        duration: ability?.calc?.duration()?.result || 0,
      };
    });

  const abilitiesCut = abilitiesHydrated.filter(
    (_, i) => calculateTickStart(abilitiesHydrated, i) < character.maxTicks,
  );

  const abilitiesCopied = abilitiesCut.reduce((a, ability, i) => {
    const start = a[i - 1]?.end || 0;
    const end = start + ability.ticks * COMBAT_TICK_TIME;
    return [...a, { ...ability, start, end }];
  }, []);

  const abilities = abilitiesCut
    .reduce((a, ability) => {
      return ability?.chainLink
        ? [
            ...a,
            ...Array(ability.chainLink)
              .fill(0)
              .map((_, i) => {
                const { chainLink, ...ab } = ability;

                ab.type = TYPE.WindUp;
                ab.ticks = ability.ticks / ability.chainLink;
                if (i + 1 !== ability.chainLink) {
                  ab.chainTo = i + 1;
                }

                return ab;
              }),
          ]
        : [...a, ability];
    }, [])
    .reduce((a, ability, i) => {
      const start = a[i - 1]?.end || 0;
      const end = start + ability.ticks * COMBAT_TICK_TIME;
      return [...a, { ...ability, start, end }];
    }, []);

  const radius = COMBAT_RING_BASE_RADIUS;

  const rot =
    teamIndex * rotation +
    270 -
    rotation / 2 +
    (rotation / (combatantCount + 1)) * (combatantIndex + 1);

  const rotRadians = (rot * Math.PI) / 180;
  const position = {
    x: Math.sin(rotRadians) * radius,
    y: Math.cos(rotRadians) * radius,
    rot,
  };

  return {
    ...character,
    id: crypto.randomUUID(),
    teamIndex,
    eventTimestamp: 0,
    eventAbility: abilitiesCut[0].id,
    eventIndex: 0,
    combatStats,
    animations: [],
    injectedAnimations: [],
    audio: [],
    position,
    damage: 0,
    statuses: {
      isBlocking: false,
      knockedOut: 0,
      isStunned: {
        ticks: 0,
        value: 0,
      },
      isBleeding: {
        ticks: 0,
        value: 0,
      },
      isVulnerable: {
        ticks: 0,
        value: 0,
      },
      isWounded: {
        max: combatStats.limits.wounded,
        value: 0,
      },
      isConcussed: {
        max: combatStats.limits.concussed,
        value: 0,
      },
      isExposed: {
        max: combatStats.limits.exposed,
        value: 0,
      },
    },
    abilities,
    abilitiesCopied,
  };
};

export const random = (min, max, factor = Math.random(), step = 1) => {
  const steps = Math.round((max - min) / step);
  const index = Math.floor(factor * (steps + 1));
  const value = min + index * step;
  return Math.round(value / step) * step;
};

export const seededRandom = (min, max, string, step = 1) =>
  random(min, max, seedRandom(string)(), step);

export const colorStrength = (col, amt) => {
  let usePound = false;

  if (col[0] === '#') {
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
