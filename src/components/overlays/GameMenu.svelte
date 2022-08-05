<script>
  const { token, overlay } = STORES;
</script>

<div class="game-menu">
  <Frame>
    <Crow vertical gutter={4}>
      <Button secondary on:click={() => ($overlay = 'ReleaseNotes')}>Release notes</Button>
      {#if $token}
        <Logout />
      {/if}
    </Crow>
  </Frame>

  <Close on:click />
</div>
