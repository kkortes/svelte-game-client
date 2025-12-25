<script lang="ts">
  import Shape from './ui/Shape.svelte';

  let { card, tailwindColor } = $props();
  let {
    name,
    image,
    type,
    subtypes,
    keywords,
    text,
    flavourText,
    cost,
    icon,
    rarity,
    damage,
    health
  } = $derived(card);

  const regularBg = $derived(`background-color: var(--color-${tailwindColor}-600);`);
  const darkestBg = $derived(`background-color: var(--color-${tailwindColor}-700);`);
  const radialFrom = $derived(`--tw-gradient-from: var(--color-${tailwindColor}-900);`);
  const radialVia = $derived(`--tw-gradient-via: var(--color-${tailwindColor}-400);`);
  const radialTo = $derived(`--tw-gradient-to: var(--color-${tailwindColor}-600);`);
  const border = $derived(`border-color: var(--color-${tailwindColor}-800);`);
  const textBright = $derived(`color: var(--color-${tailwindColor}-300);`);

  let hidden = $state(true);
</script>

<!-- <button onclick={() => (hidden = !hidden)}>
  {hidden ? 'Show' : 'Hide'}
</button> -->

{#snippet cardText()}
  <card-text-box class={tw('crow left vertical relative', type === 'god' && 'min-h-20')}>
    <crow
      class={tw(
        'absolute left-3.5 gap-0 text-xs text-white -top-7',
        type === 'god' && '-top-5 left-1.5'
      )}
    >
      <div style="filter: drop-shadow(1px 1px 1.5px rgb(0 0 0 / 0.1));">
        <div
          class={tw(
            'font-viga -mx-[0.75px] bg-black/65 pr-2 pl-1.5 text-white capitalize italic drop-shadow-lg [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]'
          )}
        >
          {type}
        </div>
      </div>
      {#each subtypes as subtype, i}
        <div style="filter: drop-shadow(1px 1px 1.5px rgb(0 0 0 / 0.1));">
          <div
            class={tw(
              'font-viga -mx-[0.75px] pr-2 pl-1.5 capitalize italic [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]'
            )}
            style={['relic'].includes(type) ? darkestBg : regularBg}
          >
            {subtype}
          </div>
        </div>
      {/each}
    </crow>

    {#if keywords.length > 0 || text || flavourText}
      <crow vertical class="gap-2 p-4 pt-2 w-full text-white font-finlandica text-xs">
        {#if keywords.length > 0}
          <div>
            <crow class="text-xs text-white pr-1">
              {#each keywords as keyword}
                {@const color =
                  (
                    {
                      aggressive: 'bg-red-600',
                      swift: 'bg-yellow-600',
                      echoing: 'bg-purple-600',
                      still: 'bg-sky-600',
                      sturdy: 'bg-brown-500',
                      regenerative: 'bg-green-600'
                    } as any
                  )[keyword] || 'bg-black/65 text-white'}
                <div style="filter: drop-shadow(1px 1px 1.5px rgb(0 0 0 / 0.1));">
                  <div
                    class={tw(
                      'font-viga -mx-[0.75px] pr-2 pl-1.5 capitalize italic [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]',
                      color
                    )}
                  >
                    {keyword}
                  </div>
                </div>
              {/each}
            </crow>
          </div>
        {/if}

        {@html text}
        {#if text && flavourText}
          <br />
        {/if}

        {#if flavourText}
          <span class="italic font-averia font-thin" style={textBright}>{@html flavourText}</span>
        {/if}
      </crow>
    {/if}
  </card-text-box>
{/snippet}

{#snippet darkBackground()}
  <div class={tw('grid! aspect-[0.694/1] rounded-xl p-1 [grid-area:1/1]')}>
    <inner-frame
      class={tw('relative rounded-sm border [grid-area:1/1]', hidden && 'overflow-hidden')}
      style="{darkestBg}{border}"
    >
      {#if icon}
        <big-circle-border
          class={tw(
            'crow absolute top-0 right-0 aspect-square w-[74px] translate-x-[calc(50%-15px)] -translate-y-[calc(50%-15px)] rounded-full border'
          )}
          style="{regularBg}{border}"
        ></big-circle-border>
      {/if}
    </inner-frame>
  </div>
{/snippet}

{#snippet cardContent()}
  <card-content
    class={tw(
      'vertical crow down absolute -inset-x-px top-10',
      type !== 'god' && 'h-81.5! top-10',
      type === 'god' && 'h-[calc(100%+2px)]! -top-px'
    )}
  >
    <!-- <big-circle-mask
      class={tw(
        'crow mask-(--icon-circle) mask-size-[72px] mask-position-[calc(100%+20px)_calc(0%-20px)] mask-no-repeat [grid-area:1/1]'
      )}
      style={regularBg}
    >
    </big-circle-mask> -->
    <div
      class={tw('w-full flex-1 rounded-xl border relative', type === 'god' && 'rounded-none')}
      style="{type === 'god'
        ? `background: radial-gradient(circle at 50% 80%, var(--color-${tailwindColor}-300), var(--color-${tailwindColor}-800), var(--color-${tailwindColor}-700));`
        : regularBg}{border}"
    >
      {#if icon && type !== 'god'}
        <big-circle-mask
          class={tw('absolute -top-14.25 -right-4 aspect-square w-[72px] rounded-full')}
          style={regularBg}
        ></big-circle-mask>
      {/if}

      <card-image
        class={tw(
          'absolute inset-1 rounded-lg overflow-hidden border bg-position-[center_center] bg-no-repeat',
          type === 'relic' && 'bg-size-[auto_80%] bg-position-[center_calc(50%-10px)]',
          type !== 'relic' && 'bg-cover',
          type === 'god' && 'rounded-t-[5px] rounded-b-[100px] bottom-6'
        )}
        style="
          background-image: url('/images/{image}');
          box-shadow: inset 0 0 10px oklch(from var(--color-{tailwindColor}-900) l c h / 0.4);
          {border}"
      >
        {#if type === 'god'}
          <crow
            down
            class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
          >
            <crow class="pb-3 up h-auto! w-full min-h-24 text-center">
              {@render cardText()}
            </crow>
          </crow>
        {/if}
        {#if damage !== 0 || health !== 0}
          <crow
            class="absolute z-10 border-r-0 border-b-0 rounded-br-sm rounded-tl-md -bottom-px -right-px pt-1 pl-1 h-12 border-1"
            style="{regularBg}{border}"
          >
            <crow
              class="w-full h-full px-1 border rounded-tl-sm rounded-br-md"
              style="{darkestBg}{border}"
            >
              <span class={tw('font-cabin text-4xl leading-0 font-bold text-white')}>
                {#if damage}{damage}{/if}{#if damage && health}/{/if}{#if health}{health}{/if}
              </span>
            </crow>
          </crow>
        {/if}
      </card-image>
      {#if type !== 'god'}
        <stripe class={tw('absolute left-11.5 right-11.5 z-10 top-0 h-1')} style={regularBg}
        ></stripe>

        <stripe class={tw('absolute inset-y-0 left-0 w-1')} style={regularBg}></stripe>
        <stripe class={tw('absolute inset-y-0 right-0 w-1')} style={regularBg}></stripe>
      {/if}
    </div>

    {#if type !== 'god'}
      {@render cardText()}
    {/if}
  </card-content>
{/snippet}

{#snippet innerUnder()}
  <div class={tw('grid! aspect-[0.694/1] rounded-xl p-1 [grid-area:1/1]')}>
    <inner-frame
      class={tw(
        'relative pointer-events-none rounded-sm border border-transparent [grid-area:1/1]',
        hidden && 'overflow-hidden'
      )}
    >
      {#if type !== 'god'}
        <circle-border
          class={tw(
            'crow absolute top-0 right-0 aspect-square w-13 translate-x-[calc(50%+13.5px)] -translate-y-[calc(50%+13.5px)] rounded-full border'
          )}
          style="{regularBg}{border}"
        ></circle-border>
        <circle-border
          class={tw(
            'crow absolute top-0 left-0 aspect-square w-13 -translate-x-[calc(50%+13.5px)] -translate-y-[calc(50%+13.5px)] rounded-full border'
          )}
          style="{regularBg}{border}"
        ></circle-border>
        <circle-border
          class={tw(
            'crow absolute bottom-0 left-0 aspect-square w-13 -translate-x-[calc(50%+13.5px)] translate-y-[calc(50%+13.5px)] rounded-full border'
          )}
          style="{regularBg}{border}"
        ></circle-border>
        <circle-border
          class={tw(
            'crow absolute right-0 bottom-0 aspect-square w-13 translate-x-[calc(50%+13.5px)] translate-y-[calc(50%+13.5px)] rounded-full border'
          )}
          style="{regularBg}{border}"
        ></circle-border>
      {/if}

      <card-name
        class={tw(
          'crow font-averia relative w-full -translate-y-1.5 p-2 px-3 text-2xl text-white capitalize',
          icon && 'left',
          !icon && 'text-center',
          type === 'god' && 'text-3xl pt-2.5'
        )}
        style={type === 'god' ? textBright : ''}
      >
        <crow class="text-shadow-[0_0_2px_rgba(0,0,0,1)]" left>
          <span
            style="
            {type === 'god'
              ? `color:var(--color-${tailwindColor}-800);-webkit-text-fill-color: var(--color-${tailwindColor}-200);-webkit-text-stroke-width: 0.5px;`
              : ''}
            "
          >
            {@html name}
          </span>
        </crow>
      </card-name>
    </inner-frame>
  </div>

  {#if type !== 'god'}
    <circle-mask
      class={tw(
        'crow pointer-events-none mask-(--icon-circle) mask-size-[52px] mask-position-[calc(100%+35.25px)_calc(0%-35.25px)] mask-no-repeat [grid-area:1/1]'
      )}
      style={regularBg}
    >
    </circle-mask>

    <circle-mask
      class={tw(
        'crow pointer-events-none mask-(--icon-circle) mask-size-[52px] mask-position-[calc(0%-35.25px)_calc(0%-35.25px)] mask-no-repeat [grid-area:1/1]'
      )}
      style={regularBg}
    >
    </circle-mask>
    <circle-mask
      class={tw(
        'crow pointer-events-none mask-(--icon-circle) mask-size-[52px] mask-position-[calc(0%-35.25px)_calc(100%+35.25px)] mask-no-repeat [grid-area:1/1]'
      )}
      style={regularBg}
    >
    </circle-mask>
    <circle-mask
      class={tw(
        'crow pointer-events-none mask-(--icon-circle) mask-size-[52px] mask-position-[calc(100%+35.25px)_calc(100%+35.25px)] mask-no-repeat [grid-area:1/1]'
      )}
      style={regularBg}
    >
    </circle-mask>
  {/if}
{/snippet}

{#snippet circleBorder(classes: string)}
  <circle-border
    class={tw(
      'crow absolute aspect-square w-10 flex-none! rounded-full border-2',
      classes,
      type === 'god' && 'rounded-none rotate-45 w-9 opacity-0'
    )}
    style="{regularBg}{border}"
  ></circle-border>
{/snippet}

<div
  class={tw(
    'crow relative aspect-[0.714/1] w-70 rounded-xl bg-[url(/images/grid.png)] bg-size-[40px_100px] [grid-area:1/1]',
    hidden && 'overflow-hidden'
  )}
>
  <div class={tw('grid! h-full w-full mix-blend-multiply')}>
    <div class="grid! [grid-area:1/1]">
      <div
        class={tw(
          'grid! aspect-[0.714/1] rounded-xl bg-radial from-transparent via-transparent to-green p-3 [grid-area:1/1]'
        )}
        style="{radialFrom}{radialVia}{radialTo}"
      >
        <interior-frame
          class={tw('relative rounded-sm border-2 [grid-area:1/1]', hidden && 'overflow-hidden')}
          style="{regularBg}{border}"
        >
          <interior class="grid! [grid-area:1/1]">
            {@render darkBackground()}
            {@render cardContent()}
            {@render innerUnder()}
          </interior>

          {#if icon && type !== 'god'}
            <big-circle-border
              class={tw('crow absolute aspect-square w-16 flex-none! rounded-full border-2')}
              style="top: -12px; right: -12px;{regularBg}{border}"
            ></big-circle-border>
          {/if}

          {@render circleBorder('-top-7 -right-7')}
          {@render circleBorder('-top-7 -left-7')}
          {@render circleBorder('-bottom-7 -left-7')}
          {@render circleBorder('-right-7 -bottom-7')}
        </interior-frame>
      </div>

      {#if icon && type !== 'god'}
        <big-circle-mask
          class={tw(
            `crow pointer-events-none bg-radial from-transparent via-transparent to-transparent mask-(${type === 'god' ? '--icon-' : '--icon-circle'}) mask-size-[60px] mask-position-[calc(100%-4px)_calc(0%+4px)] mask-no-repeat [grid-area:1/1]`
          )}
          style="{radialFrom}{radialVia}{radialTo}"
        >
        </big-circle-mask>
      {/if}

      {#if type !== 'god'}
        <circle-mask
          class={tw(
            `crow pointer-events-none bg-radial from-transparent via-transparent to-transparent mask-(${type === 'god' ? '--icon-' : '--icon-circle'}) mask-size-[36px] mask-position-[calc(100%+12px)_calc(0%-12px)] mask-no-repeat [grid-area:1/1]`
          )}
          style="{radialFrom}{radialVia}{radialTo}"
        >
        </circle-mask>
        <circle-mask
          class={tw(
            `crow pointer-events-none bg-radial from-transparent via-transparent to-transparent mask-(${type === 'god' ? '--icon-' : '--icon-circle'}) mask-size-[36px] mask-position-[calc(0%-12px)_calc(0%-12px)] mask-no-repeat [grid-area:1/1]`
          )}
          style="{radialFrom}{radialVia}{radialTo}"
        >
        </circle-mask>
        <circle-mask
          class={tw(
            `crow pointer-events-none bg-radial from-transparent via-transparent to-transparent mask-(${type === 'god' ? '--icon-' : '--icon-circle'}) mask-size-[36px] mask-position-[calc(0%-12px)_calc(100%+12px)] mask-no-repeat [grid-area:1/1]`
          )}
          style="{radialFrom}{radialVia}{radialTo}"
        >
        </circle-mask>
        <circle-mask
          class={tw(
            `crow pointer-events-none bg-radial from-transparent via-transparent to-transparent mask-(${type === 'god' ? '--icon-square' : '--icon-circle'}) mask-size-[36px] mask-position-[calc(100%+12px)_calc(100%+12px)] mask-no-repeat [grid-area:1/1]`
          )}
          style="{radialFrom}{radialVia}{radialTo}"
        >
        </circle-mask>
      {/if}

      <!-- start: border bottom decor -->
      <crow
        class="absolute border-1 border-b-0 border-l-0 rounded-full w-7 h-7 bottom-px left-0"
        style="{border}background-color: var(--color-{tailwindColor}-500);"
      >
        <icon class="text-lg text-black" style="--icon: var(--icon-plant);"></icon>
      </crow>

      <crow
        class={tw(
          'absolute border-1 border-b-0 rounded-full w-6 h-6 bottom-0 left-1/2 -translate-x-1/2',
          type === 'god' && 'border-2 border-b-0 w-15 h-14.5 bottom-0.5'
        )}
        style="{border}background-color: var(--color-{tailwindColor}-400);"
      >
        <Shape {rarity} />
      </crow>

      {#if icon}
        <circle-mana
          class={tw(
            'crow absolute top-2.5 right-2.5 aspect-square bg-gray-300 w-12 rounded-full border',
            type === 'god' && 'top-auto w-12 bottom-1.5 right-auto left-1/2 -translate-x-1/2'
          )}
          style="{border}{cost === undefined ? darkestBg : ''}"
        >
          {#if cost !== undefined}
            <span class={tw('font-cabin text-4xl leading-0 font-bold text-black')} style="">
              <!-- color:var(--color-{tailwindColor}-200); -->
              <!-- -webkit-text-fill-color:#fff;-webkit-text-stroke-width: 1px;-->
              {cost}
            </span>
          {:else}
            <icon
              class={tw('aspect-square w-10 text-4xl')}
              style="--icon: var(--icon-{icon});{textBright}"
            ></icon>
          {/if}
        </circle-mana>
      {/if}

      <crow
        class="gap-2 absolute justify-between! -bottom-[0.5px] inset-x-6 text-[9px] text-black/50 font-viga"
      >
        <crow class="gap-2 ml-1.5">
          <crow class="gap-0.5"> [CS] 1/137 </crow>
          <crow class="gap-0.5"> </crow>
        </crow>
        <crow class="gap-0.5">
          <icon class="text-[8px]" style="--icon: var(--icon-quill);"></icon>
          Wyndagger
        </crow>
      </crow>
      <!-- end: border bottom decor -->
    </div>
  </div>
</div>
