# Battle Brawlers

Strategy auto-battler. Rewrite in progress on `chore/major-rewrite-to-stylecheat-and-vibe`.

## Vibe quirks to revisit

Workarounds we've inherited or introduced during the Vibe + Stylecheat rewrite.
Tracked here so we can clean them up once Vibe gains the relevant feature.
Full design notes live in `vibe/.claude/feedback-from-battle-brawlers.md`.

### `data-src` instead of `src` on `<img>` for static images

Vibe transiently writes the literal text `@[image]` to `src` before the
binding resolves, causing a real 404 fetch. Workaround: use `data-src` and let
`js/boot.js` copy it to `src` after mount.

```html
<img data-src="/static/images/races/@[image]" />
```

Affected files: `CharacterAvatar.html`, `BrawlerSlot.html`, `Sidebar.html`,
`FightDetailContent.html`, `pages/the-arena.html`, plus the sweep at
`js/boot.js:230-234`. Once Vibe stops writing un-resolved literals to URL
attrs (or ships `ready-src`), drop the sweep and use plain `src`.

### `onerror` guard against the literal `@[...]` flash

`components/CombatantImage.html:23`:

```html
<img src="@[card.imageUrl]"
  onerror="if(!this.src.includes('@['))this.style.display='none'" />
```

Same root cause as above, but for images whose `src` updates *reactively*
(can't be statically swapped to `data-src`). The guard suppresses the bogus
`onerror` that fires when `src` briefly equals the literal binding text.
Remove once Vibe holds URL attrs until binding resolution.

### `JSON.stringify` / `JSON.parse` through `data-*` to pass iteration items to inline handlers

`AbilityBar.html`, `BrawlerDetailContent.html` — inline `onmouseenter` can't
see the iteration variable, so the whole object is round-tripped through a
`data-*` attribute. Remove once Vibe supports scope-aware
`on*="@[handler(item, this)]"` syntax.

### `window.X = …` pollution

Inline `onclick=` handlers run in the *global* scope, not the module scope of
the component's `<script type="module">`. So any handler used inline must be
hung on `window`. This is a JS module-scope reality, not a Vibe bug — but
once Vibe ships scope-aware event handlers (see above) most of these go away.

### `window.__vibeComponents` reverse-lookup to get the reactive proxy

Used in 7+ files as the only way to obtain the `$`-bound view of local
component state after `component(state)`. Replace with the proper return
value of `component()` once Vibe lands that change.

### Forced rerender via top-level array spread

`$.characters = [...$.characters]` after deep mutations of nested character
state. Today's idiomatic Vibe code shouldn't need this — write the mutation
through the proxy and trust deep reactivity. We'll keep removing these as we
verify each one.

### HTML attribute names get lowercased

Browser lowercases attribute names before Vibe parses them, so
`<component lastTick="@[end]">` becomes prop `lasttick`. Always use
all-lowercase or kebab-case attribute names on `<component>` and on any
element with `@[...]` bindings. Vibe should warn about this in dev mode (TODO).
