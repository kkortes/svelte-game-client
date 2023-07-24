<script>
  import { tick } from 'svelte';
  import { fly } from 'svelte/transition';

  const { notifications } = STORES;
  const { removeFirstNotification } = ACTIONS;

  let ref;
  let animations = [];
  let animating = false;
  let freeze = false;

  const titleByType = (type) =>
    ({
      error: 'Ops, something went wrong!',
      information: 'Did you know?',
      success: 'Good news',
      warning: 'Heads up'
    }[type]);

  const removeFirst = async (items) => {
    if (!ref.children.length) return;
    const { height } = ref.children[0].getBoundingClientRect();
    if (items.length && !animating && height) {
      const timing = {
        delay: 3000,
        duration: 600,
        easing: 'ease'
      };
      animations.push(
        ref.animate(
          {
            transform: `translateY(-${height}px)`
          },
          timing
        )
      );
      animations.push(
        ref.children[0].animate(
          {
            opacity: 0
          },
          timing
        )
      );
      animating = true;

      animations[0].onfinish = () => {
        animations = [];
        animating = false;
        removeFirstNotification();
      };
    }
  };

  $: ref &&
    (async () => {
      await tick();
      removeFirst([...$notifications]);
    })();

  const hover = (enter) => (
    (freeze = enter), animations.map((animation) => animation[enter ? 'pause' : 'play']())
  );
</script>

<div
  class="fixed top-8 right-2 text-gray-500"
  class:animating
  class:freeze
  on:mouseenter={hover.bind(undefined, true)}
  on:mouseleave={hover.bind(undefined, false)}
>
  <div class="cy-right" bind:this={ref}>
    {#each [...$notifications] as notification (notification)}
      {@const { type, message } = JSON.parse(notification)}
      <div>
        <div in:fly={{ x: 50 }}>
          <div
            class={tw(
              'notification mb-2 pl-3 pr-5 py-3 glass',
              type === 'error' && 'border-red-500',
              type === 'warning' && 'border-orange-500',
              type === 'information' && 'border-blue-500',
              type === 'success' && 'border-green-500'
            )}
          >
            <div class="cx gap-2">
              <div
                class={tw(
                  'icon w-8 h-8 cx rounded-full',
                  type === 'error' && 'bg-red-500',
                  type === 'warning' && 'bg-orange-500',
                  type === 'information' && 'bg-blue-500',
                  type === 'success' && 'bg-green-500'
                )}
              >
                <Icon class="text-white text-lg" name={type} />
              </div>
              <div>
                <strong class="text-gray-800 text-base">{titleByType(type)}</strong>
                <div class="text-gray-700 max-w-xs first-letter:capitalize">
                  {message.replace('Error: ', '')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
