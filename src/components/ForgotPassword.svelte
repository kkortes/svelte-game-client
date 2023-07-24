<script>
  const { keys, socket, settings } = STORES;
  const { lockKeys, unlockKeys, notify } = ACTIONS;

  let email = '';

  const forgotPassword = async () => {
    try {
      await $socket.sendAsync('user/password/request-reset', {
        email,
        url: window.location.origin
      });
      email = '';
      notify({
        information: 'if an account was registered on that email address, check your email'
      });
      $settings.loginPageMode = 0;
    } catch (error) {
      notify(error);
    }
  };

  $: ({ escape } = $keys);
</script>

<form class="cx gap-2" on:submit|preventDefault={forgotPassword}>
  <Input
    placeholder="Email"
    type="email"
    on:focus={lockKeys}
    on:blur={unlockKeys}
    bind:value={email}
    blur={escape}
  />

  <Button type="submit" blur={escape}>Submit</Button>
</form>
