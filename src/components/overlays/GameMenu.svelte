<script lang="ts">
  import { SETTINGS_DEFAULT_VOLUME } from '@/app.svelte';

  let { onclick } = $props();

  const prettyVolume = (value: number) => {
    return `${(value * 100) | 0}%`;
  };
</script>

{#snippet displayMasterVolume()}
  <crow class="w-10 p-2 text-sm">{prettyVolume(app.settings.volume.master)}</crow>
{/snippet}
{#snippet displayAmbientVolume()}
  <crow class="w-10 p-2 text-sm">{prettyVolume(app.settings.volume.ambient)}</crow>
{/snippet}
{#snippet displaySFXVolume()}
  <crow class="w-10 p-2 text-sm">{prettyVolume(app.settings.volume.sfx)}</crow>
{/snippet}
{#snippet displayCombatVolume()}
  <crow class="w-10 p-2 text-sm">{prettyVolume(app.settings.volume.combat)}</crow>
{/snippet}

<Frame title="options">
  <crow left class="w-full !justify-between text-white">
    <span class="cinzel">Audio settings</span>

    <Button
      secondary
      disabled={JSON.stringify(app.settings.volume) === JSON.stringify(SETTINGS_DEFAULT_VOLUME)}
      onclick={() => {
        app.settings.volume = SETTINGS_DEFAULT_VOLUME;
      }}
    >
      Reset to default
    </Button>
  </crow>
  <crow class="w-full gap-4">
    <div class="w-40">Master</div>
    <input
      use:tooltip={{
        children: displayMasterVolume,
        direction: 'right',
        lockInPlace: true
      }}
      type="range"
      min="0"
      max="1"
      step="0.05"
      bind:value={app.settings.volume.master}
      class="w-full"
    />
  </crow>
  <crow class="w-full gap-4">
    <div class="w-40">Ambient</div>
    <input
      use:tooltip={{
        children: displayAmbientVolume,
        direction: 'right',
        lockInPlace: true
      }}
      type="range"
      min="0"
      max="1"
      step="0.05"
      bind:value={app.settings.volume.ambient}
      class="w-full"
    />
  </crow>
  <crow class="w-full gap-4">
    <div class="w-40">Sound effect</div>
    <input
      use:tooltip={{
        children: displaySFXVolume,
        direction: 'right',
        lockInPlace: true
      }}
      type="range"
      min="0"
      max="1"
      step="0.05"
      bind:value={app.settings.volume.sfx}
      class="w-full"
    />
  </crow>
  <crow class="w-full gap-4">
    <div class="w-40">Combat</div>
    <input
      use:tooltip={{
        children: displayCombatVolume,
        direction: 'right',
        lockInPlace: true
      }}
      type="range"
      min="0"
      max="1"
      step="0.05"
      bind:value={app.settings.volume.combat}
      class="w-full"
    />
  </crow>

  <Hr class="via-white/20" />

  <Button secondary onclick={() => (app.overlay = 'ReleaseNotes')}>Release notes</Button>
  {#if app.token}
    <Logout />
  {/if}
</Frame>

<Close {onclick} />
