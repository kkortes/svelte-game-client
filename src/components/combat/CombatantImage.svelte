<script lang="ts">
  import type { Combatant } from '@/types/combatant';
  import type { VFX } from '@/types/vfx';
  import { untrack } from 'svelte';

  let props: Combatant & {
    currentAnimation?: VFX;
    applyAnimationClass: (name: string) => boolean;
    facingRight: boolean;
    elapsedMilliseconds: number;
    progress: number;
    z: number;
  } = $props();

  let avatarWrapper: any = $state();

  let {
    image,
    currentAnimation,
    applyAnimationClass,
    facingRight,
    statuses,
    elapsedMilliseconds,
    position,
    size
  } = $derived(props);

  let y = $derived(position.y);
  let x = $derived(position.x);

  let { nX, nY, sX, sY } = $derived.by(() => {
    const tx = currentAnimation?.targetX ?? x;
    const ty = currentAnimation?.targetY ?? y;

    const dX = tx - x;
    const dY = ty - y;
    const distance = Math.hypot(dX, dY) || 1; // avoid div-by-zero

    const ux = dX / distance;
    const uy = dY / distance;

    const attackReach = 5;

    let anticipate = 0;
    if (currentAnimation?.vfxName === 'basicAttackSlow') anticipate = 50;
    if (currentAnimation?.vfxName === 'basicAttackRegular') anticipate = 30;
    if (currentAnimation?.vfxName === 'basicAttackFast') anticipate = 10;

    // start a bit "behind" (away from the opponent)
    const sX = x - ux * anticipate;
    const sY = y - uy * anticipate;

    // end point toward the opponent
    const step = Math.min(attackReach, distance);
    const nX = x + ux * step;
    const nY = y + uy * step;

    return { nX, nY, sX, sY };
  });

  let cached = '';

  // This is used to retrigger "basicAttackX" animations
  // It replaces the old {#key currentAnimation?.id} Svelte syntax
  // which caused issues with other reactive updates
  $effect(() => {
    $state.snapshot(currentAnimation?.id);
    untrack(() => {
      if (cached != currentAnimation?.id) {
        avatarWrapper.style.animationName = 'none';
        requestAnimationFrame(() => {
          avatarWrapper.style.animationName = '';
        });
      }
      cached = currentAnimation?.id || '';
    });
  });
</script>

<div
  bind:this={avatarWrapper}
  class="relative"
  class:basicAttackSlow={statuses.isStunned.ticks === 0 && applyAnimationClass('basicAttackSlow')}
  class:basicAttackRegular={statuses.isStunned.ticks === 0 &&
    applyAnimationClass('basicAttackRegular')}
  class:basicAttackFast={statuses.isStunned.ticks === 0 && applyAnimationClass('basicAttackFast')}
  class:knockedOut={statuses.knockedOut}
  style="
        --position-x: {x}px;
        --position-y: {y}px;
        transform: translate(var(--position-x), var(--position-y));

        --attack-start-x: {sX}px;
        --attack-start-y: {sY}px;

        --attack-end-x: {nX}px;
        --attack-end-y: {nY}px;

        --attack-duration: {(currentAnimation?.end || 0) - (currentAnimation?.start || 0)}ms;
        --dir: {facingRight ? 1 : -1};
      "
>
  <crow
    down
    class:hurt={applyAnimationClass('hurt')}
    class:block={applyAnimationClass('block')}
    class:attackBlocked={applyAnimationClass('attackBlocked')}
    class:whirlwind={applyAnimationClass('whirlwind')}
    class:attackDodged={applyAnimationClass('attackDodged')}
    class="w-36"
    style="
        --translate-x: -50%;
        --translate-y: calc(70px - 100%);
        transform: translate(var(--translate-x), var(--translate-y));
        height: calc(144px * {size});
      "
  >
    <CharacterAvatar {...props} inCombat class="avatar" />

    <div
      class={tw('dodge-animation')}
      style="
          -webkit-mask: url('/images/races/{image}') no-repeat bottom/auto 100%;
          mask: url('/images/races/{image}') no-repeat bottom/auto 100%;
        "
    ></div>

    <div
      class={tw('hurt-animation', !facingRight && 'scale-x-[-1]')}
      style="
          -webkit-mask: url('/images/races/{image}') no-repeat bottom/auto 100%;
          mask: url('/images/races/{image}') no-repeat bottom/auto 100%;
        "
    ></div>
    <crow
      class={tw('block-animation', facingRight ? 'translate-x-8' : '-translate-x-8 scale-x-[-1]')}
    >
      <!-- <Icon name="block" /> -->
      <img src="/images/shield.png" width="{50 * size}%" alt="" />
      <div
        class="attackBlocked-animation"
        style="
            -webkit-mask: url('/images/shield.png') no-repeat center/auto 100%;
            mask: url('/images/shield.png') no-repeat center/auto 100%;
          "
      ></div>
    </crow>
  </crow>

  <Debug data={currentAnimation} />
</div>

<style>
  .knockedOut {
    filter: grayscale(100%);
  }

  .basicAttackFast {
    animation: basicAttackFast var(--attack-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes basicAttackFast {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    90% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1.33);
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .basicAttackRegular {
    animation: basicAttackRegular var(--attack-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes basicAttackRegular {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    90% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1.33);
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }

  .basicAttackSlow {
    animation: basicAttackSlow var(--attack-duration) cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes basicAttackSlow {
    0% {
      transform: translate(var(--position-x), var(--position-y));
    }
    90% {
      transform: translate(calc(var(--attack-start-x)), calc(var(--attack-start-y)));
      animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1.33);
    }
    100% {
      transform: translate(calc(var(--attack-end-x)), calc(var(--attack-end-y)));
    }
  }
  .whirlwind {
    animation: whirlwind 500ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
  @keyframes whirlwind {
    0% {
      transform: translate(var(--translate-x), var(--translate-y)) scaleX(1) scaleX(1);
    }
    50% {
      transform: translate(var(--translate-x), var(--translate-y)) scaleX(1) scaleX(-1);
    }
    100% {
      transform: translate(var(--translate-x), var(--translate-y)) scaleX(1) scaleX(1);
    }
  }

  .hurt-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    mix-blend-mode: multiply;
    opacity: 0;
  }
  .hurt .hurt-animation {
    animation: hurt 340ms ease;
  }
  @keyframes hurt {
    0% {
      background-color: transparent;
      opacity: 0;
    }
    25% {
      background-color: rgba(255, 0, 0, 0.4);
      opacity: 1;
    }
    100% {
      background-color: transparent;
      opacity: 0;
    }
  }

  .dodge-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    mix-blend-mode: multiply;
    opacity: 0;
    transform: scaleX(var(--dir));
  }

  :global(.avatar),
  .dodge-animation {
    transition: all 250ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  :global(.attackDodged .avatar) {
    opacity: 0.2;
    transform: scale(var(--dir), 1) translate(-10px, 0) !important;

    /* skewY(calc(-5deg * var(--dir)); */
  }
  .attackDodged .dodge-animation {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.15);
    transform: translate(calc(var(--dir) * 10px), 0) scale(var(--dir), 1);
    /* skewY(calc(-5deg * var(--dir)); */
  }

  .block-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    /* mix-blend-mode: multiply; */
    opacity: 0;
    filter: grayscale(100%);
  }
  .block .block-animation,
  .attackBlocked .block-animation {
    opacity: 1;
  }

  .attackBlocked .attackBlocked-animation {
    position: absolute;
    inset: 0;
    background-color: transparent;
    mix-blend-mode: multiply;
    opacity: 0;
    filter: grayscale(100%);
  }
  .attackBlocked .attackBlocked-animation {
    animation: attackBlocked 340ms ease;
  }
  @keyframes attackBlocked {
    0% {
      background-color: transparent;
      opacity: 0;
    }
    25% {
      background-color: gray;
      opacity: 1;
    }
    100% {
      background-color: transparent;
      opacity: 0;
    }
  }
</style>
