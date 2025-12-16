<script lang="ts">
  const toggleDarkMode = () => {
    const classes = [...document.getElementsByTagName('html')[0].classList];

    document.getElementsByTagName('html')[0].className = classes.includes('dark')
      ? classes.filter((className) => className !== 'dark').join(' ')
      : [...classes, 'dark'].join(' ');
  };
</script>

<crow class="fixed top-0 right-0 bottom-auto" right>
  <!-- <Clickable class="crow h-8 w-8 hover:bg-black/5 dark:hidden" onclick={toggleDarkMode}>
    <Icon class="text-yellow-500" name="light" />
  </Clickable> -->
  <Clickable class="crow h-8 w-8" onclick={toggleDarkMode}>
    <Icon class="text-blue-500" name="dark" />
  </Clickable>
  <Clickable class="crow h-8 w-8" onclick={() => (app.overlay = 'GameMenu')}>
    <Icon name="menu" />
  </Clickable>
</crow>
