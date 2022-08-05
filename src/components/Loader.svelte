<script>
  let show = false;

  onMount(() => {
    show = true;
  });

  const fade = (_node, { duration, delay }) => ({
    duration,
    delay,
    css: (t) => `opacity: ${t};`
  });
</script>

{#if show}
  <div class="loader" in:fade={{ duration: 250, delay: 500 }}>
    <div class="stripe">
      <h1>
        <slot />
      </h1>
      <div class="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
{/if}

<style>
  .stripe {
    position: relative;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    width: 100%;
  }
  .stripe:before,
  .stripe:after {
    position: absolute;
    content: '';
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    height: 4px;
  }
  .stripe:before {
    bottom: calc(100% + 4px);
  }
  .stripe:after {
    top: calc(100% + 4px);
  }
  h1 {
    font-size: 28px;
  }
  .loader {
    position: fixed;
    inset: 0 -4px;
    display: grid;
    place-items: center;
    text-align: center;
    background: rgba(0, 0, 0, 0.25);
  }
  h1 {
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
    margin: 30px 0 0 0;
  }
  .lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 27px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.75);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 6px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 6px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 26px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 45px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
</style>
