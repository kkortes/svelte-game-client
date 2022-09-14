<script>
  import { getCookie } from '$src/helpers';
  import { version } from '../../package.json';

  const { IS_DEV } = ENV;
  const { socket, token } = STORES;
  const { notify } = ACTIONS;

  let connected = false,
    authorized = false;

  $: !connected && $socket && (connected = true);

  onMount(() => ($token = getCookie()?.token));

  $: $token && connected
    ? (async () => {
        try {
          authorized = await $socket.asyncEmit('user/authenticate', {
            token: $token,
            clientVersion: version,
            IS_DEV
          });
        } catch (e) {
          notify(e);
          $token = undefined;
        }
      })()
    : (authorized = false);
</script>

{#if !connected}
  <Loader>Connecting to server</Loader>
{:else if authorized}
  <Authorized />
{:else if !$token}
  <Unauthorized />
{/if}
