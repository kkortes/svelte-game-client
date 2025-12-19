export const ALL_ELEMENTS = {
  fire: {
    name: 'Fire',
    tailwindColor: 'red'
  },
  earth: {
    name: 'Earth',
    tailwindColor: 'brown'
  },
  lava: {
    name: 'Lava',
    tailwindColor: 'orange'
  },
  warm: {
    name: 'Warm',
    tailwindColor: 'amber'
  },
  light: {
    name: 'Light',
    tailwindColor: 'yellow'
  },
  dark: {
    name: 'Dark',
    tailwindColor: 'gray'
  },
  physical: {
    name: 'Physical',
    tailwindColor: 'stone'
  },
  nature: {
    name: 'Nature',
    tailwindColor: 'lime'
  },
  growth: {
    name: 'Growth',
    tailwindColor: 'green'
  },
  wind: {
    name: 'Wind',
    tailwindColor: 'teal'
  },
  cold: {
    name: 'Cold',
    tailwindColor: 'cyan'
  },
  storm: {
    name: 'Storm',
    tailwindColor: 'sky'
  },
  water: {
    name: 'Water',
    tailwindColor: 'blue'
  },
  deep: {
    name: 'Deep',
    tailwindColor: 'indigo'
  },
  void: {
    name: 'Void',
    tailwindColor: 'violet'
  },
  corruption: {
    name: 'Corruption',
    tailwindColor: 'purple'
  },
  arcane: {
    name: 'Arcane',
    tailwindColor: 'pink'
  },
  blood: {
    name: 'Blood',
    tailwindColor: 'rose'
  }
} as Record<string, any>;

// export default (id: string | CharacterRef, fullBody: boolean = false, meta?: DynamicObject) =>
//   entity(
//     ALL_ELEMENTS,
//     typeof id === 'string' ? id : id.id,
//     typeof id === 'string' ? undefined : id.uuid,
//     fullBody,
//     typeof id === 'string'
//       ? meta?.overrides
//       : meta?.overrides
//         ? deepMerge(id.overrides || {}, meta.overrides || {})
//         : id.overrides
//   ) as Character;
