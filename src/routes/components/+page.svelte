<script>
  const { notify, unlockKeys, lockKeys } = ACTIONS;
  const { keys } = STORES;

  $: ({ escape } = $keys);
</script>

<div class="grid p-10 rounded-md w-[43.75rem]">
  <div class="cy-up-left gap-10">
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
      <h2>Checkbox</h2>
      <Checkbox id="check-me">Check me</Checkbox>
    </div>
    <div>
      <h2>Dropdown</h2>
      <Dropdown
        options={['option 1', 'option 2']}
        on:change={({ target: { value } }) => console.info(value)}
      />
    </div>
    <div>
      <h2>Button</h2>
      <div class="cx gap-2">
        <Button primary on:click={console.info}>Primary</Button>
        <Button secondary on:click={console.info}>Secondary</Button>
        <Button tertiary on:click={console.info}>Tertiary</Button>
      </div>
    </div>
    <div>
      <h2>Toasts</h2>
      <div class="cx gap-2">
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
      </div>
    </div>
  </div>
</div>
