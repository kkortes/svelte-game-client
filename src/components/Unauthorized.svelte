<script>
  const { settings, keys } = STORES;

  $: ({ escape } = $keys);
  $: ({ loginPageMode } = $settings);
</script>

<div class="relative p-10 pb-6 glass cy gap-2 w-full">
  {#if loginPageMode === 0}
    <Login />
  {/if}
  {#if loginPageMode === 1}
    <Register />
  {/if}
  {#if loginPageMode === 2}
    <ForgotPassword />
  {/if}
  <div class="cx">
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
  </div>
</div>
