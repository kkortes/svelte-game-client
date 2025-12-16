<script lang="ts">
  let chosenColorIndex = $state(0);
  let radius = 300;

  let allColors = [
    {
      name: 'cerberus',
      image: 'bg-[url(/static/images/creature/fire/cerberus.jpg)]',
      coreCreature: 'hellfolk',
      feelsLike: 'warm/chaos',
      element: 'fire',
      icon: 'fire',
      cost: undefined,
      type: 'unit',
      subtypes: ['hound', 'dweller'],
      keywords: [],
      text: '',
      colors: {
        radialFrom: 'from-red-900',
        radialVia: 'via-red-300',
        radialTo: 'to-red-600',
        regularBg: 'bg-red-600',
        darkestBg: 'bg-red-700',
        border: 'border-red-800',
        textBright: 'text-red-300'
      }
    },
    {
      name: 'bulton',
      image: 'bg-[url(/static/images/creature/earth/male-01.png)]',
      coreCreature: 'treefolk',
      feelsLike: 'solid',
      element: 'earth',
      icon: 'earth',
      cost: 4,
      type: 'unit',
      subtypes: ['mortal', 'humanoid'],
      keywords: [],
      text: '',
      colors: {
        radialFrom: 'from-brown-900',
        radialVia: 'via-brown-300',
        radialTo: 'to-brown-600',
        regularBg: 'bg-brown-600',
        darkestBg: 'bg-brown-700',
        border: 'border-brown-800',
        textBright: 'text-brown-300'
      }
    },
    {
      name: 'infernus',
      image: 'bg-[url(/static/images/creature/fire/giant.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'lava*',
      icon: 'lava',
      cost: undefined,
      type: 'unit',
      subtypes: ['elemental'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-orange-900',
        radialVia: 'via-orange-300',
        radialTo: 'to-orange-600',
        regularBg: 'bg-orange-600',
        darkestBg: 'bg-orange-700',
        border: 'border-orange-800',
        textBright: 'text-orange-300'
      }
    },
    {
      name: 'herald',
      image: 'bg-[url(/static/images/creature/lightning/herald.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'warm*',
      icon: 'light',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-amber-900',
        radialVia: 'via-amber-300',
        radialTo: 'to-amber-600',
        regularBg: 'bg-amber-600',
        darkestBg: 'bg-amber-700',
        border: 'border-amber-800',
        textBright: 'text-amber-300'
      }
    },
    {
      name: 'oskar',
      image: 'bg-[url(/static/images/creature/lightning/oskar-god-of-lightning.jpg)]',
      coreCreature: '',
      feelsLike: 'life',
      element: 'light*',
      icon: 'lightning',
      cost: undefined,
      type: 'god',
      subtypes: ['lightning'],
      keywords: [],
      text: "Yet another lightning bolt strikes the top of the mountain. A mad-man appears. He refers to himself as, 'God of Lightning.'<br /><br />“Mwhahaha, it tickles!”",
      colors: {
        radialFrom: 'from-yellow-900',
        radialVia: 'via-yellow-300',
        radialTo: 'to-yellow-600',
        regularBg: 'bg-yellow-600',
        darkestBg: 'bg-yellow-700',
        border: 'border-yellow-800',
        textBright: 'text-yellow-300'
      }
    },
    {
      name: 'dither',
      image: 'bg-[url(/static/images/creature/void/giant.jpg)]',
      coreCreature: '',
      feelsLike: 'death',
      element: 'dark*',
      icon: 'dark',
      cost: undefined,
      type: 'unit',
      subtypes: ['giant'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-gray-900',
        radialVia: 'via-gray-300',
        radialTo: 'to-gray-600',
        regularBg: 'bg-gray-600',
        darkestBg: 'bg-gray-700',
        border: 'border-gray-800',
        textBright: 'text-gray-300'
      }
    },
    {
      name: 'Steel Sword',
      image: 'bg-[url(/static/images/equipment/sword.png)]',
      coreCreature: '',
      feelsLike: '',
      element: 'physical*',
      icon: '',
      cost: undefined,
      type: 'relic',
      subtypes: ['equipment'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-stone-900',
        radialVia: 'via-stone-300',
        radialTo: 'to-stone-600',
        regularBg: 'bg-stone-600',
        darkestBg: 'bg-stone-700',
        border: 'border-stone-800',
        textBright: 'text-stone-300'
      }
    },
    {
      name: 'alora',
      image: 'bg-[url(/static/images/creature/nature/alora-goddess-of-nature.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'nature',
      icon: 'nature',
      cost: undefined,
      type: 'god',
      subtypes: ['nature'],
      keywords: [],
      text: 'A soft breeze stirs the leaves, and the forest seems to breathe. A gentle figure steps forward, smiling kindly. She is known as “Mother of Nature.”',
      colors: {
        radialFrom: 'from-lime-900',
        radialVia: 'via-lime-300',
        radialTo: 'to-lime-600',
        regularBg: 'bg-lime-600',
        darkestBg: 'bg-lime-700',
        border: 'border-lime-800',
        textBright: 'text-lime-300'
      }
    },
    {
      name: 'erat herba',
      image: 'bg-[url(/static/images/creature/nature/erat-herba.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'growth*',
      icon: 'growth',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: ['aggressive', 'swift'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-green-900',
        radialVia: 'via-green-300',
        radialTo: 'to-green-600',
        regularBg: 'bg-green-600',
        darkestBg: 'bg-green-700',
        border: 'border-green-800',
        textBright: 'text-green-300'
      }
    },
    {
      name: 'skysplitter',
      image: 'bg-[url(/static/images/creature/earth/giant.jpg)]',
      coreCreature: 'freefolk',
      feelsLike: 'free/order',
      element: 'air/wind/storm/heaven*',
      icon: 'wind',
      cost: undefined,
      type: 'unit',
      subtypes: ['giant'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-teal-900',
        radialVia: 'via-teal-300',
        radialTo: 'to-teal-600',
        regularBg: 'bg-teal-600',
        darkestBg: 'bg-teal-700',
        border: 'border-teal-800',
        textBright: 'text-teal-300'
      }
    },
    {
      name: 'yeti',
      image: 'bg-[url(/static/images/creature/frost/yeti.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'cold*',
      icon: 'frost',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-cyan-900',
        radialVia: 'via-cyan-300',
        radialTo: 'to-cyan-600',
        regularBg: 'bg-cyan-600',
        darkestBg: 'bg-cyan-700',
        border: 'border-cyan-800',
        textBright: 'text-cyan-300'
      }
    },
    {
      name: 'frigus',
      image: 'bg-[url(/static/images/creature/frost/frigus-mortis.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'ice/frost',
      icon: 'storm',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-sky-900',
        radialVia: 'via-sky-300',
        radialTo: 'to-sky-600',
        regularBg: 'bg-sky-600',
        darkestBg: 'bg-sky-700',
        border: 'border-sky-800',
        textBright: 'text-sky-300'
      }
    },
    {
      name: 'shellter',
      image: 'bg-[url(/static/images/creature/water/turtle.jpg)]',
      coreCreature: 'merfolk (purple)',
      feelsLike: 'cold',
      element: 'water',
      icon: 'water',
      cost: undefined,
      type: 'unit',
      subtypes: ['turtle'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-blue-900',
        radialVia: 'via-blue-300',
        radialTo: 'to-blue-600',
        regularBg: 'bg-blue-600',
        darkestBg: 'bg-blue-700',
        border: 'border-blue-800',
        textBright: 'text-blue-300'
      }
    },
    {
      name: 'warrus',
      image: 'bg-[url(/static/images/creature/frost/warrus.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: '*',
      icon: 'frost',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-gray-600',
        radialVia: 'via-gray-50',
        radialTo: 'to-gray-300',
        regularBg: 'bg-gray-300',
        darkestBg: 'bg-gray-400',
        border: 'border-gray-500',
        textBright: 'text-gray-50'
      }
    },
    {
      name: 'leviathan',
      image: 'bg-[url(/static/images/creature/water/leviathan.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'deep*',
      icon: 'deep',
      cost: undefined,
      type: 'unit',
      subtypes: ['beast', 'dweller'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-indigo-900',
        radialVia: 'via-indigo-300',
        radialTo: 'to-indigo-600',
        regularBg: 'bg-indigo-600',
        darkestBg: 'bg-indigo-700',
        border: 'border-indigo-800',
        textBright: 'text-indigo-300'
      }
    },
    {
      name: 'terram',
      image: 'bg-[url(/static/images/creature/void/nullius-terram.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'void',
      icon: 'void',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-violet-900',
        radialVia: 'via-violet-300',
        radialTo: 'to-violet-600',
        regularBg: 'bg-violet-600',
        darkestBg: 'bg-violet-700',
        border: 'border-violet-800',
        textBright: 'text-violet-300'
      }
    },
    {
      name: 'siphon life',
      image: 'bg-[url(/static/images/creature/void/apollyon.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'corruption*',
      icon: 'corruption',
      cost: undefined,
      type: 'spell',
      subtypes: ['void'],
      keywords: ['swift'],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-purple-900',
        radialVia: 'via-purple-300',
        radialTo: 'to-purple-600',
        regularBg: 'bg-purple-600',
        darkestBg: 'bg-purple-700',
        border: 'border-purple-800',
        textBright: 'text-purple-300'
      }
    },
    {
      name: 'demona',
      image: 'bg-[url(/static/images/creature/fire/demon.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'arcane',
      icon: 'arcane',
      cost: undefined,
      type: 'unit',
      subtypes: ['demon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-pink-900',
        radialVia: 'via-pink-300',
        radialTo: 'to-pink-600',
        regularBg: 'bg-pink-600',
        darkestBg: 'bg-pink-700',
        border: 'border-pink-800',
        textBright: 'text-pink-300'
      }
    },
    {
      name: 'mons igneus',
      image: 'bg-[url(/static/images/creature/fire/mons-igneus.jpg)]',
      coreCreature: '',
      feelsLike: '',
      element: 'blood*',
      icon: 'blood',
      cost: undefined,
      type: 'unit',
      subtypes: ['dragon'],
      keywords: [],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
      colors: {
        radialFrom: 'from-rose-900',
        radialVia: 'via-rose-300',
        radialTo: 'to-rose-600',
        regularBg: 'bg-rose-600',
        darkestBg: 'bg-rose-700',
        border: 'border-rose-800',
        textBright: 'text-rose-300'
      }
    }
  ];

  let chosenColor = $derived(allColors[chosenColorIndex]);
</script>

<!-- Unit, Gear, Spell, Rune, Legend - God (immortal)<br />

- Unit (mortal/immortal)<br />
- Relic/Equipment/gear (mortal)<br />
- "Land?" (immortal)<br />
- Spell (heal, damage, effect)<br /> -->

<crow vertical up class="h-screen pt-40">
  <crow vertical class="grid! place-items-center">
    {#each allColors as { coreCreature, feelsLike, element, colors }, i (element)}
      <crow
        onclick={() => {
          console.log({ i, element });
          chosenColorIndex = i;
        }}
        role="none"
        vertical
        class="aspect-square w-24 flex-none! gap-4 [grid-area:1/1]"
        style={`
				transform: translate(
					${Math.cos(((2 * Math.PI) / allColors.length) * i) * radius}px,
					${Math.sin(((2 * Math.PI) / allColors.length) * i) * radius}px
				);
			`}
      >
        <circle
          style={colors.regularBg.startsWith('bg-') ? '' : `background-color: ${colors.regularBg};`}
          class={tw(
            `${colors.regularBg.startsWith('bg-') ? colors.regularBg : ''} crow pointer-events-none h-full w-full flex-none! overflow-hidden rounded-full text-center`,
            colors.textBright
          )}
        >
          {element}<br />
          {feelsLike}<br />
          {coreCreature}
        </circle>
      </crow>
    {/each}

    <Card {...chosenColor} />
  </crow>

  <crow vertical left class="mt-40 w-full gap-10 text-4xl">
    <div class="font-cinzel">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-cabin">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-berkshire">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-viga">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-antonio">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-quantico">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-merienda">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-belanosima">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-averia">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-spectral">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-skranji">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-stoke">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
    <div class="font-finlandica">
      Ab Bc Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz 0 1 2 3 4 5 6 7
      8 9
    </div>
  </crow>
</crow>
