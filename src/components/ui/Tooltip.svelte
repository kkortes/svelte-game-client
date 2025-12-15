<script lang="ts">
  import type { Tooltip } from '@/ts/use';
  import { tick } from 'svelte';

  let { targetX, targetY, direction, lockInPlace, x, y, visible, children }: Tooltip = $props();

  const OFFSET = 20;

  let tooltipElement: HTMLElement | null = $state(null);
  let tooltipBoundingBox: DOMRect | undefined = $state();

  let tooltipX = $derived.by(() => {
    const width = tooltipBoundingBox?.width ?? 0;
    const vw = window.innerWidth;

    let desiredLeft = x - width / 2; // center at x
    if (direction === 'left') {
      desiredLeft = x - width - OFFSET;

      if (lockInPlace) desiredLeft = targetX - width - OFFSET * 0.25;
    } else if (direction === 'right') {
      desiredLeft = x + OFFSET;

      if (lockInPlace) desiredLeft = targetX + OFFSET * 0.25;
    } else if (lockInPlace) desiredLeft = targetX - width / 2;

    const maxLeft = Math.max(0, vw - width); // last valid left
    return Math.min(Math.max(desiredLeft, 0), maxLeft);
  });

  let tooltipY = $derived.by(() => {
    const height = tooltipBoundingBox?.height ?? 0;
    const vh = window.innerHeight;

    let desiredTop = y - height / 2; // center at x
    if (direction === 'up') {
      desiredTop = y - height - OFFSET;

      if (lockInPlace) desiredTop = targetY - height - OFFSET * 0.25;
    } else if (direction === 'down') {
      desiredTop = y + OFFSET;

      if (lockInPlace) desiredTop = targetY + OFFSET * 0.25;
    } else if (lockInPlace) desiredTop = targetY - height / 2;

    const maxTop = Math.max(0, vh - height); // last valid top
    return Math.min(Math.max(desiredTop, 0), maxTop);
  });

  $effect(() => {
    if (!tooltipElement) return;

    children;

    tick().then(() => {
      if (!tooltipElement) return;
      tooltipBoundingBox = tooltipElement.getBoundingClientRect();
    });
  });

  const ARROW = 16; // w-4 => 16px
  const ARROW_HALF = ARROW / 2;

  const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

  // pick which point to follow (cursor vs lock-in target)
  const fx = $derived.by(() => (lockInPlace ? targetX : x));
  const fy = $derived.by(() => (lockInPlace ? targetY : y));

  // Arrow “track” positions, clamped to the tooltip’s interior
  const arrowLeft = $derived.by(() => {
    const w = tooltipBoundingBox?.width ?? 0;
    // position is relative to tooltip’s left, compensate for arrow center
    return clamp(fx - tooltipX - ARROW_HALF, ARROW_HALF, Math.max(ARROW_HALF, w - ARROW_HALF));
  });

  const arrowTop = $derived.by(() => {
    const h = tooltipBoundingBox?.height ?? 0;
    // position is relative to tooltip’s top, compensate for arrow center
    return clamp(fy - tooltipY - ARROW_HALF, ARROW_HALF, Math.max(ARROW_HALF, h - ARROW_HALF));
  });

  const hasEquipmentLevel = $derived(app.tooltip?.props?.level);
</script>

<div
  class={tw(
    'glass pointer-events-none fixed z-100 -translate-y-2 !border-[0.5px] !border-black/50 opacity-0 transition-[translate,opacity] duration-300',
    visible && 'translate-y-0 opacity-100'
  )}
  style="left: {tooltipX}px; top: {tooltipY}px;"
  bind:this={tooltipElement}
>
  {@render children()}

  <div
    class={tw(
      'absolute aspect-square w-4 bg-stone-600',
      !direction && 'hidden',
      direction === 'left' && 'top-0 left-full [clip-path:polygon(0%_0%,50%_50%,0%_100%)]',
      direction === 'right' && 'top-0 right-full [clip-path:polygon(100%_0%,100%_100%,50%_50%)]',
      direction === 'up' && 'top-full left-0 [clip-path:polygon(0%_0%,100%_0%,50%_50%)]',
      direction === 'down' && 'bottom-full left-0 [clip-path:polygon(100%_100%,0%_100%,50%_50%)]',
      hasEquipmentLevel >= 5 && 'bg-green-700',
      hasEquipmentLevel >= 10 && 'bg-blue-700',
      hasEquipmentLevel >= 15 && 'bg-purple-700',
      hasEquipmentLevel >= 20 && 'bg-orange-700',
      hasEquipmentLevel >= 25 && 'bg-red-700'
    )}
    style={['left', 'right'].includes(direction ?? '')
      ? `top:${arrowTop}px;`
      : `left:${arrowLeft}px;`}
  ></div>
</div>
