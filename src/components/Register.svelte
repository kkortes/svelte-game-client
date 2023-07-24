<script>
  const { keys, socket, settings, mqs } = STORES;
  const { lockKeys, unlockKeys, notify } = ACTIONS;

  let email = '';
  let password = '';

  const register = async () => {
    try {
      await $socket.sendAsync('user/register', {
        email,
        password
      });
      notify({
        success: 'Account was created. You can now log in.'
      });
      email = '';
      password = '';
      $settings.loginPageMode = 0;
    } catch (error) {
      notify(error);
    }
  };

  $: ({ smartphone } = $mqs);
  $: ({ escape } = $keys);
</script>

<form class={tw('cx gap-2', smartphone && 'cy')} on:submit|preventDefault={register}>
  <Input
    placeholder="Email"
    type="email"
    on:focus={lockKeys}
    on:blur={unlockKeys}
    bind:value={email}
    blur={escape}
  />
  <Input placeholder="Password" type="password" bind:value={password} blur={escape} />

  <Button primary type="submit" blur={escape}>Register</Button>
</form>
