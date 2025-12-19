<div class="group/sidebar h-full">
  <div
    class={tw(
      'sticky top-0 w-18 transition-[width] duration-300 group-hover/sidebar:w-72',
      app.settings.lockSidebar && 'w-60'
    )}
  >
    <div class="crow vertical up gap-6 px-4">
      <a href="/" class="leading-0">
        <icon
          style={`--icon: var(--icon-logo-apeegg); color: var(--color-contrast);`}
          class={tw(
            'aspect-[1.75/1]! w-auto! text-2xl transition-all duration-300 group-hover/sidebar:text-6xl',
            app.settings.lockSidebar && 'text-6xl'
          )}
        ></icon>
      </a>

      <SidebarNav />
    </div>
  </div>
</div>
