<script>
  import { renderable } from '$svelte-game-engine';
  export let color = null;

  renderable(({ context, width, height }) => {
    context.clearRect(0, 0, width, height);
    if (color) {
      context.fillStyle = color;
      context.fillRect(0, 0, width, height);
    }
  });
</script>

<slot />
