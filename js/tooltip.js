export const equipmentTooltipProps = (item) => ({
  name: item.name,
  level: item.level,
  combatStats: item.combatStats,
  slotsIn: item.slotsIn,
  description: item.description,
});

export const abilityTooltipProps = (ability) => ({
  name: ability.name,
  ticks: ability.ticks,
  kind: ability.basic ? 'basic' : 'special',
  description: ability.description,
});
