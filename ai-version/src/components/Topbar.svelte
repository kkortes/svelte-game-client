<script lang="ts">
  $effect(() => {
    $state.snapshot(app.settings.darkMode);

    const classes = [...document.getElementsByTagName('html')[0].classList];
    document.getElementsByTagName('html')[0].className = app.settings.darkMode
      ? [...classes, 'dark'].join(' ')
      : classes.filter((className) => className !== 'dark').join(' ');
  });
</script>

<crow
  class="bg-card border-b-border sticky top-0 -order-1 -mx-2 -mt-[calc(theme(spacing.6)-1px)] w-auto! justify-between! rounded-t-xl border-t border-b border-t-transparent p-2"
>
  <crow id="topbar"></crow>

  <crow class="gap-2">
    <Clickable tertiary onclick={() => (app.settings.darkMode = !app.settings.darkMode)}>
      {#if app.settings.darkMode}
        <Icon name="light" class="text-2xl text-yellow-400" />
      {:else}
        <Icon name="dark" class="text-2xl text-blue-400" />
      {/if}
    </Clickable>
    <Clickable tertiary onclick={() => (app.overlay = 'GameMenu')}>
      <Icon name="menu" class="text-2xl" />
    </Clickable>
  </crow>
</crow>
