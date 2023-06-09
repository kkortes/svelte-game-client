<script>
  const { setOverlay } = ACTIONS;
</script>

<div class="top-bar">
  <button class="game-menu-button strip-defaults" on:click={setOverlay.bind(undefined, 'GameMenu')}>
    <Icon name="menu" size={20} />
  </button>
</div>

<style>
  .top-bar {
    position: fixed;
    inset: 0 0 auto 0;
    display: grid;
    place-items: flex-end;
  }
  .game-menu-button {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
  }
  .game-menu-button:hover {
    background: rgba(0, 0, 0, 0.12);
  }
  .game-menu-button:active {
    transform: translateY(1px);
  }
</style>
