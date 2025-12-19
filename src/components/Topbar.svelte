<script lang="ts">
  const toggleDarkMode = () => {
    const classes = [...document.getElementsByTagName('body')[0].classList];

    document.getElementsByTagName('body')[0].className = classes.includes('dark')
      ? classes.filter((className) => className !== 'dark').join(' ')
      : [...classes, 'dark'].join(' ');
  };
</script>

<crow class="glass sticky inset-0 -order-1 w-full justify-between! rounded-none! bg-white p-2">
  <a href="/" class="block">
    <Icon class="text-4xl text-black dark:text-white" name="logo-apeegg" />
  </a>

  <!-- <Clickable class="crow h-8 w-8 hover:bg-black/5 dark:hidden" onclick={toggleDarkMode}>
    <Icon class="text-yellow-500" name="light" />
  </Clickable> -->
  <crow>
    <Clickable tertiary onclick={toggleDarkMode}>
      <Icon class="text-blue-500" name="dark" />
    </Clickable>
    <Clickable tertiary onclick={() => (app.overlay = 'GameMenu')}>
      <Icon name="menu" />
    </Clickable>
  </crow>
</crow>
