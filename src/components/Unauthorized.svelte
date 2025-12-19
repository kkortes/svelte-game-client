<script lang="ts">
  let { loginPageMode } = $derived(app.settings);
</script>

<card class="crow vertical gap-2 p-10">
  {#if loginPageMode === 0}
    <Login />
  {/if}
  {#if loginPageMode === 1}
    <Register />
  {/if}
  {#if loginPageMode === 2}
    <ForgotPassword />
  {/if}
  <crow>
    {#if loginPageMode !== 0}
      <Button tertiary onclick={() => (app.settings.loginPageMode = 0)}>Login</Button>
    {/if}
    {#if loginPageMode !== 1}
      <Button tertiary onclick={() => (app.settings.loginPageMode = 1)}>Register</Button>
    {/if}
    {#if loginPageMode !== 2}
      <Button tertiary onclick={() => (app.settings.loginPageMode = 2)}>Forgot password</Button>
    {/if}
  </crow>
</card>
