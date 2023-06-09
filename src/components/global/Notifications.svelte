<script>
  import { tick } from 'svelte';
  import { fly } from 'svelte/transition';

  const { notifications } = STORES;
  const { removeFirstNotification } = ACTIONS;

  let ref;
  let animation = {};
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
    const { height } = ref.getBoundingClientRect();
    if (items.length && !animating && height) {
      animation = ref.animate(
        {
          transform: `translateY(-${height}px)`
        },
        {
          delay: 3000,
          duration: 600,
          easing: 'ease'
        }
      );
      animating = true;

      animation.onfinish = () => {
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

  const hover = (enter) => ((freeze = enter), animation[enter ? 'pause' : 'play']());
</script>

<div
  class="fixed top-8 right-2 text-gray-500"
  class:animating
  class:freeze
  bind:this={ref}
  on:mouseenter={hover.bind(undefined, true)}
  on:mouseleave={hover.bind(undefined, false)}
>
  <Crow vertical right>
    {#each [...$notifications] as notification (notification)}
      {@const { type, message } = JSON.parse(notification)}
      <div>
        <div in:fly={{ x: 50 }}>
          <div
            class={tw(
              'notification mb-2 p-3 glass',
              type === 'error' && 'border-red-500',
              type === 'warning' && 'border-orange-500',
              type === 'information' && 'border-blue-500',
              type === 'success' && 'border-green-500'
            )}
          >
            <Crow gap={6}>
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
                <strong class="text-black text-base">{titleByType(type)}</strong>
                <div class="max-w-xs first-letter:capitalize">
                  {message.replace('Error: ', '')}
                </div>
              </div>
            </Crow>
          </div>
        </div>
      </div>
    {/each}
  </Crow>
</div>

<style>
  :global(.notifications.animating > .crow > div:first-child) {
    transition: opacity 400ms ease 3000ms;
    opacity: 0;
  }
  :global(.notifications.freeze > .crow > div:first-child) {
    transition: opacity 150ms ease;
    opacity: 1;
  }
</style>
