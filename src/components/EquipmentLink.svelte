<script lang="ts">
  import CHARACTERS from '@/constants/CHARACTERS';

  let props = $props();

  const tier = (level: number) => {
    const tierLevel = Math.floor(props.level % 5);
    if (tierLevel === 0) return 'I';
    if (tierLevel === 1) return 'II';
    if (tierLevel === 2) return 'III';
    if (tierLevel === 3) return 'VI';
    if (tierLevel === 4) return 'V';
  };

  let character = $derived(app.characters[0] || CHARACTERS('elf'));
  let level = $derived(props.level);
</script>

<div
  class={tw('cursor-default border-b border-transparent leading-4 text-gray-600')}
  use:tooltip={{
    children: TooltipEquipment,
    props: { ...props, character: CHARACTERS(character, true) },
    direction: 'up'
  }}
>
  <div class="!grid h-5 !place-content-stretch">
    <div
      class={tw(
        'bg-gray-400 [clip-path:polygon(19px_0%,calc(100%-17px)_0%,calc(100%-17px)_100%,19px_100%)] [grid-area:1/1]',
        // level >= 2 && 'bg-gray-400',
        level >= 5 && 'bg-green-600',
        level >= 10 && 'bg-blue-600',
        level >= 15 && 'bg-purple-600',
        level >= 20 && 'bg-orange-600',
        level >= 25 && 'bg-red-600'
      )}
      style="
        mask: url('/images/brush-center.png') repeat-x 0 0 / auto 20px;
      "
    ></div>
    <div
      class={tw(
        'bg-gray-400 [clip-path:polygon(0_0,19px_0,19px_100%,0_100%)] [grid-area:1/1]',
        // level >= 2 && 'bg-gray-400',
        level >= 5 && 'bg-green-600',
        level >= 10 && 'bg-blue-600',
        level >= 15 && 'bg-purple-600',
        level >= 20 && 'bg-orange-600',
        level >= 25 && 'bg-red-600'
      )}
      style="
        mask: url('/images/brush-left.png') no-repeat 0 0 / auto 20px;
      "
    ></div>
    <div
      class={tw(
        'bg-gray-400 [clip-path:polygon(100%_0,100%_100%,calc(100%-17px)_100%,calc(100%-17px)_0)] [grid-area:1/1]',
        // level >= 2 && 'bg-gray-400',
        level >= 5 && 'bg-green-600',
        level >= 10 && 'bg-blue-600',
        level >= 15 && 'bg-purple-600',
        level >= 20 && 'bg-orange-600',
        level >= 25 && 'bg-red-600'
      )}
      style="
        mask: url('/images/brush-right.png') no-repeat 100% 0 / auto 20px;
      "
    ></div>
    <crow
      class="relative !flex-none -translate-y-[0.5px] px-2 text-center font-bold tracking-wide text-nowrap text-white [grid-area:1/1]"
      left
    >
      {props.name}
    </crow>
  </div>
  <!-- {tier(props.level)} -->
</div>
