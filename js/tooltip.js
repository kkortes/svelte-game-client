import ABILITIES from '/js/constants/ABILITIES.js';
import { STAT_LABELS, REGULAR_STATS } from '/js/constants/STATS.js';

export const equipmentTooltipProps = (item) => ({
  name: item.name,
  level: item.level,
  slotsIn: item.slotsIn,
  description: item.description,
  stats: Object.entries(item.combatStats || {})
    .filter(([key, value]) => STAT_LABELS[key] && value)
    .map(([key, value]) => {
      const lucky = !REGULAR_STATS.includes(key);
      return {
        label: STAT_LABELS[key],
        value: lucky ? `${Math.round(value * 100)}%` : value,
        lucky,
      };
    }),
  abilities: (item.abilities || []).map((a) => {
    const h = ABILITIES(a, true);
    return {
      id: h.id,
      name: h.name,
      ticks: h.ticks,
      icon: h.icon,
      basic: !!h.basic,
      overflow: false,
      statusEffects: h.statusEffects || [],
    };
  }),
});

export const abilityTooltipProps = (ability) => ({
  name: ability.name,
  ticks: ability.ticks,
  kind: ability.basic ? 'basic' : 'special',
  description: ability.description,
});
