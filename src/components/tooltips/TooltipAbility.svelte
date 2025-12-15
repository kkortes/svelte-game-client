<script lang="ts">
  import STATUS_EFFECTS from '@/constants/STATUS_EFFECTS';
  import { calculateCombatStatsByCharacter } from '@/ts/utils';
  import { AbilityType, type Ability } from '@/types/ability';
  import type { Combatant } from '@/types/combatant';
  import type { CombatStats } from '@/types/combatStats';

  let props: Required<Ability> & { character: Combatant } = $derived(app.tooltip?.props);

  let { name, ticks, type, description, chainLink, character, statusEffects } = $derived(props);

  let calc = $derived(props.calc);
  let calculatedDamage = $derived(calc.damage());
  let calculatedHealing = $derived(calc.healing());
  let calculatedDuration = $derived(calc.duration());

  let combatStats = $derived(
    character
      ? character?.teamIndex !== undefined
        ? character.combatStats
        : calculateCombatStatsByCharacter(character)
      : ({} as Required<CombatStats>)
  );
</script>

<div
  class="pointer-events-none w-60 gap-1 rounded-md px-2.5 pt-1.5 pb-3 text-sm leading-[18px] text-gray-700 shadow-sm"
>
  <crow vertical left class="w-full !justify-between">
    <div class="text-lg text-black">{name}</div>
    <Hr />
  </crow>

  <crow vertical left>
    {#if type === AbilityType.WindUp}
      <div class="text-sm">
        <strong class="text-black"> Wind up: </strong>
        {ticks} tick{ticks === 1 ? '' : 's'}
      </div>
    {/if}
    {#if calculatedDuration?.result}
      {@const duration = Math.floor(calculatedDuration.result)}
      <div class="text-sm">
        <strong class="text-black"> Duration: </strong>
        {duration === Infinity ? 'variable' : `${duration} tick${duration === 1 ? '' : 's'}`}
      </div>
    {/if}

    {#if chainLink}
      <div class="text-sm">
        <strong class="text-black">Triggers each:</strong>
        {ticks / chainLink} tick{ticks / chainLink === 1 ? '' : 's'}
      </div>
    {/if}
    <!-- <pre>{JSON.stringify(calculatedDamage, null, 2)}
        </pre> -->
    {#if calculatedDamage?.result}
      <div class="text-sm">
        <strong class="text-black"> Damage: </strong>
        {Math.floor(combatStats?.damage * calculatedDamage.result)}
        ({Math.floor(calculatedDamage.result * 100)}% of total damage)
      </div>
    {/if}
    {#if name === 'Block'}
      <div class="text-sm">
        <strong class="text-black"> Block chance: </strong>
        <span class="text-green-500">100%</span>
      </div>
    {/if}
    {#if calculatedHealing?.result}
      <div class="text-sm">
        <strong class="text-black"> Heal: </strong>
        {Math.floor(combatStats?.maxHealth * calculatedHealing.result)}
        ({Math.floor(calculatedHealing.result * 100)}% of max health)
      </div>
    {/if}
  </crow>

  {#if statusEffects.length > 0}
    <div class="mt-2 text-sm">
      {#each statusEffects as statusEffect (statusEffect)}
        {@const { singleWord, icon, convertsInto } = STATUS_EFFECTS[statusEffect]}
        This ability inflicts <strong>{singleWord}</strong> ( <Icon
          class={tw('text-md inline-block -translate-y-px', convertsInto && 'text-[10px]')}
          name={icon}
          original
        /> ){#if convertsInto}
          <br />which in turn inflicts <strong>{STATUS_EFFECTS[convertsInto].singleWord}</strong>
          ( <Icon
            class="text-md inline-block -translate-y-px"
            name={STATUS_EFFECTS[convertsInto].icon}
            original
          /> ){/if}.
      {/each}
    </div>
  {/if}

  {#if description}
    <div class="mt-2 text-sm italic">
      {@html description}

      <!-- {#if statusEffects.includes('isConcussed')}
        <br /><br />This ability inflicts <strong>concussion</strong> (<Icon
          class="inline-block text-xs"
          name="isConcussed"
          original
        />) <br />which in turn inflicts <strong>stun</strong> (<Icon
          class="inline-block text-xs"
          name="isStunned"
          original
        />).
      {/if}
      {#if statusEffects.includes('isWounded')}
        <br /><br />This ability inflicts <strong>wound</strong> (<Icon
          class="inline-block text-xs"
          name="isWounded"
          original
        />) <br />which in turn inflicts <strong>bleed</strong> (<Icon
          class="inline-block text-xs"
          name="isBleeding"
          original
        />).
      {/if}
      {#if statusEffects.includes('isExposed')}
        <br /><br />This ability inflicts <strong>expose</strong> (<Icon
          class="inline-block text-xs"
          name="isExposed"
          original
        />) <br />which in turn inflicts <strong>vulnerable</strong> (<Icon
          class="inline-block text-xs"
          name="isVulnerable"
          original
        />).
      {/if} -->
    </div>
  {/if}
</div>
