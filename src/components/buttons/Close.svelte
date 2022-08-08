<div on:click class="close">
  <Icon name="cross" color="hsla(var(--gray), .5)" size={14} />
</div>

<style>
  .close {
    position: absolute;
    top: 0;
    right: 0;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
  }
  .close:active {
    transform: translateY(1px);
  }
</style>
