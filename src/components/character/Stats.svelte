<script lang="ts">
  import { prettyCombatStatKey, prettyCombatStatValue } from '@/types/combatStats';

  let {
    stats,
    class: classes,
    showAsAddition = false
  }: { stats: any; class?: string; showAsAddition?: boolean } = $props();
</script>

{#each stats as [key, value]}
  {@const actualKey =
    {
      wounded: 'bleeding',
      concussed: 'stunned',
      exposed: 'vulnerable'
    }?.[key as string] || key}
  {@const actualValue = prettyCombatStatValue(actualKey, value)}

  <crow class="w-full !justify-between gap-2">
    <crow left class={tw('gap-1 whitespace-nowrap', showAsAddition && '-order-1')}>
      {#if !showAsAddition}
        <crow class="w-5 !flex-none">
          <Icon name={actualKey} original class="text-lg" />
        </crow>
      {/if}
      {prettyCombatStatKey(actualKey)}
    </crow>
    <div class={tw(actualValue !== '-' && classes)}>
      {#if showAsAddition}+&nbsp;{/if}{actualValue}
    </div>
  </crow>
{/each}
