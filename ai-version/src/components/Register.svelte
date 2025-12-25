<script lang="ts">
  import { enableGameKeyboard, disableGameKeyboard, notify } from '@/ts/actions';

  let email = $state('');
  let password = $state('');

  const register = async (e: Event) => {
    e.preventDefault();
    try {
      await app.socket.sendAsync('user/register', {
        email,
        password
      });
      notify({
        success: 'Account was created. You can now log in.'
      });
      email = '';
      password = '';
      app.settings.loginPageMode = 0;
    } catch (error) {
      notify(error);
    }
  };
</script>

<form class="crow w-full gap-2" onsubmit={register}>
  <Input
    class="xs:w-full"
    placeholder="Email"
    type="email"
    onfocus={disableGameKeyboard}
    onblur={enableGameKeyboard}
    bind:value={email}
  />
  <Input class="xs:w-full" placeholder="Password" type="password" bind:value={password} />

  <Button primary type="submit">Register</Button>
</form>
