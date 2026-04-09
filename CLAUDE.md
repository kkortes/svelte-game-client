# Battle Brawlers — Vibe + Stylecheat Rewrite

## Overview

Strategy auto-battler rewritten from SvelteKit + Tailwind to Vibe + Stylecheat. Branch: `chore/major-rewrite-to-stylecheat-and-vibe`.

## Reference

The **`main` branch** contains the original SvelteKit implementation. Use `git stash && git checkout main` to inspect original components, then `git checkout chore/major-rewrite-to-stylecheat-and-vibe && git stash pop` to return. The original is the source of truth for all functionality and design.

## Stack

- **Runtime**: Vibe (`@ape-egg/vibe`) — runtime-first reactive framework
- **CSS**: Stylecheat (hybrid build) — attribute-based CSS framework
- **Server**: `bunx live-server` — no build step
- **Packages**: async-await-websockets, howler, seedrandom
- **Vibe source**: Symlinked from `/Users/kortes/Projects/webdev/vibe/nodemodules/@ape-egg/vibe`

## Conventions

- **No `class=""` attributes** — use individual HTML attributes instead
- **No `style=""` attributes** — use custom attributes with CSS custom properties via `<element attr="@[value]">` instead of `style="--var: @[value]"`. Only acceptable for truly unavoidable cases like tooltip absolute positioning.
- **No `<div>` elements** — use semantic or custom element names instead: `<page-home>`, `<fight-row>`, `<ability-cell>`, `<xp-bar>`, `<coin-stack>`, etc. Divs say nothing about what they are.
- **Attribute-based styling**: use Stylecheat attributes (`g-4`, `text-sm`, `vertical`, `primary`, etc.) or custom attributes
- **Scoped styles**: each page/component has a `<style>` block scoped with `[page-name]` or `[component-name]`
- **Page structure**: `<script type="module">` at top, `<page-xxx>` wrapper (custom element, not div), `<style>` at bottom
- **State access**: use `$` (not `window.$`) — it's a global property
- **Router**: custom pushState SPA router at `/js/router.js` — pages loaded via fetch + innerHTML + script execution
- **Component scripts**: `<script type="module">` in Vibe components have imports STRIPPED by processComponent — use index.html's script for logic that needs imports
- **Dynamic values**: for per-element dynamic values (colors, widths, positions), use custom attributes that map to CSS custom properties: `<element color="@[val]">` with CSS `[color] { --color: attr(color); }` or use `data-*` attributes. Where CSS `attr()` is insufficient, a minimal `style="--var: @[val]"` is acceptable as last resort.
- **Stylecheat boolean attributes**: Stylecheat uses attribute presence (`[open]` vs `:not([open])`) for boolean states. Vibe's `@[expr]` sets attribute VALUES ("true"/"false"), not presence/absence. Use `data-*` attributes with value matching (`[data-open="true"]`) instead of Stylecheat's native boolean attributes for dynamic state.

## File Structure

```
index.html              — SPA entry, overlays, topbar, global script
css/index.css           — theme variables, fonts, global styles
css/stylecheat.css      — Stylecheat hybrid build
js/                     — core modules (router, app state, game logic)
js/constants/           — game data (abilities, characters, equipment, fights)
js/lib/                 — ESM wrappers for CJS packages (seedrandom, howler)
components/             — Vibe HTML components (Layout, Sidebar, Topbar, Armory)
pages/                  — route pages loaded by router
static/                 — images, audio, favicon
svelte-game-server/     — WebSocket game server (unchanged)
```

## Game Server

Run from `svelte-game-server/`: `bun run index.js` (port 1337). Config in `js/config.js`.

## Remaining Work

### Known gaps vs original:
- DnD for abilities is basic (reorder + refresh, no smooth drag preview like svelte-dnd-action)
- Combat visualization is card-based instead of circular arena layout with character sprites
- No CSS transitions on overlay open/close (hard show/hide via Vibe conditionals)

### Completed:
- All 12 route pages functional
- Login/Register/Forgot password flows
- Brawler recruitment with dialog + CoC validation
- Character detail with stats toggle, ability bar, equipment slots, try-out, retire
- Ability auto-generation from equipment (ensureDefaultAbilities logic)
- Arena fight list with sorting, locking, boss tracking, enemy previews, XP
- Fight detail with enemy info, brawler selection slots (with names), fight button
- Random duel with brawler selection, fight button, PvP matchmaking
- Combat overlay with team health bars, damage/armor badges, all 6 status effect icons, floating damage/heal numbers, result/rewards with XP + boss defeated
- Combat audio: SFX timed to combat events + victory/defeat stingers
- Ambient audio: desert wind / wilderness crossfade based on boss progression, volume settings
- Floating damage/heal/armor numbers during combat (animated, color-coded)
- Equipment tooltips on hover (armory, brawler-detail, vendor) with combat stats + icons
- Ability tooltips with basic/special tags
- Fight selection slots show brawler mugshot + ability bar (fight-detail + PvP)
- Vendor with equipment filters, eq-link banners, acquire with coin check
- Armory with equip/unequip, refund/dismantle, eq-link banners
- Sidebar: HP bars, XP bar, heal timer (server-timestamp synced), coin icons, ability sequence accordion, brawler selection
- Notifications component with icons, titles, type-based colors
- GameMenu component with Frame styling, audio sliders, logout
- DevBar at top with combat controls, state manipulation
- Icon system (56 game icons via CSS masks)
- Account progression overlay with 25 levels, claim, auto-popup
- Code of Conduct overlay with full rules text (matching original)
- Escape key toggles GameMenu
- Client clock syncs server timestamp
- Combat-loop syncs character health on end
- Boss highscore tracking
- All HTML: zero divs, zero classes, minimal style attrs
