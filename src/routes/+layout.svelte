<script>
  export const ssr = false;
  import { page } from '$app/stores';
  import '../app.css';
  import '$src/store/settings';
  const { token } = STORES;
</script>

<ConnectSocket />
<Keystrokes />

<div
  class={tw(
    'cx w-screen min-h-screen bg-no-repeat bg-cover bg-center bg-blur',
    $page.route.id === '/' && !$token
      ? 'bg-[url("/images/desktop-1920x1080.jpg")]'
      : 'bg-gray-200 dark:bg-gray-800'
  )}
>
  <div class="cx xs:w-[calc(100%-theme(space.4))]">
    <slot />
  </div>
</div>

<Topbar />
<Logo />
<Overlay />
<MouseTracker />
<Notifications />

<!-- <style>
  :global(body) {
    background-size: 40px 40px;
    background-image: radial-gradient(circle, black 1px, rgba(0, 0, 0, 0) 1px);
    background-position: center;
  }
</style> -->
