import type { Team } from '@/types/team';
import type { Combatant } from '@/types/combatant';
import type { SFX } from '@/types/sfx';

type RewardType = 'experience' | 'bossHighscore';

export type Reward = {
  type: RewardType;
  amount: number;
  showInUI: boolean;
};

export type CombatEvent = {
  eventTimestamp: number;
  // globalEventIndex: number;
  // eventIndex: number;
  // eventTaker: Combatant;
  // target: Combatant;
  teams: Team[];
  // log: {
  //   damage: {
  //     result: number;
  //   };
  // };
};

export type Combat = {
  // start: number;
  // seed: string;
  teamsStartState: Team[];
  teamsEndState: Team[];
  events: CombatEvent[];
  duration: number;
  winningTeam?: Team;
  fightId?: string;
  audio: SFX[];
};
