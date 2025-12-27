<script lang="ts">
  import { ALL_ELEMENTS } from '@/constants/ELEMENTS';
  import { ALL_CARDS, getCardsByElement } from '@/constants/CARDS';
  import Portal from 'svelte-portal';

  let rarities = [1, 2, 3, 4];

  let selectedElements = $state(
    Object.keys(ALL_ELEMENTS).reduce((a, element) => ({ ...a, [element]: true }), {})
  );

  let selectedCardTypes = $state(
    ['god', 'unit', 'spell', 'relic'].reduce((a, cardType) => ({ ...a, [cardType]: true }), {})
  );

  let selectedRarities = $state(
    rarities.reduce((a, rarity) => ({ ...a, [`${rarity}`]: true }), {})
  );

  let allCards = $derived(
    Object.values(ALL_CARDS)
      .filter((card) => selectedCardTypes[card.type])
      .filter((card) => selectedRarities[card.rarity])
  );

  let cardsByElement = $derived(
    Object.entries(getCardsByElement(allCards)).filter(([element]) => selectedElements[element])
  );
</script>

<Portal target="#sticky-top">
  <crow class="gap-1">
    {#each Object.entries(selectedElements) as [key, element]}
      {@const tailwindColor = ALL_ELEMENTS[key]?.tailwindColor || 'gray'}
      <label class="crow vertical">
        <crow class="w-6 h-6">
          <icon
            class="text-2xl"
            style="--icon: var(--icon-{key}); color: var(--color-{tailwindColor}-400);"
          ></icon>
        </crow>
        <input type="checkbox" bind:checked={selectedElements[key]} />
      </label>
    {/each}

    <div class="w-4"></div>

    {#each Object.keys(selectedCardTypes) as cardType}
      <label class="crow vertical">
        <span class="capitalize text-sm">{cardType}</span>
        <input type="checkbox" bind:checked={selectedCardTypes[cardType]} />
      </label>
    {/each}

    <div class="w-4"></div>

    {#each rarities as rarity}
      <label class="crow vertical">
        <Shape {rarity} />
        <input type="checkbox" bind:checked={selectedRarities[rarity]} />
      </label>
    {/each}
  </crow>
</Portal>

<Portal target="#sticky-bottom">
  <crow class="bg-card w-full border-t border-border h-full">&nbsp;</crow>
</Portal>

<crow left class="gap-6 flex-wrap">
  {#each cardsByElement as [element, cards] (element)}
    {@const tailwindColor = ALL_ELEMENTS[element]?.tailwindColor || 'gray'}
    <crow class="mr-0">
      <crow class="gap-2">
        <!-- <crow
          class="w-20 rounded-full aspect-square mr-2"
          style="background-color: var(--color-{tailwindColor}-700);"
        >
          <icon
            class="text-6xl"
            style="--icon: var(--icon-{element}); color: var(--color-{tailwindColor}-300);"
          ></icon>
        </crow> -->

        {#each cards as card}
          {@const tailwindColor = ALL_ELEMENTS[card.element]?.tailwindColor || 'gray'}
          <Card {card} {tailwindColor} />
        {/each}
      </crow>
    </crow>
  {/each}
</crow>

<!-- <pre class="text-xs max-w-100">{JSON.stringify(allCards, null, 2)}</pre> -->
