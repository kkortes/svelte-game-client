<script>
  const { notify, unlockKeys, lockKeys } = ACTIONS;
  const { keys } = STORES;

  $: ({ escape } = $keys);
</script>

<div class="components">
  <Crow vertical left gap={20}>
    <div>
      <h2>Input</h2>
      <Input
        placeholder="Type something"
        on:keyup={(e) => console.info(e.target.value)}
        on:blur={unlockKeys}
        on:focus={lockKeys}
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
      <Crow gap={8}>
        <Button primary on:click={console.info}>Primary</Button>
        <Button secondary on:click={console.info}>Secondary</Button>
        <Button tertiary on:click={console.info}>Tertiary</Button>
      </Crow>
    </div>
    <div>
      <h2>Toasts</h2>
      <Crow gap={8}>
        <Button
          tertiary
          on:click={notify.bind(undefined, { error: 'this is a error toast' })}
          class="text-red-500"
        >
          Error
        </Button>
        <Button
          tertiary
          on:click={notify.bind(undefined, {
            warning: 'this is a warning toast'
          })}
          class="text-orange-500"
        >
          Warning
        </Button>
        <Button
          tertiary
          on:click={notify.bind(undefined, { information: 'this is a information toast' })}
          class="text-blue-500"
        >
          Information
        </Button>
        <Button
          tertiary
          on:click={notify.bind(undefined, { success: 'this is a success toast' })}
          class="text-green-500"
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
