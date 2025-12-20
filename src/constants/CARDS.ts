import entity from '@/ts/entity';
import type { DynamicObject } from '@/types/common';
import type { Card, CardRef } from '@/types/card';
import { deepMerge } from '@/helpers';

export const getCardsByElement = (cards: [string, Card][]) =>
  cards.reduce(
    (a, card) => ({
      ...a,
      [card.element]: [...(a[card.element] || []), card]
    }),
    {}
  );

const DEFAULT_COST = undefined;

export const ALL_CARDS = {
  ragnar: {
    name: 'Ragnar',
    image: 'creature/fire/ragnar-god-of-fire.jpg',
    element: 'fire',
    icon: 'fire',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['fire'],
    keywords: [],
    text: '',
    rarity: 3
  },
  cerberus: {
    name: 'Cerberus',
    image: 'creature/fire/cerberus.jpg',
    element: 'fire',
    icon: 'fire',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['hound', 'dweller'],
    keywords: [],
    text: 'A three-headed hound from the underworld.',
    rarity: 2
  },
  monsIgneus: {
    name: 'Mons Igneus',
    image: 'creature/fire/mons-igneus.jpg',
    element: 'fire',
    icon: 'fire',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['flying'],
    text: '',
    rarity: 4
  },
  // infernus: {
  //   name: 'Infernus',
  //   image: 'creature/fire/giant.jpg',
  //   element: 'lava',
  //   icon: 'lava',
  //   cost: DEFAULT_COST,
  //   type: 'unit',
  //   subtypes: ['elemental'],
  //   keywords: [],
  //   text: 'A towering giant wreathed in flames.'
  // },
  oskar: {
    name: 'Oskar',
    image: 'creature/lightning/oskar-god-of-lightning.jpg',
    element: 'lightning',
    icon: 'lightning',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['lightning'],
    keywords: [],
    text: "Yet another lightning bolt strikes the top of the mountain. A mad-man appears. He refers to himself as, 'God of Lightning.'<br /><br />“Mwhahaha, it tickles!”",
    rarity: 3
  },
  lightingGiant: {
    name: 'Giant',
    image: 'creature/lightning/giant.jpg',
    element: 'lightning',
    icon: 'lightning',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['giant'],
    keywords: [],
    text: '',
    rarity: 3
  },
  ventoMico: {
    name: 'Vento Mico',
    image: 'creature/lightning/vento-mico.jpg',
    element: 'lightning',
    icon: 'lightning',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['flying', 'swift'],
    text: '',
    rarity: 4
  },
  alora: {
    name: 'Alora',
    image: 'creature/nature/alora-goddess-of-nature.jpg',
    element: 'nature',
    icon: 'nature',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['nature'],
    keywords: [],
    text: 'A soft breeze stirs the leaves, and the forest seems to breathe. A gentle figure steps forward, smiling kindly. She is known as “Mother of Nature.”',
    rarity: 3
  },
  eratHerba: {
    name: 'Erat Herba',
    image: 'creature/nature/erat-herba.jpg',
    element: 'nature',
    icon: 'nature',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['flying', 'aggressive', 'swift'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    rarity: 4
  },
  // skysplitter: {
  //   name: 'Skysplitter',
  //   image: 'creature/earth/giant.jpg',
  //   element: 'wind',
  //   icon: 'wind',
  //   cost: DEFAULT_COST,
  //   type: 'unit',
  //   subtypes: ['giant'],
  //   keywords: [],
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  // },
  // yeti: {
  //   name: 'Yeti',
  //   image: 'creature/frost/yeti.jpg',
  //   element: 'cold',
  //   icon: 'storm',
  //   cost: DEFAULT_COST,
  //   type: 'unit',
  //   subtypes: ['beast'],
  //   keywords: [],
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  // },
  kyl: {
    name: 'Kyl',
    image: 'creature/frost/kyl-god-of-frost.jpg',
    element: 'frost',
    icon: 'frost',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['frost'],
    keywords: [],
    text: '',
    rarity: 3
  },
  frigus: {
    name: 'Frigus Mortis',
    image: 'creature/frost/frigus-mortis.jpg',
    element: 'frost',
    icon: 'frost',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['flying'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    rarity: 4
  },
  // shellter: {
  //   name: 'Shellter',
  //   image: 'creature/water/turtle.jpg',
  //   element: 'water',
  //   icon: 'water',
  //   cost: DEFAULT_COST,
  //   type: 'unit',
  //   subtypes: ['turtle'],
  //   keywords: [],
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  // },
  // leviathan: {
  //   name: 'Leviathan',
  //   image: 'creature/water/leviathan.jpg',
  //   element: 'deep',
  //   icon: 'deep',
  //   cost: DEFAULT_COST,
  //   type: 'unit',
  //   subtypes: ['beast', 'dweller'],
  //   keywords: [],
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  // },
  apollyon: {
    name: 'Apollyon',
    image: 'creature/void/apollyon.jpg',
    element: 'void',
    icon: 'void',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['void'],
    keywords: [],
    text: '',
    rarity: 3
  },
  siphonLife: {
    name: 'Siphon Life',
    image: 'creature/void/drainling.jpg',
    element: 'void',
    icon: 'void',
    cost: DEFAULT_COST,
    type: 'spell',
    subtypes: ['void'],
    keywords: ['swift'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    rarity: 1
  },
  terram: {
    name: 'Nullius Terram',
    image: 'creature/void/nullius-terram.jpg',
    element: 'void',
    icon: 'void',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['flying'],
    text: '',
    rarity: 4
  },
  // demona: {
  //   name: 'Demona',
  //   image: 'creature/fire/demon.jpg',
  //   element: 'arcane',
  //   icon: 'arcane',
  //   cost: DEFAULT_COST,
  //   type: 'unit',
  //   subtypes: ['demon'],
  //   keywords: [],
  //   text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  // },
  elise: {
    name: 'Elise',
    image: 'creature/earth/elise-goddess-of-earth.jpg',
    element: 'earth',
    icon: 'earth',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['earth'],
    keywords: [],
    text: '',
    rarity: 3
  },
  armorillo: {
    name: 'Armorillo',
    image: 'creature/earth/armorillo.jpg',
    element: 'earth',
    icon: 'earth',
    cost: 2,
    type: 'unit',
    subtypes: ['armorillo'],
    keywords: [],
    text: '',
    rarity: 1
  },
  earthGiant: {
    name: 'Giant',
    image: 'creature/earth/giant.jpg',
    element: 'earth',
    icon: 'earth',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['giant'],
    keywords: [],
    text: '',
    rarity: 3
  },
  vitaDeserto: {
    name: 'Vita Deserto',
    image: 'creature/earth/vita-deserto.jpg',
    element: 'earth',
    icon: 'earth',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['flying'],
    text: '',
    rarity: 4
  },
  herald: {
    name: 'Herald',
    image: 'creature/lightning/herald.jpg',
    element: 'light',
    icon: 'light',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['beast'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    rarity: 2
  },
  ulwar: {
    name: 'Ulwar',
    image: 'creature/lightning/ulwar.jpg',
    element: 'dark',
    icon: 'dark',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['werewolf'],
    keywords: [],
    text: '',
    rarity: 2
  },
  dither: {
    name: 'Dither',
    image: 'creature/void/giant.jpg',
    element: 'dark',
    icon: 'dark',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['giant'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
    rarity: 3
  },
  bulton: {
    name: 'Bulton',
    image: 'creature/earth/male-01.png',
    element: 'physical',
    icon: 'earth',
    cost: 4,
    type: 'unit',
    subtypes: ['mortal', 'humanoid'],
    keywords: [],
    text: '',
    rarity: 1
  },
  steelSword: {
    name: 'Steel Sword',
    image: 'equipment/sword.png',
    element: 'physical',
    icon: '',
    cost: undefined,
    type: 'relic',
    subtypes: ['equipment', 'one-handed'],
    keywords: [],
    text: 'A finely crafted steel sword.',
    rarity: 1
  }
};

const applyScaling = (card: Card) => {
  // Do stuff
  return card;
};

export default (id: string | CardRef, fullBody: boolean = false, meta?: DynamicObject) =>
  applyScaling(
    entity(
      ALL_CARDS,
      typeof id === 'string' ? id : id.id,
      typeof id === 'string' ? undefined : id.uuid,
      fullBody,
      typeof id === 'string'
        ? meta?.overrides
        : meta?.overrides
          ? deepMerge(id.overrides || {}, meta.overrides || {})
          : id.overrides
    ) as Card
  ) as Required<Card>;
