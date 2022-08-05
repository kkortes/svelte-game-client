<script>
  import '$src/store/settings';

  const { isDev } = ENV;
</script>

<ConnectSocket />
<Keystrokes />

{#if isDev && false}
  <Sidebar />
{/if}

<div class="content">
  <Crow vertical>
    <slot />
  </Crow>
</div>

<Overlay />
<Notifications />

<style>
  .content {
    padding: 75px 20px;
    width: 100%;
    height: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
</style>
