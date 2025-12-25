<script lang="ts">
  import { page } from '$app/stores';

  const hasActiveChild = (subs: any) => subs.some((sub: any) => $page.route.id === sub.href);

  const exampleSubs = [{ title: 'Login', href: '/example/login' }];

  const menuItems = $state([
    { title: 'Game&nbsp;Guide', href: '/', icon: 'void' },
    { title: 'Components', href: '/components', icon: 'void' },
    { title: 'Colors', href: '/colors', icon: 'void' },
    { title: 'Cards', href: '/cards', icon: 'void' },
    {
      title: 'Examples',
      href: '/example-login',
      open: hasActiveChild(exampleSubs),
      subs: exampleSubs
    }
  ]);
</script>

<crow vertical up left class="gap-2">
  {#each menuItems as item (item.title)}
    {@const { title, href, subs, icon } = item}

    {#if subs}
      {@const hasActiveChild = subs.some((sub) => $page.route.id === sub.href)}
      <div class="group w-full">
        <Accordion
          bind:open={item.open}
          {title}
          icon={title.toLowerCase()}
          primary={hasActiveChild}
          forceClose={!app.settings.lockSidebar}
        >
          <crow class="w-full gap-2 pt-2 pl-8" vertical>
            {#each subs as sub (sub.title)}
              {@const { title: subTitle, href: subHref } = sub}
              <a
                href={subHref}
                tertiary
                class={tw(
                  'w-full py-1',
                  $page.route.id === subHref && 'bg-primary/90! text-foreground!',
                  $page.route.id !== subHref && 'hover:bg-primary/25! hover:text-foreground!'
                )}
              >
                {subTitle}
              </a>
            {/each}
          </crow>
        </Accordion>
      </div>
    {:else}
      <a
        {href}
        tertiary
        class={tw(
          'crow left w-full gap-3 overflow-hidden py-1',
          $page.route.id === href && 'bg-primary/90! text-foreground!',
          $page.route.id !== href && 'hover:bg-primary/25! hover:text-foreground!'
        )}
      >
        <icon style="--icon: var(--icon-{icon});"></icon>
        <span
          class={tw(
            'opacity-0 transition-opacity duration-300 group-hover/sidebar:opacity-100',
            app.settings.lockSidebar && 'opacity-100'
          )}
        >
          {@html title}
        </span>
      </a>
    {/if}
  {/each}
</crow>
