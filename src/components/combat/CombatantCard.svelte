<script lang="ts">
  import type { Combatant, StatusStack, StatusEffect } from '@/types/combatant';
  import STATUS_EFFECTS from '@/constants/STATUS_EFFECTS';
  import { flip } from 'svelte/animate';

  let props: Combatant & {
    facingRight: boolean;
    elapsedMilliseconds: number;
    progress: number;
    z: number;
    scale: number;
  } = $props();

  let { name, id } = props;

  let combatStats = $derived(props.combatStats);
  let damage = $derived(props.damage);

  let position = $derived(props.position);
  let z = $derived(props.z);
  let x = $derived(position.x);
  let y = $derived(position.y);
  let statuses = $derived(props.statuses);
  // @ts-expect-error
  let statusStacks: [string, StatusStack][] = $derived(Object.entries(statuses).filter(([_, { max, value }]) => max && value)); // prettier-ignore

  // @ts-expect-error
  let statusEffects: [string, StatusEffect][] = $derived(Object.entries(statuses).filter(([_, { ticks }]) => ticks)); // prettier-ignore

  let facingRight = $derived(props.facingRight);
  let currentArmor = $derived(combatStats.currentArmor);
  let animations = $derived(props.animations);
  let elapsedMilliseconds = $derived(props.elapsedMilliseconds);

  let currentAnimation = $derived(
    animations.find(
      ({ start, end, vfxName }) =>
        start < elapsedMilliseconds &&
        end > elapsedMilliseconds &&
        ['basicAttackFast', 'basicAttackRegular', 'basicAttackSlow', 'whirlwind'].includes(vfxName)
    )
  );

  let isHealing = $derived(
    animations.find(
      ({ start, end, vfxName }) =>
        start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === 'heal'
    )
  );
  let isHurting = $derived(
    animations.find(
      ({ start, end, vfxName }) =>
        start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === 'hurt'
    )
  );
  let isArmorHurting = $derived(
    animations.find(
      ({ start, end, vfxName }) =>
        start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === 'armorHurt'
    )
  );

  const applyAnimationClass = (name: string) =>
    animations.some(
      ({ vfxName, start, end }) =>
        start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === name
    );
</script>

<div
  class="absolute top-1/2 left-1/2 z-10 h-0 w-0 -translate-x-1/2 -translate-y-1/2"
  style="z-index:{z};"
>
  <div class="absolute" style="left: {x}px; top:{y - 20}px; transform: translate(-50%, -50%);">
    <div class="absolute" style="transform: scale(1) translate(-50%, -50%);">
      <div class="combatant glass rounded border-[0.5px] !border-none border-transparent shadow">
        <crow class="w-full justify-between px-2 py-1 font-bold text-stone-500 uppercase">
          {name}
          <!-- <crow right class="gap-1">
            <strong>DMG</strong>
            {damage}
          </crow> -->
        </crow>

        <HealthBar
          current={combatStats.currentHealth}
          max={combatStats.maxHealth}
          {isHurting}
          {isArmorHurting}
          {isHealing}
          {animations}
          {elapsedMilliseconds}
          left={facingRight}
        />

        <div class="h-40 w-36"></div>
        <!-- <pre class="text-[5px]">
        {JSON.stringify(props, null, 2)}
        </pre> -->
        <CombatantAbilityBar {...props} character={props} />
        <!-- <CombatantAudioPlayer audio={props.audio} {elapsedMilliseconds} /> -->

        <crow
          vertical
          class={tw(
            'absolute top-17 left-[calc(100%-theme(spacing.6))] gap-2',
            facingRight && 'right-[calc(100%-theme(spacing.6))] left-auto !items-end',
            !facingRight && '!items-start'
          )}
        >
          {#each statusEffects.sort(([_, a], [__, b]) => a.ticks - b.ticks) as [key, { ticks }] (key)}
            {@const effect = STATUS_EFFECTS?.[key]}
            <crow class={tw('left')} animate:flip={{ duration: 250 }}>
              <crow class={tw('!grid w-6 !flex-none', facingRight && 'order-1')}>
                <Icon
                  name={effect.icon}
                  class="{effect.animation} scale-[110%] text-xl text-black/80 [animation-direction:reverse] [grid-area:1/1]"
                />
                <Icon
                  name={effect.icon}
                  class="{effect.animation} text-xl [animation-direction:reverse] [grid-area:1/1]"
                  original
                />
              </crow>
              <crow class={tw('text-sm text-gray-700', facingRight ? 'right' : 'left')}>
                {#if !facingRight}
                  <crow class="w-6 !flex-none -translate-y-px text-xl leading-[0] text-gray-800">
                    {ticks}
                  </crow>
                {/if}
                <div class="text-xs">{effect.text}</div>
                {#if facingRight}
                  <crow class="w-6 !flex-none -translate-y-px text-xl leading-[0] text-gray-800">
                    {ticks}
                  </crow>
                {/if}
              </crow>
            </crow>
          {/each}
          {#each statusStacks.sort(([_, a], [__, b]) => b.value - a.value) as [key, { max, value }] (key)}
            {@const effect = STATUS_EFFECTS?.[key]}
            <crow class={tw('left gap-2')} animate:flip={{ duration: 250 }}>
              <crow class={tw('!grid w-6 !flex-none', facingRight && 'order-1')}>
                <!-- <Icon
                  name={effect.icon}
                  class="{effect.animation} scale-[110%] text-xl text-black/80 [animation-direction:reverse] [grid-area:1/1]"
                /> -->
                <Icon
                  name={effect.icon}
                  class="{effect.animation} text-sm [animation-direction:reverse] [grid-area:1/1]"
                  original
                />
              </crow>
              <crow class={tw('gap-2 text-sm text-gray-700', facingRight ? 'right' : 'left')}>
                {#if !facingRight}
                  <crow class="!flex-none text-sm text-gray-800">
                    {value}/{max}
                  </crow>
                {/if}
                <div class="text-xs">{effect.text}</div>
                {#if facingRight}
                  <crow class="!flex-none text-sm text-gray-800">
                    {value}/{max}
                  </crow>
                {/if}
              </crow>
            </crow>
          {/each}
        </crow>
        <!-- <Debug data={statuses} /> -->

        <crow
          class={tw(
            'absolute bottom-7 left-0 aspect-square w-10',
            facingRight ? 'right-0 left-auto' : ''
          )}
        >
          <Icon name="1h1h" class="text-3xl text-[#b3ad9f]" />
          {#if damage > 0}
            <crow class="alfa-slab-one fat-number absolute inset-0 text-2xl text-white">
              {damage}
            </crow>
          {/if}
        </crow>
        <crow
          class={tw(
            'absolute right-0 bottom-7 aspect-square w-10',
            facingRight ? 'right-auto left-0' : ''
          )}
        >
          <Icon name="maxArmor" class="text-3xl text-[#b3ad9f]" />
          {#if currentArmor > 0}
            <crow class="alfa-slab-one fat-number absolute inset-0 text-2xl text-white">
              {currentArmor}
            </crow>
          {/if}
        </crow>
      </div>
      <!-- <Debug data={statuses} /> -->
    </div>
  </div>

  <CombatantImage {...props} {currentAnimation} {applyAnimationClass} />
</div>

<style>
  .combatant {
    position: absolute;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
  }
</style>
