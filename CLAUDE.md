# Battle Brawlers — Vibe + Stylecheat Rewrite

Strategy auto-battler. Currently a Multi-Page App with Vite middleware mapping URLs to `pages/*.html`; **subject to change** — could become an SPA later, so don't lean on MPA assumptions in feature code. The game must work responsively down to ~360px wide; reach for Stylecheat's three media queries (`sm:` ≤768px, `md:` 768–1024px, `lg:` >1024px) before any custom `@media`.

## Project todo

Long-running discussion / structural items. Add a one-line bullet when something belongs on the roadmap.

- Decide what to do about dense one-liners inside templates: when does inline `@[…]` cross over into "move it into a `<script>` tag at the top of the file"? Track examples we run into.
- Consider whether Vibe needs a "derived reactivity" primitive (a few component scripts want a value computed from `$` outside a binding context).
- MPA → SPA migration is on the table; flag any code that hard-codes navigation as a full reload.

## Reference

The **`game/battle-brawlers`** branch is the per-game working branch and the source of truth for the original SvelteKit implementation. Use `git show game/battle-brawlers:<path>` or `git ls-tree game/battle-brawlers <dir>` to inspect without switching branches.

## Stack

- **Runtime**: Vibe (`@ape-egg/vibe`) — runtime-first reactive framework
- **CSS**: Stylecheat (hybrid build) — attribute-based CSS framework. We use `ChromeOnlyModifiers.css` (the `[g] { gap: calc(attr(g type(<number>)) * var(--unit)); }` form), **not** `Modifiers.css` (the `g-4`/`p-2` form).
- **Dev server**: Vite via `vite-plugin-vibe` for HMR. A custom `mpa-routes` middleware in `vite.config.js` maps URLs to `pages/*.html` (including dynamic routes like `/brawlers/:i` → `pages/brawler-detail.html`).
- **Vibe source**: Symlinked from `/Users/kortes/Projects/webdev/vibe/nodemodules/@ape-egg/vibe` (also `vite-plugin-vibe`).

## Testing

- Don't use Playwright MCP unless explicitly asked.
- The user tests in the browser manually and reports issues.

## Conventions

- **HTML comments are not allowed.** The only HTML "comments" in this project are Vibe directives (`<!-- if -->`, `<!-- else -->`, `<!-- /if -->`, `<!-- each -->`, `<!-- /each -->`) — those are reactive control flow, not comments. JS-side `// TODO: ...` is the official marker for "do later" (git tracks who/when).
- **No `class=""` attributes** — use individual HTML attributes instead.
- **No `style=""` attributes** — use custom attributes with CSS custom properties via `<element attr="@[value]">` instead of `style="--var: @[value]"`. Only acceptable for truly unavoidable cases like tooltip absolute positioning.
- **No `<div>` elements** — use semantic or custom element names: `<page-home>`, `<fight-row>`, `<ability-cell>`, `<xp-bar>`, `<coin-stack>`, etc.
- **Component naming convention**: reuse the wrapper element's name for inner pieces — `<tooltip>` / `<tooltip-content>` / `<tooltip-title>`, `<combatant-card>` / `<combatant-header>` / `<combatant-name>`. Predictable, self-documenting.
- **Attribute-based styling**: prefer Stylecheat attributes (`g="4"`, `p="2"`, `vertical`, `primary`, `absolute`, `flex`, `down`, etc.). Use ChromeOnly forms — `g="4"` not `g-4`.
- **Stylecheat over custom CSS**: when Stylecheat offers a modifier (e.g. `<element absolute>` for `position: absolute`), use it instead of writing the rule yourself.
- **Local component styles**: each component's own `<style>` block lives at the bottom of the same file, scoped with `[component-name]` (or no scope when the inner element name is already unique). If the styles fit a more global theme concept, lift them into `css/index.css`.
- **Scoped styles**: if a page/component needs custom styles Stylecheat can't offer, scope with `[page-name]` or `[component-name]` in a `<style>` block at the bottom of the file. Keep things isolated to where they belong.
- **Page structure**: `<script type="module">` at top, `<page-xxx>` wrapper (custom element, not div), `<style>` at bottom.
- **State access**: use `$` (not `window.$`) — it's a global property.
- **Function calls on elements**: `onclick="fn()"` — never `onclick="window.fn()"`. Same applies to functions exposed on `window`: call them by bare name from the markup.
- **Component scripts**: `<script type="module">` in Vibe components have imports STRIPPED by processComponent — put logic that needs imports in `/js/boot.js` (which each page's entry script imports) and expose it on `window` for components to read.
- **`data-*` prefix should be avoided at all cost**. Use plain attributes instead: in CSS use `status-chip[stunned]`, in HTML use `<element @[status]>` (Vibe sets a boolean-like attribute named after the resolved value). The exception is genuine HTML data semantics like `data-src` on lazy-loaded images.
- **Stylecheat boolean attributes**: Non-`data-*`/`aria-*`/`on*` attributes bound with a pure `@[expr]` become proper boolean-like attributes — Vibe sets the attribute (empty value) when truthy and removes it when falsy. So `<modal-root open="@[when]">` with CSS `modal-root[open]` / `modal-root:not([open])` works directly.

## File Conventions

- Every file ends with a trailing newline.
- No hex color codes outside `css/index.css`. Always reference `var(--color-name)`. If a color doesn't exist as a var yet, add it to `css/index.css` first.
- For any `px` greater than `1px`, use `calc(var(--unit) * N)` instead.
- No `rem`. Use `calc(var(--unit) * N)`.
- Imports: package imports first, then relative project imports.

## Game Server

The WebSocket backend lives in `svelte-game-server/`. Frontend integration:

- Connection lives on `$.socket` (see `js/connectSocket.js`); lifecycle is managed centrally — features should consume `$.socket` rather than open new connections.
- **Calling backend functions**: every file under `svelte-game-server/events/` is a server function, addressed by its path. Invoke from the client with `await $.socket.sendAsync('<dir>/<file>', payload)` — e.g. `events/user/authenticate.js` is `$.socket.sendAsync('user/authenticate', { token, … })`, `events/pvp/get-random-opponent.js` is `$.socket.sendAsync('pvp/get-random-opponent', …)`. New backend capabilities → drop a `.js` file in `events/<dir>/<file>.js` (server auto-registers) and call it the same way from the client.
- Game state seeded onto `$` flows from the server through `sendAsync` responses (mainly in `js/boot.js` and `js/connectSocket.js`). New event handlers should plug into the same place so reactive bindings stay coherent.
- Auth happens via `$.token`; the server validates it on the websocket handshake. Don't store credentials elsewhere.
- Constants (`js/constants/*`) must match the server's expectations — when the backend renames or adds a key, update the constant file in lockstep.
- Helpers belong in `/js/helpers.js`. Tiny utilities (formatters, parsers) should not get their own files.
