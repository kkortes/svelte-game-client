<script lang="ts">
  let {
    text,
    confirm,
    close
  }: {
    text: string;
    confirm: () => void;
    close: () => void;
  } = $props();
</script>

<Frame title="Confirmation">
  <crow vertical class="w-full gap-4 text-center">
    <div>
      {@html text}
    </div>
    <Hr class="my-0 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
    <crow class="gap-2">
      <Button secondary onclick={close}>Cancel</Button>
      <Button primary onclick={() => (confirm(), close())}>Confirm</Button>
    </crow>
  </crow>
</Frame>
