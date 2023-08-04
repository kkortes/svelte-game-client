<script>
  import { renderable } from '$svelte-game-engine';

  export let color = 'green';
  export let divisions = 20;
  export let pointSize = 1;

  renderable(({ context, width, height }) => {
    const aspect = width / height;

    context.save();
    for (let y = 0; y < divisions; y++) {
      context.beginPath();
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
        context.arc(px, py, pointSize, 0, Math.PI * 2);
      }
      context.fillStyle = color;
      context.fill();
    }
    context.restore();
  });
</script>

<slot />
