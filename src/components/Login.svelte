<script>
  const { keys, overlay, socket, token, mqs } = STORES;
  const { lockKeys, unlockKeys, notify } = ACTIONS;
  const { IS_DEV, AUTO_EMAIL, AUTO_PASSWORD } = ENV;

  let email = IS_DEV ? AUTO_EMAIL : '';
  let password = IS_DEV ? AUTO_PASSWORD : '';
  let rememberMe = IS_DEV ? true : false;
  let codeOfConduct = IS_DEV ? true : false;

  const login = async () => {
    if (!codeOfConduct) {
      notify({
        error: 'you must to agree to the Code of Conduct in order to play'
      });
      return;
    }
    try {
      const t = await $socket.asyncEmit('user/login', {
        email,
        password
      });
      let expiration = '';
      if (rememberMe) {
        const future = new Date();
        future.setDate(future.getDate() + 30);
        expiration = ` Expires=${future};`;
      }
      document.cookie = `token=${t};${expiration}`;

      $token = t;
    } catch (error) {
      notify(error);
    }
  };

  $: ({ smartphone } = $mqs);
  $: ({ escape } = $keys);
</script>

<form on:submit|preventDefault={login}>
  <Crow vertical gutter={4} left>
    <Crow gutter={4} vertical={smartphone}>
      <Input
        placeholder="Email"
        type="email"
        on:focus={lockKeys}
        on:blur={unlockKeys}
        bind:value={email}
        blur={escape}
      />
      <Input placeholder="Password" type="password" bind:value={password} blur={escape} />

      <Button primary type="submit" blur={escape}>Log&nbsp;in</Button>
    </Crow>

    <Checkbox
      id="codeOfConduct"
      bind:value={codeOfConduct}
      on:change={({ target: { checked } }) => (codeOfConduct = checked)}
    >
      I agree to the <a href="/" on:click|preventDefault={() => ($overlay = 'CodeOfConduct')}>
        Code of Conduct
      </a>
    </Checkbox>

    <Checkbox
      id="rememberMe"
      bind:value={rememberMe}
      on:change={({ target: { checked } }) => (rememberMe = checked)}
    >
      Remember me
    </Checkbox>
  </Crow>
</form>
