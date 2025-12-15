import { ABILITY_PRIORITY, COMBAT_TICK_TIME } from '@/constants/APP';
import type { CombatEvent } from '@/types/combat';
import type { Team } from '@/types/team';
import { calculateCombatStatsByCharacter, prepareCombatant, seededRandom } from '@/ts/utils';
import type { Combatant } from '@/types/combatant';
import type { VFX } from '@/types/vfx';
import type { SFX } from '@/types/sfx';
import _VFX from '@/constants/VFX';
import _SFX from '@/constants/SFX';
import { AbilityType, type Ability } from '@/types/ability';
import type { CharacterRef } from '@/types/character';
import CHARACTERS from '@/constants/CHARACTERS';
import { ALL_FIGHTS } from '@/constants/FIGHTS';

const isLucky = (chance: number, seed: string, luckDisabled: boolean) => {
  if (luckDisabled) return false;
  const random = seededRandom(0, 1, seed, 0.01);

  return random < chance;
};

export const healFull = (characters: CharacterRef[]) => {
  return characters.map((character) => {
    const combatStats = calculateCombatStatsByCharacter(CHARACTERS(character, true));

    // character.overrides.combatStats.currentHealth = combatStats.maxHealth;

    // return character;
    return {
      ...character,
      overrides: {
        ...character.overrides,
        combatStats: {
          ...character.overrides?.combatStats,
          currentHealth: combatStats.maxHealth
        }
      }
    };
  });
};

export const prepareTeams = (...teams: [CharacterRef[], CharacterRef[], ...CharacterRef[][]]) => {
  const preparedCombatants = teams.map((team, teamIndex) => {
    // Heal full for non-player teams

    const preparedTeam = (teamIndex !== 0 ? healFull(team) : team).map(
      (combatant, combatatantIndex) => {
        return prepareCombatant(
          CHARACTERS(combatant, true),
          teams.length,
          team.length,
          teamIndex,
          combatatantIndex
        );
      }
    );

    return preparedTeam;
  });

  return preparedCombatants.map((team, index) => ({
    name: `Team ${index}`,
    index,
    combatants: team
  }));
};

const moreThanOneTeamStanding = (teams: Team[]) => {
  const teamsStanding = teams.filter((team) =>
    team.combatants.some((combatant) => combatant.combatStats.currentHealth! > 0)
  );
  return teamsStanding.length > 1;
};

const bufferAnimation = (combatant: Combatant, vfx: VFX, timestamp: number) => {
  const newVFX = structuredClone(vfx);

  newVFX.start = timestamp;
  newVFX.end = timestamp + COMBAT_TICK_TIME;

  newVFX.id = crypto.randomUUID();

  combatant.animations.push(newVFX);
};

const bufferAudio = (audio: SFX[], sfx: SFX, timestamp: number) => {
  const newSFX = structuredClone(sfx);

  newSFX.id = crypto.randomUUID();
  newSFX.start = timestamp;

  audio.push(newSFX);
};

// TODO: refine this, right now it adds more animations than needed
const injectAnimation = (
  combatant: Combatant,
  target: Combatant,
  currentAbility: Ability,
  now: number,
  teams: Team[],
  events: CombatEvent[] = []
) => {
  const vfx = structuredClone(currentAbility.vfx);
  if (
    !['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'whirlwind', 'block'].includes(
      vfx.vfxName
    )
  )
    return;
  const cIndex = teams[combatant.teamIndex].combatants.findIndex(({ id }) => id === combatant.id);

  vfx.start = now - currentAbility.ticks * COMBAT_TICK_TIME;
  const lingeringTime = vfx.vfxName === 'block' ? 250 : 0;
  vfx.end = now + lingeringTime;

  vfx.id = crypto.randomUUID();
  vfx.targetX = target.position.x;
  vfx.targetY = target.position.y;
  // vfx.injected = true;

  combatant.injectedAnimations.push(vfx);

  events.forEach((event) => {
    if (event.eventTimestamp >= now - currentAbility.ticks * COMBAT_TICK_TIME) {
      event.teams[combatant.teamIndex].combatants[cIndex].animations.push(
        ...combatant.injectedAnimations
      );
    }
  });
};

const pickAbility = (
  abilities: Ability[],
  ability: Ability,
  now: number,
  startOrEnd: 'start' | 'end'
) =>
  now % abilities[abilities.length - 1].end! ===
  ability[startOrEnd]! % abilities[abilities.length - 1].end!;

const sortByAbilityPriority = (
  a: Combatant,
  b: Combatant,
  now: number,
  startOrEnd: 'start' | 'end'
) => {
  const aAbility = a.abilities.find((ability) =>
    pickAbility(a.abilities, ability as Ability, now, startOrEnd)
  ) as Ability;
  const bAbility = b.abilities.find((ability) =>
    pickAbility(b.abilities, ability as Ability, now, startOrEnd)
  ) as Ability;

  const aPriority = ABILITY_PRIORITY.indexOf(aAbility.id);
  const bPriority = ABILITY_PRIORITY.indexOf(bAbility.id);

  const normalizedAPriority = aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
  const normalizedBPriority = bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;

  if (normalizedAPriority !== normalizedBPriority) return normalizedAPriority - normalizedBPriority;

  return 0;
};

const timedAbility = (combatants: Combatant[], now: number, startOrEnd: 'start' | 'end') =>
  combatants.filter((combatant) =>
    combatant.abilities.some((ability) =>
      pickAbility(combatant.abilities, ability as Ability, now, startOrEnd)
    )
  );

const prioritySorting = (combatants: Combatant[], now: number, startOrEnd: 'start' | 'end') =>
  combatants.sort((a: Combatant, b: Combatant) => sortByAbilityPriority(a, b, now, startOrEnd));

const tickStatusEffects = (combatants: Combatant[], now: number) => {
  combatants.forEach((combatant) => {
    if (combatant.statuses.isStunned.ticks > 0) {
      // combatant.combatStats.currentHealth -= combatant.statuses.isStunned.value;
      combatant.statuses.isStunned.ticks -= 1;
    }

    if (combatant.statuses.isVulnerable.ticks > 0) {
      combatant.statuses.isVulnerable.ticks -= 1;
    } else {
      combatant.statuses.isVulnerable.value = 0;
    }

    if (combatant.statuses.isBleeding.ticks > 0) {
      const bleedDamage = combatant.statuses.isBleeding.value;
      const weakenedDamage = (1 + combatant.statuses.isVulnerable.value) * bleedDamage;
      const finalDamage = Math.floor(weakenedDamage);
      combatant.combatStats.currentHealth -= finalDamage;
      bufferAnimation(combatant, { ..._VFX.hurt, amount: finalDamage }, now);
      combatant.statuses.isBleeding.ticks -= 1;
    } else {
      combatant.statuses.isBleeding.value = 0;
    }
  });
};

export const generateCombat = (
  teams: Team[],
  seed: string = `${Math.random()}`,
  fightId?: string
) => {
  const luckDisabled = !!ALL_FIGHTS.find(({ id }) => id === fightId)?.boss;
  const events: CombatEvent[] = [];

  let now = 0;
  let tickCount = 0;

  const teamsStartState = structuredClone(teams);
  teams = structuredClone(teams);

  const audio: SFX[] = [];

  let healingEfficiency = 1;

  events.push(
    structuredClone({
      eventTimestamp: now,
      teams
    })
  );

  while (moreThanOneTeamStanding(teams)) {
    // console.info(`--- Tick ${tickCount} at ${now}ms ---`);
    const stillStandingCombatants = teams
      .flatMap((team) => team.combatants.map((combatant) => combatant))
      .filter((combatant) => combatant.combatStats.currentHealth > 0);

    tickStatusEffects(stillStandingCombatants, now);

    const combatantsStarting = timedAbility(stillStandingCombatants, now, 'start');
    const combatantsEnding = timedAbility(stillStandingCombatants, now, 'end');
    const orderedCombatantsStarting = prioritySorting(combatantsStarting, now, 'start');
    const orderedCombatantsEnding = prioritySorting(combatantsEnding, now, 'end');

    // START OF ABILITY
    // Put this there so that block actually blocks at start of ability
    orderedCombatantsStarting.forEach((combatant) => {
      const currentAbilityIndex = combatant.abilities.findIndex((ability) =>
        pickAbility(combatant.abilities, ability as Ability, now, 'start')
      );
      const currentAbility = combatant.abilities[currentAbilityIndex];

      if (currentAbility.id === 'block') {
        combatant.statuses.isBlocking = true;
      }

      combatant.damage = Math.floor(combatant.combatStats.damage * currentAbility.damage);
    });

    // END OF ABILITY
    orderedCombatantsEnding.forEach((combatant, i) => {
      const targetableCombatants = stillStandingCombatants.filter(
        ({ teamIndex }) => teamIndex !== combatant.teamIndex
      );
      const currentAbilityIndex = combatant.abilities.findIndex((ability) =>
        pickAbility(combatant.abilities, ability as Ability, now, 'end')
      );
      const currentAbility = combatant.abilities[currentAbilityIndex];

      const target =
        targetableCombatants[
          seededRandom(
            0,
            targetableCombatants.length - 1,
            `${seed}_${currentAbilityIndex}_${now}_defender`
          )
        ];

      const damage = {
        amount: 0,
        isCritical: false
      };
      const heal = {
        amount: 0
      };

      const isWindUp = currentAbility.type === AbilityType.WindUp;
      const isStunned = combatant.statuses.isStunned;
      const isBlocking = target.statuses.isBlocking;

      if (now > 0) {
        if (isStunned.value === 0) {
          injectAnimation(combatant, target, currentAbility, now, teams, events);
        }

        if (isStunned.value === 1) {
          if (isStunned.ticks === 0) {
            combatant.statuses.isStunned = {
              ticks: 0,
              value: 0
            };
          }
        } else if (isWindUp) {
          const healingAmount = Math.floor(
            combatant.combatStats.maxHealth * currentAbility.healing * healingEfficiency
          );

          const missingHealth =
            combatant.combatStats.maxHealth - combatant.combatStats.currentHealth;
          const actualHealingDone = Math.min(healingAmount, missingHealth);

          combatant.combatStats.currentHealth += actualHealingDone;

          if (actualHealingDone > 0) {
            bufferAudio(audio, _SFX.chew, now - 200);
            bufferAnimation(combatant, { ..._VFX.heal, amount: actualHealingDone }, now);
          }

          const isBlocked = isLucky(
            target.combatStats.blockChance,
            `${seed}_${tickCount}_${i}_blockChance`,
            luckDisabled
          );

          const isDodged = isLucky(
            target.combatStats.dodgeChance,
            `${seed}_${tickCount}_${i}_dodgeChance`,
            luckDisabled
          );

          if (isBlocking || isBlocked) {
            bufferAudio(audio, _SFX.block, now - 100);
            bufferAnimation(target, _VFX.attackBlocked, now);
          } else if (isDodged) {
            bufferAudio(audio, _SFX.dodge, now - 100);
            bufferAnimation(target, _VFX.attackDodged, now);
          } else {
            const isCritical = isLucky(
              combatant.combatStats.criticalChance,
              `${seed}_${tickCount}_${i}_criticalDamage`,
              luckDisabled
            );

            // console.info(
            //   isCritical,
            //   currentAbility.damage,
            //   combatant.combatStats.criticalDamage,
            //   currentAbility.damage + combatant.combatStats.criticalDamage
            // );

            const abilityDamage = combatant.combatStats.damage * currentAbility.damage;
            const weakenedDamage = abilityDamage * (1 + target.statuses.isVulnerable.value);
            const criticalDamage =
              weakenedDamage * (1 + (isCritical ? combatant.combatStats.criticalDamage : 0));
            damage.amount = Math.floor(criticalDamage);
            damage.isCritical = isCritical;

            let armorDamage = 0;
            if (target.combatStats.currentArmor > 0) {
              target.combatStats.currentArmor -= damage.amount;

              armorDamage = damage.amount;
              let overflow = 0;
              if (target.combatStats.currentArmor < 0) {
                overflow = Math.abs(target.combatStats.currentArmor);
                damage.amount = overflow;
                armorDamage -= overflow;
              } else {
                damage.amount = 0;
              }

              bufferAnimation(target, { ..._VFX.armorHurt, amount: armorDamage, isCritical }, now);
              if (overflow <= 0) {
                bufferAudio(audio, _SFX.armorHit, now - 200);
              }
            }

            target.combatStats.currentHealth -= damage.amount;

            let playAudio = false;
            if (damage.amount > 0) {
              bufferAnimation(target, { ..._VFX.hurt, ...damage }, now);
              playAudio = true;
            }

            if (currentAbility.statusEffects.includes('isExposed')) {
              target.statuses.isExposed.value += currentAbility.ticks;

              if (target.statuses.isExposed.value >= target.statuses.isExposed.max) {
                const overflow = target.statuses.isExposed.value - target.statuses.isExposed.max;
                target.statuses.isExposed.value = 0;
                target.statuses.isVulnerable = {
                  ticks: target.statuses.isVulnerable.ticks + 4 + overflow,
                  value: 0.5
                };
              }
            }

            if (currentAbility.statusEffects.includes('isConcussed')) {
              target.statuses.isConcussed.value += currentAbility.ticks;
              if (target.statuses.isConcussed.value >= target.statuses.isConcussed.max) {
                const overflow =
                  target.statuses.isConcussed.value - target.statuses.isConcussed.max;
                target.statuses.isConcussed.value = 0;
                target.statuses.isStunned = {
                  ticks: target.statuses.isStunned.value + 3 + overflow,
                  value: 1
                };
              }
            }

            if (currentAbility.statusEffects.includes('isWounded')) {
              target.statuses.isWounded.value += currentAbility.ticks;

              if (target.statuses.isWounded.value >= target.statuses.isWounded.max) {
                const tickDamage = currentAbility?.damage
                  ? combatant.combatStats.damage * currentAbility.damage * 0.3
                  : combatant.combatStats.damage * 0.2;

                const value = Math.floor(tickDamage);
                const overflow = target.statuses.isWounded.value - target.statuses.isWounded.max;
                target.statuses.isWounded.value = 0;
                target.statuses.isBleeding = {
                  ticks: target.statuses.isBleeding.value + 4 + overflow,
                  value
                };
              }
            }

            if (currentAbility.statusEffects.includes('isBleeding')) {
              const tickDamage = currentAbility?.damage
                ? combatant.combatStats.damage * currentAbility.damage * 0.3
                : combatant.combatStats.damage * 0.2;

              const value = Math.floor(tickDamage);

              target.statuses.isBleeding = {
                ticks: target.statuses.isBleeding.ticks + currentAbility.duration,
                value:
                  target.statuses.isBleeding.value > value
                    ? target.statuses.isBleeding.value
                    : value
              };
            }

            if (currentAbility.statusEffects.includes('isVulnerable')) {
              target.statuses.isVulnerable = {
                ticks: target.statuses.isVulnerable.ticks + currentAbility.duration,
                value: 0.5
              };
            }

            if (
              playAudio ||
              currentAbility.statusEffects.includes('isBleeding') ||
              currentAbility.name === 'Demoralizing Shout'
            ) {
              bufferAudio(audio, currentAbility.sfx, now - 200);
            }
          }

          if (currentAbility.id === 'harden') {
            if (combatant.combatStats.currentArmor > 0) {
              combatant.combatStats.currentArmor = combatant.combatStats.maxArmor;
            }
          }

          if (currentAbility.id === 'shieldBash') {
            target.statuses.isStunned = {
              ticks: target.statuses.isStunned.ticks + 3,
              value: 1
            };
          }

          if (currentAbility.id === 'kick') {
            // My implementation attempt
            // const targetCurrentAbility = target.abilitiesCopied.find(
            //   (ability) =>
            //     ability.start % target.abilitiesCopied[target.abilitiesCopied.length - 1].end! <=
            //       now % target.abilitiesCopied[target.abilitiesCopied.length - 1].end! &&
            //     ability.end % target.abilitiesCopied[target.abilitiesCopied.length - 1].end! >
            //       now % target.abilitiesCopied[target.abilitiesCopied.length - 1].end!
            // );
            const total = target.abilitiesCopied[target.abilitiesCopied.length - 1].end!;
            const t = ((now % total) + total) % total; // normalize now into [0,total)

            const targetCurrentAbility = target.abilitiesCopied.find((ability) => {
              const start = ability.start % total;
              const end = ability.end % total;

              if (end > start) {
                return t >= start && t < end; // normal segment
              } else if (end < start) {
                return t >= start || t < end; // wraps around
              } else {
                return true; // start === end → treat as full cycle, not zero-length
              }
            }) as Required<Ability>;

            const endTime = targetCurrentAbility.end % total;
            const remainingTime =
              endTime > t
                ? endTime - t // normal case
                : total - t + endTime; // wrapped segment case
            const ticks = remainingTime / COMBAT_TICK_TIME;

            target.statuses.isStunned = {
              ticks,
              value: 1
            };
          }
        } else if (currentAbility.id === 'block') {
          combatant.statuses.isBlocking = false;
        }
      }

      // console.table({
      //   Tick: tickCount,
      //   attacker: combatant.race,
      //   ability: currentAbility.id,
      //   damage: damage.amount,
      //   target: target.race,
      //   isBlocking,
      //   targetStatuses: target.statuses
      // });

      teams.forEach((team) =>
        team.combatants.forEach((c) => {
          if (c.combatStats.currentHealth <= 0 && !c.statuses.knockedOut) {
            c.statuses.knockedOut = now;
            c.statuses.isBleeding = { ticks: 0, value: 0 };
            c.statuses.isStunned = { ticks: 0, value: 0 };
            c.statuses.isVulnerable = { ticks: 0, value: 0 };
            c.statuses.isWounded = { max: 0, value: 0 };
            c.statuses.isConcussed = { max: 0, value: 0 };
            c.statuses.isExposed = { max: 0, value: 0 };
          }
        })
      );
    });

    events.push(
      structuredClone({
        eventTimestamp: now,
        teams
      })
    );

    if (tickCount % 12 === 0 && tickCount !== 0) {
      healingEfficiency = Math.max(0, healingEfficiency - 0.05);
    }

    now += COMBAT_TICK_TIME;
    tickCount += 1;

    // if (tickCount > 100) {
    //   console.warn('Breaking out of combat loop after 24 ticks.');
    //   break;
    // }
  }

  const duration = events[events.length - 1]?.eventTimestamp;
  const teamsEndState = events[events.length - 1].teams;
  const winningTeam = teamsEndState.find((team) =>
    team.combatants.some((combatant) => combatant.combatStats.currentHealth! > 0)
  );

  const combined = Object.values(
    audio.reduce(
      (acc, item) => {
        const key = `${item.sfxName}-${item.start}`;
        if (!acc[key]) {
          acc[key] = {
            sfxName: item.sfxName,
            start: item.start,
            duration: item.duration,
            id: item.id,
            variants: item.variants,
            count: 1
          };
        } else {
          acc[key].count += 1;
        }
        return acc;
      },
      {} as Record<string, SFX>
    )
  );

  return {
    audio: combined,
    events,
    teamsStartState,
    teamsEndState,
    duration,
    winningTeam,
    fightId
  };
};
