<script>
  import { recursiveLookup } from '$src/helpers';
  const { showTooltip, hideTooltip } = ACTIONS;
</script>

<a
  href="https://apeegg.com"
  target="_blank"
  class="logo"
  on:mouseenter={showTooltip.bind(undefined, 'Info', 'right')}
  on:mouseleave={({ toElement }) => !recursiveLookup(toElement, ['mouse-tracker']) && hideTooltip()}
>
  <Icon name="logo-apeegg" color="#000" size={80} />
</a>

<style>
  .logo {
    position: fixed;
    top: 12px;
    left: 12px;
    display: block;
  }
</style>
