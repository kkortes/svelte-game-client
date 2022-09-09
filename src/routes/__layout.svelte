<script>
  import '$src/store/settings';
  const { IS_DEV } = ENV;
</script>

<ConnectSocket />
<Keystrokes />

{#if IS_DEV && false}
  <Sidebar />
{/if}

<div class="content">
  <Crow vertical>
    <slot />
  </Crow>
</div>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
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
