<script lang="ts">
  let { loginPageMode } = $derived(app.settings);
</script>

<crow vertical class="glass relative -mr-18 mb-10 -ml-24 w-full gap-2 p-10 pb-6">
  {#if loginPageMode === 0}
    <Login />
  {/if}
  {#if loginPageMode === 1}
    <Register />
  {/if}
  {#if loginPageMode === 2}
    <ForgotPassword />
  {/if}
  <crow class="gap-2">
    {#if loginPageMode !== 0}
      <Button tertiary onclick={() => (app.settings.loginPageMode = 0)}>Login</Button>
    {/if}
    {#if loginPageMode !== 1}
      <Button tertiary onclick={() => (app.settings.loginPageMode = 1)}>Register</Button>
    {/if}
    {#if loginPageMode !== 2}
      <Button tertiary onclick={() => (app.settings.loginPageMode = 2)}>
        Forgot&nbsp;password
      </Button>
    {/if}
  </crow>
</crow>
