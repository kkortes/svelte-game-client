<script>
  import { renderable } from '$svelte-game-engine';

  export let color = 'green';
  export let divisions = 20;
  export let pointSize = 1;

  renderable(({ ctx, width, height }) => {
    const aspect = width / height;

    ctx.save();
    for (let y = 0; y < divisions; y++) {
      ctx.beginPath();
      for (let x = 0; x < divisions; x++) {
        const u = divisions <= 1 ? 0.5 : x / (divisions - 1);
        const v = divisions <= 1 ? 0.5 : y / (divisions - 1);

        let px, py;
        if (width > height) {
          px = u * width;
          py = v * aspect * height;
        } else {
          px = (u / aspect) * width;
          py = v * height;
        }
        ctx.arc(px, py, pointSize, 0, Math.PI * 2);
      }
      ctx.fillStyle = color;
      ctx.fill();
    }
    ctx.restore();
  });
</script>

<slot />
