<script lang="ts">
  import STATUS_EFFECTS from '@/constants/STATUS_EFFECTS';
  import type { Ability } from '@/types/ability';

  let {
    small,
    hideTickCount,
    ability,
    disabled = false
  }: { small?: boolean; hideTickCount?: boolean; ability: Ability; disabled?: boolean } = $props();

  let { icon, ticks, basic, statusEffects } = $derived(ability);
</script>

<!-- {#if !basic}
  <Icon
    class={tw('absolute text-[300px] opacity-20', small && 'text-9xl', small)}
    name={icon}
    original
  />
{/if} -->

{#if !hideTickCount}
  <crow
    class={tw(
      'ticks absolute top-full left-1/2 h-5 w-8 -translate-x-1/2 -translate-y-3/4 rounded-sm border-[0.5px] border-gray-400 bg-white',
      small && 'h-3 w-5'
    )}
  >
    <div class={tw('text-md leading-0 font-bold', small && 'text-xs')}>
      {ticks}
    </div>
  </crow>
{/if}
<crow vertical class="!grid">
  <Icon
    class={tw(
      'relative text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.3xl))] [grid-area:1/1]',
      basic && 'text-gray-400',
      small && 'text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.2xl))]',
      small && basic && 'text-[clamp(theme(fontSize.sm),3vw,theme(fontSize.xl))]',
      disabled && 'text-red-300'
      // !hideTickCount && '-translate-y-1'
    )}
    name={icon}
    original={!basic && !disabled}
  />
  <!-- <div class="fat-number text-5xl font-bold text-white [grid-area:1/1]">7</div> -->
</crow>

{#if statusEffects && statusEffects.length > 0}
  <crow class={tw('absolute bottom-1 left-1', small && 'bottom-px left-px')}>
    {#each statusEffects as effect}
      {@const isStatusStack = ['isConcussed', 'isWounded', 'isExposed'].includes(effect)}

      <Icon
        name={isStatusStack
          ? STATUS_EFFECTS[STATUS_EFFECTS[effect].convertsInto].icon
          : STATUS_EFFECTS[effect].icon}
        class={tw('text-md', isStatusStack && 'text-xs text-gray-400', small && 'text-[10px]')}
        original={!isStatusStack}
      />
    {/each}
  </crow>
{/if}
