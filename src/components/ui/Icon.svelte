<script lang="ts">
  import icons from '@/iconice-icons.json';
  import type { IconName } from '@/Iconice.d.ts';

  type Props = {
    name: IconName;
    original?: boolean;
    ratio?: number;
    class?: string;
  };

  let { name, original = false, ratio = 1, ...rest }: Props = $props();

  if (!icons[name]) {
    // throw new Error(`Icon "${name}" does not exist.`);
    console.error(`Icon "${name}" does not exist.`);
    name = 'error';
  }

  const {
    elements,
    fill,
    fills,
    strokes,
    viewBoxWidth,
    viewBoxHeight,
    viewBoxLeft,
    viewBoxTop,
    widthRatio,
    heightRatio
  } = icons[name];
</script>

<svg
  {fill}
  viewBox={viewBoxWidth && viewBoxHeight
    ? `${viewBoxLeft} ${viewBoxTop} ${viewBoxWidth} ${viewBoxHeight}`
    : undefined}
  width={`${ratio * widthRatio}em`}
  height={`${ratio * heightRatio}em`}
  style={original
    ? [
        ...fills.map((fill, i) => fill && `--${name}-fill-color-${i}: ${fill};`),
        ...strokes.map((stroke, i) => stroke && `--${name}-stroke-color-${i}: ${stroke};`)
      ]
        .filter(Boolean)
        .join('')
    : undefined}
  {...rest}
>
  {@html elements.join('')}
</svg>
