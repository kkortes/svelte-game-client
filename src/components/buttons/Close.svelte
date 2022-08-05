<div on:click class="close">
  <Icon name="cross" color="red" size={18} />
</div>

<style>
  .close {
    background: rgba(0, 0, 0, 0.75);
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
  .close:active {
    transform: translateY(1px);
  }
</style>
