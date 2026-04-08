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

## TODO — Rewrite Completion

Reference: compare against `main` branch for each item. Be 1:1 with original functionality.

### CRITICAL (game doesn't function without these)

- [x] 1. Arena fight list — locking/progression, boss tracking, enemy previews, XP rewards, sorted table
- [x] 2. Fight detail — enemy stats, brawler selection slots, fight button gating
- [x] 3. Character detail — detailed stats toggle, ability bar tick visualization, "Try out build", retire button, equipment display
- [x] 4. Combat overlay — team health bars, status effects, result announcement with rewards (XP + boss progression + health sync)
- [x] 5. Armory — equip/dismantle/refund distinction, level-colored borders
- [x] 6. Vendor — equipment filter buttons, slot grouping, proper acquire flow
- [x] 7. Sidebar brawler list — active brawler glass highlight
- [x] 8. Health refill timer — countdown bar, auto-heal
- [x] 9. Account progression — level reward system (1-25), claim buttons, auto-popup on level up
- [x] 10. Tooltip system — ability tooltips, equipment tooltips, smart positioning, colored borders

### IMPORTANT (game works but incomplete)

- [x] 11. Notifications — color-coding by type, auto-dismiss
- [x] 12. Login form — "I agree to Code of Conduct" checkbox
- [x] 13. Audio system — combat audio, ambient, SFX, level-up sound
- [x] 14. Equipment links — colored border by level in armory
- [x] 15. Combat result handling — character health sync, boss highscore update, XP + coin rewards
- [x] 16. Brawler recruitment — already-recruited disable, character cap, full stats display

### MINOR (polish)

- [x] 17. Code of Conduct overlay
- [x] 18. Release Notes overlay
- [x] 19. Coins component — coin icons instead of text
- [x] 20. Dark mode toggle (hidden by default in original)
- [x] 21. DevBar (dev only debug panel)
- [x] 22. Equipment/ability/character scaling pages — match original detail level
- [x] 23. Keyboard shortcuts — wire into game actions
- [x] 24. Login floating labels (Svelte-style label animation)
