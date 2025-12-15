<script lang="ts">
  import type { VFX } from '@/types/vfx';
  import { untrack } from 'svelte';

  let props = $props();
  let {
    isHurting,
    isArmorHurting,
    isHealing,
    animations,
    elapsedMilliseconds,
    left
  }: {
    isHurting?: VFX;
    isArmorHurting?: VFX;
    isHealing?: VFX;
    animations: VFX[];
    elapsedMilliseconds: number;
    left: boolean;
    applyAnimationClass: (name: string) => boolean;
  } = $derived(props);

  let hurts: (VFX & { random: number })[] = $state([]);
  let armorHurts: (VFX & { random: number })[] = $state([]);
  let heals: (VFX & { random: number })[] = $state([]);

  $effect(() => {
    $state.snapshot(isHurting);

    untrack(() => {
      if (isHurting?.vfxName === 'hurt') {
        let hurtAnimations = animations.filter(
          ({ start, end, vfxName }) =>
            start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === 'hurt'
        );

        hurts.push(...hurtAnimations.map((anim) => ({ ...anim, random: Math.random() })));
      }
    });
  });

  $effect(() => {
    $state.snapshot(isArmorHurting);

    untrack(() => {
      if (isArmorHurting?.vfxName === 'armorHurt') {
        let armorHurtAnimations = animations.filter(
          ({ start, end, vfxName }) =>
            start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === 'armorHurt'
        );

        armorHurts.push(...armorHurtAnimations.map((anim) => ({ ...anim, random: Math.random() })));
      }
    });
  });

  $effect(() => {
    $state.snapshot(isHealing);

    untrack(() => {
      if (isHealing?.vfxName === 'heal') {
        let healAnimations = animations.filter(
          ({ start, end, vfxName }) =>
            start < elapsedMilliseconds && end > elapsedMilliseconds && vfxName === 'heal'
        );

        heals.push(...healAnimations.map((anim) => ({ ...anim, random: Math.random() })));
      }
    });
  });
</script>

<Bar {...props}>
  {#each armorHurts as armorHurt (armorHurt.id)}
    <div
      class={tw(
        'hurt alfa-slab-one fat-number absolute top-1 left-full text-white',
        left && 'right-full left-auto'
      )}
      style="--y-offset: 160px; --scale: {armorHurt.isCritical
        ? 2
        : 1}; --random-x-offset: {armorHurt.random}; --dir:{left ? -1 : 1};"
    >
      <div class="hurt-x translate-x-0">
        <crow class="hurt-y -translate-y-0 gap-0.5">
          {#if armorHurt.isCritical}
            <Icon name="criticalDamage" class="text-xs drop-shadow-lg" />
          {/if}
          {armorHurt.amount}
        </crow>
      </div>
    </div>
  {/each}

  {#each hurts as hurt (hurt.id)}
    <div
      class={tw(
        'hurt alfa-slab-one fat-number absolute top-1 left-full text-red-300',
        left && 'right-full left-auto',
        hurt.isCritical && 'text-red-300'
      )}
      style="--y-offset: 0; --scale: {hurt.isCritical
        ? 2
        : 1}; --random-x-offset: {hurt.random}; --dir:{left ? -1 : 1};"
    >
      <div class="hurt-x translate-x-0">
        <crow class="hurt-y -translate-y-0 gap-0.5">
          {#if hurt.isCritical}
            <Icon name="criticalDamage" class="text-xs drop-shadow-lg" />
          {/if}
          {hurt.amount}
        </crow>
      </div>
    </div>
  {/each}

  {#each heals as heal (heal.id)}
    <div
      class={tw(
        'heal alfa-slab-one fat-number absolute top-1 left-full text-green-300',
        left && 'right-full left-auto'
      )}
      style="--y-offset: 0px; --random-x-offset: {heal.random}; --dir:{left ? -1 : 1};"
    >
      <div class="heal-x translate-x-0">
        <div class="heal-y -translate-y-0">+{heal.amount}</div>
      </div>
    </div>
  {/each}
</Bar>

<style>
  .heal-x {
    opacity: 0;
  }
  .heal .heal-x {
    animation: heal-x 750ms cubic-bezier(0.02, 0.01, 0.21, 1);
  }
  @keyframes heal-x {
    0% {
      transform: translateX(0px);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translateX(calc(var(--dir) * 10px));
      opacity: 0;
    }
  }
  .heal .heal-y {
    animation: heal-y 750ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes heal-y {
    0% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-20px);
    }
  }

  .hurt {
    opacity: 0;
    animation: hurt 1000ms ease-in forwards;
  }
  @keyframes hurt {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .hurt .hurt-x {
    animation: hurt-x 200ms ease-in forwards;
  }
  @keyframes hurt-x {
    0% {
      transform: translateY(var(--y-offset)) translateX(calc(var(--dir) * -15px))
        scale(calc(var(--scale) * 3));
    }
    100% {
      transform: translateY(var(--y-offset))
        translateX(calc(var(--dir) * (5px + var(--random-x-offset) * 25px)))
        scale(calc(0.6 + 0.4 * var(--scale)));
    }
  }

  .hurt .hurt-y {
    animation: hurt-y 1000ms linear forwards;
  }
  @keyframes hurt-y {
    0% {
      transform: translateY(calc(0px));
    }
    100% {
      transform: translateY(calc(-40px));
    }
  }
</style>
