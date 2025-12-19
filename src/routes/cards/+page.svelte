<script lang="ts">
  import { ALL_ELEMENTS } from '@/constants/ELEMENTS';
  import { ALL_CARDS } from '@/constants/CARDS';

  let cards = $derived(Object.values(ALL_CARDS));
</script>

<crow class="flex-wrap!">
  {#each cards as card}
    {@const tailwindColor = ALL_ELEMENTS[card.element]?.tailwindColor || 'gray'}
    <Card {card} {tailwindColor} />
  {/each}
</crow>
