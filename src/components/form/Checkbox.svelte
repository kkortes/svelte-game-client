<script>
  export let id = '';
  export let value = false;
</script>

<div class="checkbox">
  <label for={id}>
    <input type="checkbox" {id} checked={value} on:change />
    <div class="box">
      <Icon name="check" color="hsl(var(--green))" size={18} />
    </div>
    <div class="text">
      <slot />
    </div>
  </label>
</div>

<style>
  .checkbox {
    display: flex;
  }
  .text {
    overflow: hidden;
  }
  input {
    display: none;
  }
  :global(input:checked + .box .icon.icon) {
    display: flex !important;
  }
  label {
    display: block;
  }
  .box {
    width: 18px;
    height: 18px;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    place-items: center;
    margin-right: 4px;
    background: hsl(var(--form-bg-color));
    float: left;
    border-radius: 3px;
  }
  :global(.checkbox .box .icon.icon) {
    display: none !important;
    text-shadow: none;
  }
</style>
