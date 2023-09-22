<script>
  import { renderable, width, height } from '$svelte-game-engine';

  const BLEED = 1;
  const SPACE = 173;
  const HEX_HEIGHT = 200;
  const HEX_WIDTH = 2 * (HEX_HEIGHT / Math.sqrt(3));

  const roundToClosestOdd = (n) => 2 * Math.floor((n + BLEED) / 2) + 1;
  const hexPath = (x, y) => {
    x = x - HEX_WIDTH / 2;
    const width = HEX_WIDTH;
    const height = HEX_HEIGHT;

    const path = new Path2D();

    path.moveTo(x, y);
    path.lineTo(x + width * 0.25, y - height * 0.5);
    path.lineTo(x + width * 0.75, y - height * 0.5);
    path.lineTo(x + width, y);
    path.lineTo(x + width * 0.75, y + height * 0.5);
    path.lineTo(x + width * 0.25, y + height * 0.5);
    path.lineTo(x, y);

    return path;
  };

  $: biggestSide = Math.max($width, $height);
  $: points = roundToClosestOdd(biggestSide / (biggestSide === $width ? SPACE : HEX_HEIGHT));
  $: spaceX = ($width - (points - 1) * SPACE) / 2;
  $: spaceY = ($height - (points - 1) * HEX_HEIGHT) / 2;

  renderable(({ ctx, width, height }) => {
    const middleIndex = Math.floor(points / 2);
    for (let x = 0; x < points; x++) {
      for (let y = 0; y < points; y++) {
        const isOddPosition = x % 2 === middleIndex % 2;

        const drawX = x * SPACE + spaceX;
        const drawY = y * HEX_HEIGHT + spaceY + (isOddPosition ? 0 : HEX_HEIGHT / 2);

        const path2D = hexPath(drawX, drawY);

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.stroke(path2D);

        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(drawX, drawY, 4, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();

        ctx.fillText(`${x}.${y}`, drawX, drawY - 20);
      }
    }
  });
</script>
