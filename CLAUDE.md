# Battle Brawlers — Vibe + Stylecheat Rewrite

When a prompt looks dictated — missing punctuation, run-on sentences, transcription artifacts (random tokens like 'asfas'), filler words ('um', 'so'), or conversational/spoken phrasing — interpret intent loosely, normalize obvious transcription errors, and ask for clarification when ambiguous. When voice is detected, append the request as a one-line bullet under `## Todo` instead of acting on it immediately.

## Todo

Autonomous work queue. Add tasks as one-line bullets (verbs like Do / Fix / Create / Refactor).
When invoked with `/loop` (no interval), work top-to-bottom: pick the first item, complete it,
remove it from this list, commit the edit to CLAUDE.md, then continue with the next item.
When the list is empty, stop the loop.

<!-- Add tasks below this line -->

## Overview

Strategy auto-battler rewritten from SvelteKit + Tailwind to Vibe + Stylecheat. Branch: `chore/major-rewrite-to-stylecheat-and-vibe`.

## Testing

- Don't use Playwright MCP unless explicitly asked
- The user tests in the browser manually and reports issues

## Reference

The **`main` branch** contains the original SvelteKit implementation. Use `git show main:<path>` or `git ls-tree main <dir>` to inspect without switching branches. The original is the source of truth for all functionality and design.


## Stack

- **Runtime**: Vibe (`@ape-egg/vibe`) — runtime-first reactive framework
- **CSS**: Stylecheat (hybrid build) — attribute-based CSS framework
- **Dev server**: Vite (`bunx vite`, port 3001) via `vite-plugin-vibe` for HMR. A custom `mpa-routes` middleware in `vite.config.js` maps URLs to `pages/*.html` (including dynamic routes like `/brawlers/:i` → `pages/brawler-detail.html`)
- **Vibe source**: Symlinked from `/Users/kortes/Projects/webdev/vibe/node_modules/@ape-egg/vibe` (also `vite-plugin-vibe`)

## Conventions

- **No comments anywhere** — no JS comments (`//`, `/* */`), no CSS comments (`/* */`), no HTML comments (`<!-- -->`). The only exception is **Vibe syntax comments**: `<!-- if -->`, `<!-- else -->`, `<!-- /if -->`, `<!-- each -->`, `<!-- /each -->` — these are reactive directives, not comments. Code should be self-documenting through naming; if a comment feels necessary, rename or restructure instead.
- **No `class=""` attributes** — use individual HTML attributes instead
- **No `style=""` attributes** — use custom attributes with CSS custom properties via `<element attr="@[value]">` instead of `style="--var: @[value]"`. Only acceptable for truly unavoidable cases like tooltip absolute positioning.
- **No `<div>` elements** — use semantic or custom element names instead: `<page-home>`, `<fight-row>`, `<ability-cell>`, `<xp-bar>`, `<coin-stack>`, etc. Divs say nothing about what they are.
- **Attribute-based styling**: use Stylecheat attributes (`g-4`, `text-sm`, `vertical`, `primary`, etc.) or custom attributes
- **Scoped styles**: each page/component has a `<style>` block scoped with `[page-name]` or `[component-name]`
- **Page structure**: `<script type="module">` at top, `<page-xxx>` wrapper (custom element, not div), `<style>` at bottom
- **State access**: use `$` (not `window.$`) — it's a global property
- **Routing (MPA, not SPA)**: there is no client-side router. Each `pages/*.html` is a full standalone HTML entry that imports `/js/boot.js`. Navigation is a full page reload. Route info (`route`, `routeParams`, `pageName`, `pageSection`) is parsed from `window.location.pathname` in `js/boot.js` and seeded onto `$` before Vibe boots. Vite's `mpa-routes` middleware resolves URLs to the right `pages/*.html` file.
- **Component scripts**: `<script type="module">` in Vibe components have imports STRIPPED by processComponent — put logic that needs imports in `/js/boot.js` (which each page's entry script imports) and expose it on `window` for components to read
- **Dynamic values**: for per-element dynamic values (colors, widths, positions), use custom attributes that map to CSS custom properties: `<element color="@[val]">` with CSS `[color] { --color: attr(color); }` or use `data-*` attributes. Where CSS `attr()` is insufficient, a minimal `style="--var: @[val]"` is acceptable as last resort.
- **Stylecheat boolean attributes**: Non-`data-*`/`aria-*`/`on*` attributes bound with a pure `@[expr]` become proper boolean-like attributes — Vibe sets the attribute (empty value) when truthy and removes it when falsy. So `<modal-root open="@[when]">` with CSS `modal-root[open]` / `modal-root:not([open])` works directly. No `data-` prefix needed.
- **No string methods with quotes in `@[...]` inside `src` attributes**: `@[x.replace('.png', '-mugshot.png')]` fails because single quotes inside Vibe expressions conflict with HTML attribute parsing. Precompute the value in JS instead.
- **`onerror` on images with `@[...]` src**: Vibe briefly sets `src` to the literal `@[expr]` string before resolving, causing a 404. Guard onerror handlers: `onerror="if(!this.src.includes('@['))this.style.display='none'"`
- **Responsive**: the entire game must work on smartphone (down to ~360px). Use Stylecheat responsive modifiers (`sm:` ≤768px, `md:` 768–1024px, `lg:` >1024px) — e.g. `sm:vertical`, `sm:hide`, `sm:block`, `sm:g-2`. Prefer attribute-based responsive variants over `@media` queries; fall back to `@media (width <= 768px)` only when Stylecheat doesn't cover the case (custom sizing, layout rewrites).

## File Structure

```
pages/                  — standalone HTML entries, one per route (home, brawlers, the-arena, …). Each imports /js/boot.js and mounts <component src="/components/Layout.html">
css/index.css           — theme variables, fonts, global styles
css/stylecheat.css      — Stylecheat hybrid build
js/boot.js              — app bootstrap: parses route, seeds $, wires services, registers lifecycle listeners
js/app.js               — initial global state shape
js/                     — core modules (app state, game logic, services)
js/constants/           — game data (abilities, characters, equipment, fights)
components/             — Vibe HTML components (Layout, Authorization, Sidebar, Topbar, …)
static/                 — images, audio, favicon
svelte-game-server/     — WebSocket game server (unchanged)
vite.config.js          — Vite config + mpa-routes middleware (URL → pages/*.html)
```

## Game Server

Run from `svelte-game-server/`: `bun run index.js` (port 1337). Config in `js/config.js`.
