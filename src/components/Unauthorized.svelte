<script>
  const { settings, keys } = STORES;

  $: ({ escape } = $keys);
  $: ({ loginPageMode } = $settings);
</script>

<div class="unauthorized">
  <Crow vertical gutter={4}>
    {#if loginPageMode === 0}
      <Login />
    {/if}
    {#if loginPageMode === 1}
      <Register />
    {/if}
    {#if loginPageMode === 2}
      <ForgotPassword />
    {/if}
    <Crow>
      {#if loginPageMode !== 0}
        <Button tertiary on:click={() => ($settings.loginPageMode = 0)} blur={escape}>Login</Button>
      {/if}
      {#if loginPageMode !== 1}
        <Button tertiary on:click={() => ($settings.loginPageMode = 1)} blur={escape}>
          Register
        </Button>
      {/if}
      {#if loginPageMode !== 2}
        <Button tertiary on:click={() => ($settings.loginPageMode = 2)} blur={escape}>
          Forgot password
        </Button>
      {/if}
    </Crow>
  </Crow>
</div>

<style>
  .unauthorized {
    position: relative;
  }
</style>
