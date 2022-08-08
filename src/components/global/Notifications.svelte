<script>
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
      success: "Let's go!",
      warning: 'Heads up!'
    }[type]);

  const reset = () => ((animating = false), removeFirstNotification());

  const removeFirst = (items) => {
    if (items.length && !animating) {
      animation = ref.animate(
        {
          transform: 'translateY(-72px)'
        },
        {
          delay: 3000,
          duration: 600,
          easing: 'ease'
        }
      );
      requestAnimationFrame(() => (animating = true));

      animation.onfinish = reset;
    }
  };

  $: ref && removeFirst([...$notifications]);

  const hover = (enter) => ((freeze = enter), animation[enter ? 'pause' : 'play']());
</script>

<div
  class="notifications"
  class:animating
  class:freeze
  bind:this={ref}
  on:mouseenter={hover.bind(undefined, true)}
  on:mouseleave={hover.bind(undefined, false)}
>
  <Crow vertical gutter={4} right>
    {#each [...$notifications] as notification (notification)}
      {@const { type, message } = JSON.parse(notification)}
      <div>
        <div in:fly={{ x: 50 }}>
          <div class="notification {type}">
            <Crow gutter={4}>
              <div class="icon {type}">
                <Icon name={type} size={20} color="#fff" />
              </div>
              <div>
                <strong>{titleByType(type)}</strong>
                <div class="message">
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
  .message {
    max-width: 200px;
  }
  .message::first-letter {
    text-transform: uppercase;
  }
  strong {
    color: #000;
    font-size: 16px;
    letter-spacing: 0.5px;
  }
  .icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: grid;
    place-items: center;
  }
  .icon.error {
    background-color: hsl(var(--red));
  }
  .icon.warning {
    background-color: hsl(var(--orange));
  }
  .icon.information {
    background-color: hsl(var(--blue));
  }
  .icon.success {
    background-color: hsl(var(--green));
  }
  :global(.notifications.animating > .crow > div:first-child) {
    transition: opacity 400ms ease 3000ms;
    opacity: 0;
  }
  :global(.notifications.freeze > .crow > div:first-child) {
    transition: opacity 150ms ease;
    opacity: 1;
  }
  .notifications {
    position: fixed;
    top: 8px;
    right: 8px;
    color: hsl(var(--gray));
  }
  .notification {
    background-color: #fff;
    padding: 12px;
    border-left: 4px solid #fff;
    font-size: 14px;
    border-radius: 3px;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.15);
  }
  .notification:first-letter {
    text-transform: uppercase;
  }
  .error {
    border-color: hsl(var(--red));
  }
  .warning {
    border-color: hsl(var(--orange));
  }
  .success {
    border-color: hsl(var(--green));
  }
  .information {
    border-color: hsl(var(--blue));
  }
</style>
