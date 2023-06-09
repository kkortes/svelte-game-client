<script>
  import { page } from '$app/stores';
  import '../app.css';
  import '$src/store/settings';
  const { IS_DEV } = ENV;
  const { token } = STORES;
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'grid justify-center w-screen h-screen bg-no-repeat bg-cover',
    $page.route.id === '/' && !$token
      ? 'bg-[url("/images/lush-fantasy-forest.png")]'
      : 'bg-gray-200 dark:bg-gray-800'
  )}
>
  <Crow>
    <Crow left vertical>
      <slot />
    </Crow>
  </Crow>
</div>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />
