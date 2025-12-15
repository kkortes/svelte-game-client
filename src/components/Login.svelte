<script lang="ts">
  import { preventDefault } from '@/helpers';
  import { enableGameKeyboard, disableGameKeyboard, notify } from '@/ts/actions';

  const { IS_DEV, AUTO_EMAIL, AUTO_PASSWORD } = ENV;

  let email = $state(IS_DEV ? AUTO_EMAIL : '');
  let password = $state(IS_DEV ? AUTO_PASSWORD : '');
  let rememberMe = $state(IS_DEV ? true : false);
  let codeOfConduct = $state(IS_DEV ? true : false);

  const login = async () => {
    if (!codeOfConduct) {
      notify({
        error: 'you must to agree to the Code of Conduct in order to play'
      });
      return;
    }
    try {
      const t = await app.socket.sendAsync('user/login', {
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

      app.token = t;
      notify({ success: 'Logged in successfully' });
    } catch (error) {
      notify(error);
    }
  };

  let { escape } = $derived(app.keys);
</script>

<form class="crow left vertical w-full gap-2" onsubmit={preventDefault(login)}>
  <crow class="w-full gap-2">
    <Input
      class="xs:w-full"
      placeholder="Email"
      type="email"
      onfocus={disableGameKeyboard}
      onblur={enableGameKeyboard}
      bind:value={email}
    />
    <Input
      class="xs:w-full"
      placeholder="Password"
      type="password"
      bind:value={password}
      onfocus={disableGameKeyboard}
      onblur={enableGameKeyboard}
    />

    <Button primary class="xs:w-full" type="submit">Log&nbsp;in</Button>
  </crow>

  <div>
    <Checkbox
      id="codeOfConduct"
      bind:value={codeOfConduct}
      onchange={({ target: { checked } }: any) => (codeOfConduct = checked)}
    >
      I agree to the <a
        class="text-blue-500 hover:underline"
        href="/"
        onclick={preventDefault(() => (app.overlay = 'CodeOfConduct'))}
      >
        Code of Conduct
      </a>
    </Checkbox>
  </div>

  <div>
    <Checkbox
      id="rememberMe"
      bind:value={rememberMe}
      onchange={({ target: { checked } }: any) => (rememberMe = checked)}
    >
      Remember me
    </Checkbox>
  </div>
</form>
