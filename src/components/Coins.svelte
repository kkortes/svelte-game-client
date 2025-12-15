<script lang="ts">
  import { formatCoins } from '@/ts/coin';

  let {
    class: classes = '',
    amount,
    renderAll = false
  }: {
    class?: string;
    amount: number;
    renderAll?: boolean;
  } = $props();

  let { copper, silver, gold } = $derived(formatCoins(amount));
</script>

<crow
  class={tw('left flex-row-reverse !flex-wrap gap-2 gap-y-1', renderAll && 'gap-x-0 pl-2', classes)}
>
  {#if copper > 0}
    {#if renderAll}
      {#each Array(copper).fill(0) as _, i}
        <Coin class="-ml-2" type="copper" />
      {/each}
    {:else}
      <crow class="!flex-none gap-0" left>
        {copper}×
        <Coin type="copper" />
      </crow>
    {/if}
  {/if}
  {#if silver > 0}
    {#if renderAll}
      {#each Array(silver).fill(0) as _, i}
        <Coin class="-ml-2" type="silver" />
      {/each}
    {:else}
      <crow class="!flex-none gap-0" left>
        {silver}×
        <Coin type="silver" />
      </crow>
    {/if}
  {/if}
  {#if gold > 0}
    {#if renderAll}
      {#each Array(gold).fill(0) as _, i}
        <Coin class="-ml-2" type="gold" />
      {/each}
    {:else}
      <crow class="!flex-none gap-0" left>
        {gold}×
        <Coin type="gold" />
      </crow>
    {/if}
  {/if}
</crow>
