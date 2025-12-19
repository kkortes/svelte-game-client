<script lang="ts">
  import { ALL_ELEMENTS } from '@/constants/ELEMENTS';

  let chosenCardIndex = $state(0);
  let radius = 300;

  let allCards = [
    {
      name: 'cerberus',
      image: 'creature/fire/cerberus.jpg',
      coreCreature: 'hellfolk',
      feelsLike: 'warm/chaos',
      element: 'fire',
      icon: 'fire',
      cost: undefined,
      type: 'unit',
      subtypes: ['hound', 'dweller'],
      keywords: [],
      text: ''
    },
    {
      name: 'bulton',
      image: 'creature/earth/male-01.png',
      coreCreature: 'treefolk',
      feelsLike: 'solid',
      element: 'earth',
      icon: 'earth',
      cost: 4,
      type: 'unit',
      subtypes: ['mortal', 'humanoid'],
      keywords: [],
      text: ''
    },
    {
      name: 'infernus',
      image: 'creature/fire/giant.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'lava',
      icon: 'lava',
      cost: undefined,
      type: 'unit',
      subtypes: ['elemental'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'herald',
      image: 'creature/lightning/herald.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'warm',
      icon: 'light',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'oskar',
      image: 'creature/lightning/oskar-god-of-lightning.jpg',
      coreCreature: '',
      feelsLike: 'life',
      element: 'light',
      icon: 'lightning',
      cost: undefined,
      type: 'god',
      subtypes: ['lightning'],
      keywords: [],
      text: "Yet another lightning bolt strikes the top of the mountain. A mad-man appears. He refers to himself as, 'God of Lightning.'<br /><br />“Mwhahaha, it tickles!”"
    },
    {
      name: 'dither',
      image: 'creature/void/giant.jpg',
      coreCreature: '',
      feelsLike: 'death',
      element: 'dark',
      icon: 'dark',
      cost: undefined,
      type: 'unit',
      subtypes: ['giant'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'Steel Sword',
      image: 'equipment/sword.png',
      coreCreature: '',
      feelsLike: '',
      element: 'physical',
      icon: '',
      cost: undefined,
      type: 'relic',
      subtypes: ['equipment'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'alora',
      image: 'creature/nature/alora-goddess-of-nature.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'nature',
      icon: 'nature',
      cost: undefined,
      type: 'god',
      subtypes: ['nature'],
      keywords: [],
      text: 'A soft breeze stirs the leaves, and the forest seems to breathe. A gentle figure steps forward, smiling kindly. She is known as “Mother of Nature.”'
    },
    {
      name: 'erat herba',
      image: 'creature/nature/erat-herba.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'growth',
      icon: 'growth',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: ['aggressive', 'swift'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'skysplitter',
      image: 'creature/earth/giant.jpg',
      coreCreature: 'freefolk',
      feelsLike: 'free/order',
      element: 'wind',
      icon: 'wind',
      cost: undefined,
      type: 'unit',
      subtypes: ['giant'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'yeti',
      image: 'creature/frost/yeti.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'cold',
      icon: 'frost',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'frigus',
      image: 'creature/frost/frigus-mortis.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'storm',
      icon: 'storm',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'shellter',
      image: 'creature/water/turtle.jpg',
      coreCreature: 'merfolk (purple)',
      feelsLike: 'cold',
      element: 'water',
      icon: 'water',
      cost: undefined,
      type: 'unit',
      subtypes: ['turtle'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'leviathan',
      image: 'creature/water/leviathan.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'deep',
      icon: 'deep',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast', 'dweller'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'terram',
      image: 'creature/void/nullius-terram.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'void',
      icon: 'void',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'siphon life',
      image: 'creature/void/apollyon.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'corruption',
      icon: 'corruption',
      cost: undefined,
      type: 'spell',
      subtypes: ['void'],
      keywords: ['swift'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'demona',
      image: 'creature/fire/demon.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'arcane',
      icon: 'arcane',
      cost: undefined,
      type: 'unit',
      subtypes: ['demon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    },
    {
      name: 'mons igneus',
      image: 'creature/fire/mons-igneus.jpg',
      coreCreature: '',
      feelsLike: '',
      element: 'blood',
      icon: 'blood',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'
    }
  ];

  let chosenCard = $derived(allCards[chosenCardIndex]);
</script>

<crow class="h-full w-full pt-40">
  <crow vertical class="grid! place-items-center">
    {#each allCards as { coreCreature, feelsLike, element, colors }, i (element)}
      {@const tailwindColor = ALL_ELEMENTS[element]?.tailwindColor || 'gray'}
      <crow
        onclick={() => {
          chosenCardIndex = i;
        }}
        role="none"
        vertical
        class="aspect-square w-24 flex-none! gap-4 [grid-area:1/1]"
        style={`
				transform: translate(
					${Math.cos(((2 * Math.PI) / allCards.length) * i) * radius}px,
					${Math.sin(((2 * Math.PI) / allCards.length) * i) * radius}px
				);
			`}
      >
        <circle
          style={`background-color: var(--color-${tailwindColor}-600);color: var(--color-${tailwindColor}-300); border-color: var(--color-${tailwindColor}-800);`}
          class={tw(
            `crow border-5 pointer-events-none h-full w-full flex-none! overflow-hidden rounded-full text-center`
          )}
        >
          {element}<br />
          {feelsLike}<br />
          {coreCreature}
        </circle>
      </crow>
    {/each}

    <Card
      card={chosenCard}
      tailwindColor={ALL_ELEMENTS[chosenCard.element]?.tailwindColor || 'gray'}
    />
  </crow>
</crow>
