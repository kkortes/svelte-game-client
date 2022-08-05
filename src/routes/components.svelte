<script>
  const { notify } = ACTIONS;
  const { keys } = STORES;

  $: ({ escape } = $keys);
</script>

<div class="components">
  <Crow vertical left gutter={20}>
    <div>
      <h2>Input</h2>
      <Input
        placeholder="Type something"
        on:keyup={(e) => console.info(e.target.value)}
        blur={escape}
      />
    </div>
    <div>
      <h2>Dropdown</h2>
      <Dropdown
        options={['Option 1', 'Option 2']}
        on:change={({ target: { value } }) => console.info(value)}
      />
    </div>
    <div>
      <h2>Button</h2>
      <Crow gutter={8}>
        <Button primary on:click={console.info}>Primary</Button>
        <Button secondary on:click={console.info}>Secondary</Button>
        <Button tertiary on:click={console.info}>Tertiary</Button>
      </Crow>
    </div>
    <div>
      <h2>Toasts</h2>
      <Crow gutter={8}>
        <Button
          tertiary
          on:click={notify.bind(undefined, { error: 'this is a error toast' })}
          style="color: hsl(var(--red));"
        >
          Error
        </Button>
        <Button
          tertiary
          on:click={notify.bind(undefined, { warning: 'this is a warning toast' })}
          style="color: hsl(var(--orange));"
        >
          Warning
        </Button>
        <Button
          tertiary
          on:click={notify.bind(undefined, { information: 'this is a information toast' })}
          style="color: hsl(var(--blue));"
        >
          Information
        </Button>
        <Button
          tertiary
          on:click={notify.bind(undefined, { success: 'this is a success toast' })}
          style="color: hsl(var(--green));"
        >
          Success
        </Button>
      </Crow>
    </div>
  </Crow>
</div>

<style>
  .components {
    margin: 0 auto;
    width: 700px;
    display: grid;
    padding: 40px;
    margin-top: 40px;
    border-radius: 5px;
  }
</style>
