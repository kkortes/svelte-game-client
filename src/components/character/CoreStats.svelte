<script lang="ts">
  import type { CombatStats } from '@/types/combatStats';

  let {
    combatStats,
    small = false,
    vertical = false
  }: {
    combatStats: CombatStats;
    small?: boolean;
    vertical?: boolean;
  } = $props();
</script>

<crow
  class={tw(
    '!flex-none translate-y-px gap-2 text-xl text-gray-600',
    small && 'gap-1 text-sm',
    vertical && 'gap-2'
  )}
  left
>
  <crow class={tw('gap-1', vertical && 'vertical gap-0')}>
    <Icon name="maxHealth" original />
    {combatStats?.maxHealth}
  </crow>
  {#if !vertical}
    <span class="text-gray-300">/</span>
  {/if}
  <crow class={tw('gap-1', vertical && 'vertical gap-0')}>
    <Icon name="maxArmor" original />
    {combatStats?.maxArmor}
  </crow>
  {#if !vertical}
    <span class="text-gray-300">/</span>
  {/if}
  <crow class={tw('gap-1', vertical && 'vertical gap-0')}>
    <Icon name="damage" original />
    {combatStats?.damage}
  </crow>
</crow>
