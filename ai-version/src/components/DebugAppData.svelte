<script lang="ts">
  let showSidebar = $state(false);

  const stringifyCircularJSON = (obj: any) => {
    const seen = new WeakSet();
    return JSON.stringify(
      obj,
      (_, value) => {
        if (value !== null && typeof value === 'object') {
          if (seen.has(value)) return;
          seen.add(value);
        }

        if (value === undefined) return null;

        return value;
      },
      2
    );
  };
</script>

<crow
  vertical
  up
  class={tw(
    'fixed top-20 bottom-0 left-[calc(100%-theme(spacing.2))] max-w-100 !flex-none overflow-hidden overflow-y-scroll pl-2 transition-transform duration-200',
    (showSidebar || app.settings.debugOpen) && '-translate-x-[calc(100%-theme(spacing.2))]'
  )}
  role="none"
  onmouseenter={() => (showSidebar = true)}
  onmouseleave={() => !app.settings.debugOpen && (showSidebar = false)}
>
  <crow left vertical up class={tw('glass')}>
    <div class="mb-0 w-full p-2 pb-0">
      <Headline text="Debug" small>
        <div>
          <Checkbox
            id="keepOpen"
            bind:value={app.settings.debugOpen}
            onchange={({ target: { checked } }: any) => (app.settings.debugOpen = checked)}
          >
            Keep open
          </Checkbox>
        </div>
      </Headline>
    </div>

    {#each Object.entries(app.dump()) as [key, value]}
      {@const isOpenable = typeof value === 'object'}
      {@const openValue = app.settings.openProperties?.[key]}
      {@const isOpen = isOpenable && !!openValue}
      <Clickable
        class={tw('w-full hover:cursor-pointer hover:bg-gray-500/20', isOpen && 'bg-gray-500/20')}
        onclick={() => {
          if (openValue) {
            delete app.settings.openProperties[key];
          } else {
            app.settings.openProperties[key] = true;
          }
        }}
      >
        <crow vertical left class="w-full">
          <crow class="w-full !justify-between" up left>
            <div class="px-2 py-1 font-bold">{key}</div>
            <crow>
              {#if isOpenable}
                <span>
                  {Math.max(
                    0,
                    Array.isArray(value) ? value.length : Object.keys(value || {}).length
                  )}
                </span>
              {:else}
                {value || value === 0 ? value : '-'}
              {/if}
              <crow class={tw('aspect-square w-8')}>
                {#if isOpenable}
                  <Icon
                    name="down"
                    class={tw(
                      '-rotate-90 text-xs transition-transform duration-200',
                      isOpen && 'rotate-0'
                    )}
                  />
                {/if}
              </crow>
            </crow>
          </crow>
          <Accordion {isOpen}>
            <crow up left class="w-full">
              <code class="text-left">
                <pre class="p-2 text-[10px]">
                    {stringifyCircularJSON(value)}
                    </pre>
              </code>
            </crow>
          </Accordion>
        </crow>
      </Clickable>
    {/each}
    <!-- <pre class="text-xs">{JSON.stringify(app.dump(), null, 2)}
    </pre> -->
  </crow>
</crow>
