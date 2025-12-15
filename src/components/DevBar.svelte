<script lang="ts">
  let expGain = $state(40);

  const gainExp = () => (app.experience += expGain);
</script>

<crow up class="glass sticky top-0">
  <crow vertical left class="gap-1 p-2"> </crow>
  <crow vertical left class="p-2">
    <div>
      Time sync (server): {new Date(app.serverTimestampSnapshot).toLocaleString()}
    </div>
    <div>
      Time (server): {new Date(app.serverTimestamp).toLocaleString()}
    </div>
  </crow>
  <crow vertical left class="gap-1 p-2">
    <crow class="gap-1">
      <Input type="number" bind:value={expGain} small />
      <Button onclick={gainExp}>Gain exp</Button>
      <Button onclick={() => (app.experience = 0)}>Reset exp</Button>
    </crow>
  </crow>
</crow>
