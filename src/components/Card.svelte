<script lang="ts">
  let { name, image, type, subtypes, keywords, text, colors, cost, icon } = $props();
  let { radialFrom, radialVia, radialTo, regularBg, darkestBg, border, textBright } =
    $derived(colors);

  let hidden = $state(true);
</script>

<button onclick={() => (hidden = !hidden)}>
  {hidden ? 'Show' : 'Hide'}
</button>

<div
  class={tw(
    'crow relative aspect-[0.714/1] w-70 rounded-xl bg-[url(/static/images/grid.png)] bg-size-[40px_100px] [grid-area:1/1]',
    hidden && 'overflow-hidden'
  )}
>
  <div class={tw('grid! h-full w-full mix-blend-multiply')}>
    <div class="grid! [grid-area:1/1]">
      <div
        class={tw(
          'grid! aspect-[0.714/1] rounded-xl bg-radial p-3 [grid-area:1/1]',
          radialFrom,
          radialVia,
          radialTo
        )}
      >
        <inner-frame
          class={tw(
            'relative rounded-sm border-2 [grid-area:1/1]',
            border,
            regularBg,
            hidden && 'overflow-hidden'
          )}
        >
          <div class="grid! [grid-area:1/1]">
            <!-- inner under start -->
            <div class={tw('grid! aspect-[0.694/1] rounded-xl p-1 [grid-area:1/1]')}>
              <inner-frame
                class={tw(
                  'relative rounded-sm border [grid-area:1/1]',
                  border,
                  darkestBg,
                  hidden && 'overflow-hidden'
                )}
              >
                {#if icon}
                  <circle-border
                    class={tw(
                      'crow absolute top-0 right-0 aspect-square w-[74px] translate-x-[calc(50%-15px)] -translate-y-[calc(50%-15px)] rounded-full border',
                      regularBg,
                      border
                    )}
                  ></circle-border>
                {:else}
                  <circle-border
                    class={tw(
                      'crow absolute top-0 right-0 aspect-square w-13 translate-x-[calc(50%+13.5px)] -translate-y-[calc(50%+13.5px)] rounded-full border',
                      regularBg,
                      border
                    )}
                  ></circle-border>
                {/if}

                <circle-border
                  class={tw(
                    'crow absolute top-0 left-0 aspect-square w-13 -translate-x-[calc(50%+13.5px)] -translate-y-[calc(50%+13.5px)] rounded-full border',
                    regularBg,
                    border
                  )}
                ></circle-border>
                <circle-border
                  class={tw(
                    'crow absolute bottom-0 left-0 aspect-square w-13 -translate-x-[calc(50%+13.5px)] translate-y-[calc(50%+13.5px)] rounded-full border',
                    regularBg,
                    border
                  )}
                ></circle-border>
                <circle-border
                  class={tw(
                    'crow absolute right-0 bottom-0 aspect-square w-13 translate-x-[calc(50%+13.5px)] translate-y-[calc(50%+13.5px)] rounded-full border',
                    regularBg,
                    border
                  )}
                ></circle-border>

                <card-name
                  class={tw(
                    'crow font-averia w-full -translate-y-1.5 p-2 px-3 text-2xl text-white capitalize',
                    icon && 'left',
                    !icon && 'text-center'
                  )}
                >
                  {name || icon}<br />
                </card-name>
              </inner-frame>
            </div>

            {#if icon}
              <circle-mask
                class={tw(
                  'crow mask-(--icon-circle) mask-size-[72px] mask-position-[calc(100%+16px)_calc(0%-16px)] mask-no-repeat [grid-area:1/1]',
                  regularBg
                )}
              >
              </circle-mask>
            {:else}
              <circle-mask
                class={tw(
                  'crow mask-(--icon-circle) mask-size-[52px] mask-position-[calc(100%+35.25px)_calc(0%-35.25px)] mask-no-repeat [grid-area:1/1]',
                  regularBg
                )}
              >
              </circle-mask>
            {/if}
            <circle-mask
              class={tw(
                'crow mask-(--icon-circle) mask-size-[52px] mask-position-[calc(0%-35.25px)_calc(0%-35.25px)] mask-no-repeat [grid-area:1/1]',
                regularBg
              )}
            >
            </circle-mask>
            <circle-mask
              class={tw(
                'crow mask-(--icon-circle) mask-size-[52px] mask-position-[calc(0%-35.25px)_calc(100%+35.25px)] mask-no-repeat [grid-area:1/1]',
                regularBg
              )}
            >
            </circle-mask>
            <circle-mask
              class={tw(
                'crow mask-(--icon-circle) mask-size-[52px] mask-position-[calc(100%+35.25px)_calc(100%+35.25px)] mask-no-repeat [grid-area:1/1]',
                regularBg
              )}
            >
            </circle-mask>

            <!-- inner under end -->
          </div>
          <card-content class={tw('vertical crow down absolute -inset-x-px top-10 h-81.5!')}>
            <div
              class={tw(
                'w-full flex-1 rounded-xl border',
                type === 'god' && 'absolute inset-0',
                type !== 'god' && 'relative',
                border,
                regularBg
              )}
            >
              {#if icon}
                <div
                  class={tw(
                    'absolute -top-14.25 -right-4 aspect-square w-[72px] rounded-full',
                    regularBg
                  )}
                ></div>
              {/if}
              <card-image
                class={tw(
                  'absolute inset-1 rounded-lg border bg-position-[center_center] bg-no-repeat',
                  type === 'relic' && 'bg-size-[auto_80%] bg-position-[center_calc(50%-10px)]',
                  type !== 'relic' && 'bg-cover',
                  border,
                  image
                )}
              >
              </card-image>
              <div class={tw('absolute inset-y-0 left-0 w-1', regularBg)}></div>
              <div class={tw('absolute inset-y-0 right-0 w-1', regularBg)}></div>
            </div>

            <card-text-box class="crow left vertical relative w-full flex-none! text-white">
              <crow
                class={tw(
                  'absolute left-3 gap-0 text-xs text-white',
                  type !== 'god' && '-top-6.5',
                  type === 'god' && 'top-5.5'
                )}
              >
                <div
                  class={tw(
                    'font-viga -mx-[0.75px] bg-black/65 pr-2 pl-1.5 text-white capitalize italic drop-shadow-lg [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]'
                  )}
                >
                  {type}
                </div>
                {#each subtypes as subtype, i}
                  <div
                    class={tw(
                      'font-viga -mx-[0.75px] pr-2 pl-1.5 capitalize italic [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]',
                      ['relic'].includes(type) ? darkestBg : regularBg
                    )}
                  >
                    {subtype}
                  </div>
                {/each}
              </crow>

              {#if keywords.length > 0 || text}
                <div
                  class={tw(
                    'crow left vertical font-finlandica gap-2 p-4 pt-2 text-xs',
                    type === 'god' &&
                      'mx-1.5 mb-1.5 w-auto! bg-linear-to-t from-black/50 via-black/75 to-transparent px-2.5 pt-12 pb-2.5',
                    type === 'god' && border
                  )}
                >
                  {#if keywords.length > 0}
                    <div>
                      <crow class="text-xs text-white">
                        {#each keywords as keyword}
                          {@const color =
                            (
                              {
                                aggressive: 'bg-red-600',
                                swift: 'bg-yellow-600'
                              } as any
                            )[keyword] || 'bg-black/65 text-white'}
                          <div
                            class={tw(
                              'font-viga -mx-[0.75px] pr-2 pl-1.5 capitalize italic [clip-path:polygon(5px_0%,100%_0%,calc(100%-5px)_100%,0%_100%)]',
                              color
                            )}
                          >
                            {keyword}
                          </div>
                        {/each}
                      </crow>
                    </div>
                  {/if}

                  {@html text}
                </div>
              {/if}
            </card-text-box>
          </card-content>

          {#if icon}
            <circle-border
              class={tw(
                'crow absolute aspect-square w-16 flex-none! rounded-full border-2',
                regularBg,
                border
              )}
              style="top: -12px; right: -12px;"
            ></circle-border>
          {:else}
            <circle-border
              class={tw(
                'crow absolute -top-7 -right-7 aspect-square w-10 flex-none! rounded-full border-2',
                regularBg,
                border
              )}
            ></circle-border>
          {/if}

          <circle-border
            class={tw(
              'crow absolute -top-7 -left-7 aspect-square w-10 flex-none! rounded-full border-2',
              regularBg,
              border
            )}
          ></circle-border>
          <circle-border
            class={tw(
              'crow absolute -bottom-7 -left-7 aspect-square w-10 flex-none! rounded-full border-2',
              regularBg,
              border
            )}
          ></circle-border>
          <circle-border
            class={tw(
              'crow absolute -right-7 -bottom-7 aspect-square w-10 flex-none! rounded-full border-2',
              regularBg,
              border
            )}
          ></circle-border>
        </inner-frame>
      </div>

      {#if icon}
        <circle-mask
          class={tw(
            'crow pointer-events-none bg-radial mask-(--icon-circle) mask-size-[60px] mask-position-[calc(100%-4px)_calc(0%+4px)] mask-no-repeat [grid-area:1/1]',
            radialFrom,
            radialVia,
            radialTo
          )}
        >
        </circle-mask>
      {:else}
        <circle-mask
          class={tw(
            'crow pointer-events-none bg-radial mask-(--icon-circle) mask-size-[36px] mask-position-[calc(100%+12px)_calc(0%-12px)] mask-no-repeat [grid-area:1/1]',
            radialFrom,
            radialVia,
            radialTo
          )}
        >
        </circle-mask>
      {/if}
      <circle-mask
        class={tw(
          'crow pointer-events-none bg-radial mask-(--icon-circle) mask-size-[36px] mask-position-[calc(0%-12px)_calc(0%-12px)] mask-no-repeat [grid-area:1/1]',
          radialFrom,
          radialVia,
          radialTo
        )}
      >
      </circle-mask>
      <circle-mask
        class={tw(
          'crow pointer-events-none bg-radial mask-(--icon-circle) mask-size-[36px] mask-position-[calc(0%-12px)_calc(100%+12px)] mask-no-repeat [grid-area:1/1]',
          radialFrom,
          radialVia,
          radialTo
        )}
      >
      </circle-mask>
      <circle-mask
        class={tw(
          'crow pointer-events-none bg-radial mask-(--icon-circle) mask-size-[36px] mask-position-[calc(100%+12px)_calc(100%+12px)] mask-no-repeat [grid-area:1/1]',
          radialFrom,
          radialVia,
          radialTo
        )}
      >
      </circle-mask>
      {#if icon}
        <circle-mana
          class={tw(
            'crow absolute top-2.5 right-2.5 aspect-square w-12 rounded-full border',
            border,
            darkestBg
          )}
        >
          {#if Number.isInteger(cost)}
            <span class={tw('font-cabin text-4xl leading-0 font-bold text-white')}>
              {cost}
            </span>
          {:else}
            <icon
              class={tw('aspect-square w-10 text-4xl', textBright)}
              style="--icon: var(--icon-{icon});"
            ></icon>
          {/if}
        </circle-mana>
      {/if}
    </div>
  </div>
</div>
