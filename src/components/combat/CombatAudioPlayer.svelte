<script lang="ts">
  import { AUDIO } from '@/app.svelte';
  import type { SFX } from '@/types/sfx';

  let {
    audio,
    elapsedMilliseconds
  }: {
    audio: SFX[];
    elapsedMilliseconds: number;
  } = $props();

  let played: any[] = $state([]);
  let queue: any[] = $state([]);
  let raf: any = $state(null);

  $effect(() => {
    // reading queue here makes the effect depend on queue,
    // which is fine as long as we don't write back unnecessarily.
    const q = new Set(queue.map(({ id }) => id));
    const p = new Set(played.map(({ id }) => id));
    const incoming = audio.filter(
      ({ id, start }) => !q.has(id) && !p.has(id) && start > elapsedMilliseconds
    );

    // 🔑 guard: only assign if there is a change
    if (!incoming.length) return;

    // now we mutate once, which causes one extra run;
    // on the next run incoming will be empty, so no write, and it settles.
    queue = [...queue, ...incoming].sort((a, b) => a.start - b.start);
  });

  const playSfx = (sfx: any) => {
    const randomOne = sfx.variants[Math.floor(Math.random() * sfx.variants.length)];

    new Howl({
      src: AUDIO[randomOne],
      volume: app.settings.volume.combat * app.settings.volume.master
    }).play();
  };

  const loop = () => {
    while (queue.length && queue[0].start <= elapsedMilliseconds) {
      const [sfx, ...restOfQueue] = queue;
      played = [...played, sfx];
      queue = restOfQueue;
      playSfx(sfx);
    }

    raf = requestAnimationFrame(loop);
  };

  onMount(() => {
    raf = requestAnimationFrame(loop);
  });

  onDestroy(() => {
    if (raf != null) cancelAnimationFrame(raf);
  });
</script>

<!-- <pre>
{JSON.stringify(queue, null, 2)}
</pre> -->
