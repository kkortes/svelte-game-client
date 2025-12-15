<script lang="ts">
  import icons from '@/iconice-icons.json';

  let { outcome }: { outcome: 'victory' | 'defeat' | 'draw' } = $props();

  let icon = $derived(outcome === 'draw' ? 'defeat' : outcome);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="${icons[icon].viewBoxLeft} ${icons[icon].viewBoxTop} ${icons[icon].viewBoxWidth} ${icons[icon].viewBoxHeight}">
      <g fill="#fff" stroke="none">
        ${icons[icon].elements.join('')}
      </g>
    </svg>`.trim();

  const svgUrl = `"data:image/svg+xml,${encodeURIComponent(svg)}"`;
</script>

<crow class="relative !grid w-full place-items-center text-6xl">
  {#if outcome === 'victory'}
    <div
      class="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[200%] -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full opacity-20 [animation-duration:10000ms]"
      style="
      background: repeating-conic-gradient(
        from 0deg at 50% 50%,
        transparent 0deg 10deg,
        yellow 15deg 25deg,
        transparent 30deg 45deg
      );
      -webkit-mask: radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, transparent 50%, transparent 100%);
    "
    ></div>
  {/if}
  <div class="[grid-area:1/1]">
    <Icon name={icon} class="text-9xl text-gray-400 drop-shadow-sm" />
  </div>
  <div
    class={tw(
      '[grid-area:1/1]',
      outcome === 'victory' &&
        '[background:radial-gradient(ellipse_farthest-corner_at_right_bottom,_#FEDB37_0%,_#FDB931_8%,_#9f7928_30%,_#8A6E2F_40%,_transparent_80%),_radial-gradient(ellipse_farthest-corner_at_left_top,_#FFFFFF_0%,_#FFFFAC_8%,_#D1B464_25%,_#5d4a1f_62.5%,_#5d4a1f_100%)]'
    )}
    style="
      -webkit-mask: url({svgUrl}) no-repeat bottom/auto 100%;
      mask: url{svgUrl}) no-repeat bottom/auto 100%;
    "
  >
    <!-- JUST FOR SIZE, DOESN'T RENDER -->
    <Icon name={icon} class="text-9xl text-yellow-400 opacity-0 drop-shadow-lg" />
  </div>

  <div
    class={tw(
      'bree-serif drop-shadow-md  [grid-area:1/1]',
      outcome === 'victory'
        ? 'text-yellow-100 [-webkit-text-stroke:_1px_theme(color.yellow.300)]'
        : 'text-gray-100 [-webkit-text-stroke:_1px_theme(color.gray.300)]'
    )}
  >
    {outcome.toUpperCase()}
  </div>
</crow>
