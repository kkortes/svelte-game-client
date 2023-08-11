<script>
  import { renderable } from '$svelte-game-engine';
  export let color = null;

  renderable(({ ctx, width, height }) => {
    ctx.clearRect(0, 0, width, height);
    if (color) {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, width, height);
    }
  });
</script>
