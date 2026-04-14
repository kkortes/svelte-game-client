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

### SvelteKit Components → Vibe Components

The original SvelteKit project had these components (`src/components/`). Each should have a Vibe equivalent in `components/`:

**Root-level (general purpose):**

- Accordion, Armory, Coin, Coins, DevBar, EquipmentFilter, EquipmentLink
- ForgotPassword, Frame, GameAudio, Headline, Hr, Loader, Login, Logo
- MyLudus, RefillHealthTimer, Register, Topbar

**buttons/**: Clickable, Close, GoBack, Logout
**character/**: AbilityBar, AbilityIcon, AbilityInventory, AbilitySelection, CharacterAvatar, CharacterEquipment, CoreStats, Stats
**combat/**: CharacterSelection, CombatArena, CombatAudioPlayer, CombatantAbilityBar, CombatantAudioPlayer, CombatantCard, CombatantImage, HealthBar, ResultAnnouncement, TeamBadge, VictoryOrLoss
**dialog/**: BasicConfirmation
**form/**: Button, Checkbox, Dropdown, Input
**global/**: AccountProgression, ClientClock, ConnectSocket, Dialog, InCombat, Keystrokes, Notifications, Overlay
**overlays/**: CodeOfConduct, Combat, GameMenu, ReleaseNotes
**tooltips/**: TooltipAbility, TooltipEquipment
**ui/**: Bar, Icon, Pill, Spinner, Tooltip

**Ported as Vibe components:** AccountProgression, Armory, CodeOfConduct, Combat, Dialog, GameMenu, Layout, Notifications, ReleaseNotes, Sidebar, Tooltip, Topbar
**Not yet components (inlined in pages or index.html):** everything else — extract as needed

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
- **Stylecheat boolean attributes**: Non-`data-*`/`aria-*`/`on*` attributes bound with a pure `@[expr]` become proper boolean-like attributes — Vibe sets the attribute (empty value) when truthy and removes it when falsy. So `<modal-root open="@[when]">` with CSS `modal-root[open]` / `modal-root:not([open])` works directly. No `data-` prefix needed.
- **No string methods with quotes in `@[...]` inside `src` attributes**: `@[x.replace('.png', '-mugshot.png')]` fails because single quotes inside Vibe expressions conflict with HTML attribute parsing. Precompute the value in JS instead.
- **Flatten deeply nested data for `<!-- each -->` loops**: Vibe's each-loop variable binding works best with flat top-level arrays on `$`. Deeply nested paths like `liveTeams[0].combatants` may not resolve properties in `@[c.name]`. Precompute flat arrays (e.g., `$.combatTeam0`) with simple property names.
- **`onerror` on images with `@[...]` src**: Vibe briefly sets `src` to the literal `@[expr]` string before resolving, causing a 404. Guard onerror handlers: `onerror="if(!this.src.includes('@['))this.style.display='none'"`

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

### Discrepancies vs original (compare to `main` branch line-by-line before fixing):

**Auth/Login (Layout.html):**

- [x] Login error handling uses `$.authError` (inline div) — original uses `notify()` (toast)
- [x] No success notification after login — original shows "Logged in successfully"
- [x] Registration: no success notification, no form clearing — original shows "Account was created"
- [x] Password reset doesn't call server — original calls `user/password/request-reset` via socket
- [x] Auth failure doesn't clear token — original does `app.token = undefined` on catch

**Combat (Combat.html):**

- [ ] Card-based grid instead of circular arena with character sprites
- [ ] No combatant sprites rendered
- [x] Floating damage numbers: selectors verified matching
- [ ] No ability bars in combat display
- [x] Status effects sorted (precomputed in combat-loop, rendered via each loops)

**Pages:**

- [ ] Brawler detail: DnD causes `window.location.reload()` — original updates in-place reactively
- [ ] Brawlers page: `brawlerCharCapped` computed once, not reactive
- [ ] Arena: `hideTreshold` (fight locking) computed once, not reactive
- [x] Fight detail: mugshot image `.replace()` inside `@[...]` breaks Vibe attribute parsing

**Components:**

- [x] Notifications: auto-dismiss via setTimeout in actions.js (hover pause is polish)
- [ ] Dialog: only supports confirm type — original accepts any component
- [x] AccountProgression: claim sound effect + auto-close on current level
- [x] AccountProgression: auto-scroll to current level on open
- [x] Layout: armory sidebar transition (opacity + translate via visible attr)
- [x] Layout: debug page background image
