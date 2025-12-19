import entity from '@/ts/entity';
import type { DynamicObject } from '@/types/common';
import type { Card, CardRef } from '@/types/card';
import { deepMerge } from '@/helpers';
import { ALL_ELEMENTS } from '@/constants/ELEMENTS';

const DEFAULT_COST = undefined;

export const ALL_CARDS = {
  cerberus: {
    name: 'Cerberus',
    image: 'creature/fire/cerberus.jpg',
    element: 'fire',
    icon: 'fire',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['hound', 'dweller'],
    keywords: [],
    text: 'A three-headed hound from the underworld.'
  },
  bulton: {
    name: 'Bulton',
    image: 'creature/earth/male-01.png',
    element: 'earth',
    icon: 'earth',
    cost: 4,
    type: 'unit',
    subtypes: ['mortal', 'humanoid'],
    keywords: [],
    text: 'A sturdy troll warrior.'
  },
  infernus: {
    name: 'Infernus',
    image: 'creature/fire/giant.jpg',
    element: 'lava',
    icon: 'lava',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['elemental'],
    keywords: [],
    text: 'A towering giant wreathed in flames.'
  },
  herald: {
    name: 'Herald',
    image: 'creature/lightning/herald.jpg',
    element: 'warm',
    icon: 'light',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['beast'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  oskar: {
    name: 'Oskar',
    image: 'creature/lightning/oskar-god-of-lightning.jpg',
    element: 'light',
    icon: 'lightning',
    cost: DEFAULT_COST,
    type: 'god',
    subtypes: ['lightning'],
    keywords: [],
    text: "Yet another lightning bolt strikes the top of the mountain. A mad-man appears. He refers to himself as, 'God of Lightning.'<br /><br />“Mwhahaha, it tickles!”"
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  steelSword: {
    name: 'Steel Sword',
    image: 'equipment/sword.png',
    element: 'physical',
    icon: '',
    cost: undefined,
    type: 'relic',
    subtypes: ['equipment'],
    keywords: [],
    text: 'A finely crafted steel sword.'
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
    text: 'A soft breeze stirs the leaves, and the forest seems to breathe. A gentle figure steps forward, smiling kindly. She is known as “Mother of Nature.”'
  },
  eratHerba: {
    name: 'Erat Herba',
    image: 'creature/nature/erat-herba.jpg',
    element: 'growth',
    icon: 'growth',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: ['aggressive', 'swift'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  skysplitter: {
    name: 'Skysplitter',
    image: 'creature/earth/giant.jpg',
    element: 'wind',
    icon: 'wind',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['giant'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  yeti: {
    name: 'Yeti',
    image: 'creature/frost/yeti.jpg',
    element: 'cold',
    icon: 'frost',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['beast'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  frigus: {
    name: 'Frigus Mortis',
    image: 'creature/frost/frigus-mortis.jpg',
    element: 'storm',
    icon: 'storm',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  shellter: {
    name: 'Shellter',
    image: 'creature/water/turtle.jpg',
    element: 'water',
    icon: 'water',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['turtle'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  leviathan: {
    name: 'Leviathan',
    image: 'creature/water/leviathan.jpg',
    element: 'deep',
    icon: 'deep',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['beast', 'dweller'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  terram: {
    name: 'Terram',
    image: 'creature/void/nullius-terram.jpg',
    element: 'void',
    icon: 'void',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  siphonLife: {
    name: 'Siphon Life',
    image: 'creature/void/apollyon.jpg',
    element: 'corruption',
    icon: 'corruption',
    cost: DEFAULT_COST,
    type: 'spell',
    subtypes: ['void'],
    keywords: ['swift'],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  demona: {
    name: 'Demona',
    image: 'creature/fire/demon.jpg',
    element: 'arcane',
    icon: 'arcane',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['demon'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  monsIgneus: {
    name: 'Mons Igneus',
    image: 'creature/fire/mons-igneus.jpg',
    element: 'blood',
    icon: 'blood',
    cost: DEFAULT_COST,
    type: 'unit',
    subtypes: ['dragon'],
    keywords: [],
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
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
