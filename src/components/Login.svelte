<script>
  const { keys, overlay, socket, token } = STORES;
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
      const t = await $socket.sendAsync('user/login', {
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
      notify({ success: 'Logged in successfully' });
    } catch (error) {
      notify(error);
    }
  };

  $: ({ escape } = $keys);
</script>

<form class="w-full cy-left gap-2" on:submit|preventDefault={login}>
  <div class="cx gap-2 w-full">
    <Input
      class="xs:w-full"
      placeholder="Email"
      type="email"
      on:focus={lockKeys}
      on:blur={unlockKeys}
      bind:value={email}
      blur={escape}
    />
    <Input
      class="xs:w-full"
      placeholder="Password"
      type="password"
      bind:value={password}
      on:focus={lockKeys}
      on:blur={unlockKeys}
      blur={escape}
    />

    <Button class="xs:w-full" primary type="submit" blur={escape}>Log&nbsp;in</Button>
  </div>

  <Checkbox
    id="codeOfConduct"
    bind:value={codeOfConduct}
    on:change={({ target: { checked } }) => (codeOfConduct = checked)}
  >
    I agree to the <a
      class="text-blue-500 hover:underline"
      href="/"
      on:click|preventDefault={() => ($overlay = 'CodeOfConduct')}
    >
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
</form>
