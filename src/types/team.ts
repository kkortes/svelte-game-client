import type { Combatant } from '@/types/combatant';

export type Team = {
  name: string;
  index: number;
  combatants: Combatant[];
};
