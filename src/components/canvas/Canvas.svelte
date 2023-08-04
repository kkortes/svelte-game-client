<script>
  import { width, height } from '$svelte-game-engine';
  import Canvas from '$svelte-game-engine/Canvas.svelte';
</script>

<Canvas>
  <Background color="hsl(0, 0%, 10%)">
    <Grid divisions={30} color="hsla(0, 0%, 100%, 0.5)" />
  </Background>
  <Character size={10} />
  <Text
    text="Click and drag around the page to move the character."
    fontSize={12}
    align="right"
    baseline="bottom"
    x={$width - 20}
    y={$height - 20}
  />
  <FPS />
</Canvas>
