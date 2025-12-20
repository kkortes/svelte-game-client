export const ALL_ELEMENTS = {
  fire: {
    name: 'Fire',
    tailwindColor: 'red'
  },
  // lava: {
  //   name: 'Lava',
  //   tailwindColor: 'orange'
  // },
  lightning: {
    name: 'Lightning',
    tailwindColor: 'yellow'
  },
  nature: {
    name: 'Nature',
    tailwindColor: 'lime'
  },
  // growth: {
  //   name: 'Growth',
  //   tailwindColor: 'green'
  // },
  // wind: {
  //   name: 'Wind',
  //   tailwindColor: 'teal'
  // },
  // cold: {
  //   name: 'Cold',
  //   tailwindColor: 'cyan'
  // },
  frost: {
    name: 'Storm',
    tailwindColor: 'sky'
  },
  // water: {
  //   name: 'Water',
  //   tailwindColor: 'blue'
  // },
  // deep: {
  //   name: 'Deep',
  //   tailwindColor: 'indigo'
  // },
  void: {
    name: 'Void',
    tailwindColor: 'violet'
  },
  // corruption: {
  //   name: 'Corruption',
  //   tailwindColor: 'purple'
  // },
  // arcane: {
  //   name: 'Arcane',
  //   tailwindColor: 'pink'
  // },
  // blood: {
  //   name: 'Blood',
  //   tailwindColor: 'rose'
  // }
  earth: {
    name: 'Earth',
    tailwindColor: 'brown'
  },
  light: {
    name: 'Light',
    tailwindColor: 'amber'
  },
  dark: {
    name: 'Dark',
    tailwindColor: 'gray'
  },
  physical: {
    name: 'Physical',
    tailwindColor: 'beige'
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
