<script lang="ts">
  let { rarity }: { rarity: number } = $props();

  let rarityColor = $derived(
    {
      1: 'var(--color-brown-300)',
      2: 'var(--color-slate-300)',
      3: 'var(--color-amber-300)',
      4: 'var(--color-cyan-300)'
    }[rarity] as string
  );

  const rotateByRarity = (items: any[], rarity: number) => {
    const len = items.length;
    const shift = (((rarity - 1) % len) + len) % len; // safe modulo
    const cut = len - shift; // shift right
    return [...items.slice(cut), ...items.slice(0, cut)];
  };

  let shapes = $derived(rotateByRarity([triangle, square, pentagon, hexagon], rarity));
</script>

{#snippet hexagon(rarity: number, rarityColor: string, darkness: number, i: number)}
  <hexagon
    style="transform:scale({0.7 +
      0.1 * rarity});background-color: oklch(from {rarityColor} calc(l * {darkness}) c h);"
  ></hexagon>
{/snippet}

{#snippet pentagon(rarity: number, rarityColor: string, darkness: number, i: number)}
  <pentagon
    style="transform:scale({0.7 +
      0.1 * rarity});background-color: oklch(from {rarityColor} calc(l * {darkness}) c h);"
  ></pentagon>
{/snippet}

{#snippet square(rarity: number, rarityColor: string, darkness: number, i: number)}
  <square
    style="transform:scale({0.7 +
      0.1 * rarity});background-color: oklch(from {rarityColor} calc(l * {darkness}) c h);"
  ></square>
{/snippet}

{#snippet triangle(rarity: number, rarityColor: string, darkness: number, i: number)}
  <triangle
    style="transform:scale({0.7 +
      0.1 * rarity});background-color: oklch(from {rarityColor} calc(l * {darkness}) c h);"
  >
    <circle></circle>
  </triangle>
{/snippet}

<wrap style="width: 14px; height: 14px;">
  <wrap class="w-full h-full">
    <div
      class="grid opacity-50!"
      style="transform:scale({0.75 + 0.1 * rarity});width: 110%; height: 110%; grid-area-[1/1];"
    >
      <hexagon style="background-color: oklch(from black l c h);"> </hexagon>
      <pentagon style="background-color: oklch(from black l c h);"> </pentagon>
      <square style="background-color: oklch(from black l c h);"> </square>
      <triangle style="background-color: oklch(from black l c h);"> </triangle>
    </div>
  </wrap>

  {#each shapes as shape, i}
    {@const darkness = 0.4 + i * 0.2}
    {@render shape(rarity, rarityColor, darkness, i)}
  {/each}
</wrap>

<style>
  wrap {
    display: grid;
    aspect-ratio: 1;
    place-items: center;
  }

  wrap > * {
    grid-area: 1/1;
    opacity: 1;
  }

  triangle {
    display: inline-block;
    grid-area: 1/1;
    place-items: center;
    transform: rotate(0deg) translateY(0px);
    transform-origin: 50%;
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 13.398%, 100% 13.398%, 50% 100%);
    mix-blend-mode: normal;
  }
  square {
    display: inline-block;
    grid-area: 1/1;
    transform: rotate(0deg) translateY(0px);
    transform-origin: 50%;
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    mix-blend-mode: normal;
  }
  pentagon {
    display: inline-block;
    grid-area: 1/1;
    transform: rotate(0deg) translateY(0px);
    transform-origin: 50%;
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 100%, 0% 63.681%, 19.099% 4.894%, 80.901% 4.894%, 100% 63.681%);
    mix-blend-mode: normal;
  }
  hexagon {
    display: inline-block;
    grid-area: 1/1;
    transform: rotate(0deg) translateY(0px);
    transform-origin: 50%;
    width: 100%;
    height: 100%;
    clip-path: polygon(50% 100%, 6.699% 75%, 6.699% 25%, 50% 0%, 93.301% 25%, 93.301% 75%);
    mix-blend-mode: normal;
  }
  circle {
    display: none;
    background: oklch(from cyan calc(l * 0.2) c h);
    width: 60%;
    height: 60%;
    clip-path: circle();
    mix-blend-mode: normal;
  }
  godagon {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: black;
    transition: all 200ms ease-in-out;
  }
  ._1 {
    clip-path: polygon(50% 100%, 6.699% 75%, 6.699% 25%, 50% 0%, 50% 0%, 93.301% 25%, 93.301% 75%);
  }
  ._2 {
    clip-path: polygon(
      50% 100%,
      0% 63.681%,
      19.099% 4.894%,
      19.099% 4.894%,
      80.901% 4.894%,
      80.901% 4.894%,
      100% 63.681%
    );
  }
  ._3 {
    clip-path: polygon(50% 100%, 0% 50%, 0% 50%, 50% 0%, 50% 0%, 100% 50%, 100% 50%);
  }
  ._4 {
    clip-path: polygon(
      50% 100%,
      0% 13.398%,
      0% 13.398%,
      0% 13.398%,
      100% 13.398%,
      100% 13.398%,
      100% 13.398%
    );
  }
</style>
