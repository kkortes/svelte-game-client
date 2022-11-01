<script>
  const links = [
    {
      url: '1',
      text: '1'
    },
    {
      url: '2',
      text: '2'
    }
  ];
</script>

<div class="sidebar">
  <Crow vertical up gap={8}>
    {#each links as { url, text }}
      <div on:click={() => console.info(url)}>
        <Icon name="crow" />
        Long name like this
      </div>
    {/each}
  </Crow>
</div>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    background-color: hsl(var(--form-bg-color));
    height: 100%;
    width: 50px;
    padding-top: 50px;
  }
</style>
