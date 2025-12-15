<script lang="ts">
  import { disableGameKeyboard, enableGameKeyboard, notify } from '@/ts/actions';

  let email = $state('');

  const forgotPassword = async (e: Event) => {
    e.preventDefault();
    try {
      await app.socket.sendAsync('user/password/request-reset', {
        email,
        url: window.location.origin
      });
      email = '';
      notify({
        info: 'if an account was registered on that email address, check your email'
      });
      app.settings.loginPageMode = 0;
    } catch (error) {
      notify(error);
    }
  };
</script>

<form class="crow w-full gap-2" onsubmit={forgotPassword}>
  <Input
    class="xs:w-full"
    placeholder="Email"
    type="email"
    onfocus={disableGameKeyboard}
    onblur={enableGameKeyboard}
    bind:value={email}
  />

  <Button type="submit">Submit</Button>
</form>
