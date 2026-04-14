import vibe from '/nodemodules/@ape-egg/vibe/index.js';
import { boot as vibeBoot } from '/nodemodules/@ape-egg/vibe/boot.js';
import appState, { INITIAL_COMBAT } from '/js/app.js';
import config from '/js/config.js';
import { getCookie } from '/js/helpers.js';
import { init as initCombatLoop } from '/js/combat-loop.js';
import { init as initSocket } from '/js/connectSocket.js';
import { init as initAmbient } from '/js/ambient.js';
import CHARACTERS from '/js/constants/CHARACTERS.js';
import ABILITIES from '/js/constants/ABILITIES.js';
import EQUIPMENT from '/js/constants/EQUIPMENT.js';
import { calculateCombatStatsByCharacter } from '/js/utils.js';
import {
  getLevelByExperience,
  getCurrentExperienceAtLevel,
  getExperienceForNextLevel,
  getExperienceReward
} from '/js/level.js';
import { ALL_FIGHTS } from '/js/constants/FIGHTS.js';
import { Howl } from '/js/lib/howler.js';
import AUDIO from '/js/audio.js';
import { correctHealth } from '/js/equipment.js';

// Parse route + params from URL (replaces client-side router)
const parseRoute = () => {
  const path = window.location.pathname;
  const patterns = [
    {
      pattern: /^\/brawlers\/(\d+)$/,
      route: '/brawlers/:characterIndex',
      params: (m) => ({ characterIndex: m[1] })
    },
    {
      pattern: /^\/the-arena\/(.+)$/,
      route: '/the-arena/:fightId',
      params: (m) => ({ fightId: m[1] })
    },
    {
      pattern: /^\/reset-password\/(.+)$/,
      route: '/reset-password/:secret',
      params: (m) => ({ secret: m[1] })
    }
  ];
  for (const { pattern, route, params } of patterns) {
    const m = path.match(pattern);
    if (m) return { route, routeParams: params(m) };
  }
  return { route: path, routeParams: {} };
};

export default () => {
  const { route, routeParams } = parseRoute();
  const pageName =
    route
      .replace(/^\/|\/$/g, '')
      .replace(/:(\w+)/g, '$1')
      .replace(/\//g, '-') || 'home';

  // Window globals for components and services
  window.Howl = Howl;
  window.AUDIO = AUDIO;
  window.CHARACTERS = CHARACTERS;
  window.ABILITIES_FN = ABILITIES;
  window.EQUIPMENT_FN = EQUIPMENT;
  window.calculateCombatStatsByCharacter = calculateCombatStatsByCharacter;

  window.selectBrawler = (e, uuid, index) => {
    if ($.maxBrawlers) {
      e.preventDefault();
      e.stopPropagation();
      if ($.selectedBrawlers.includes(uuid)) {
        $.selectedBrawlers = $.selectedBrawlers.filter((id) => id !== uuid);
      } else if ($.selectedBrawlers.length < $.maxBrawlers) {
        $.selectedBrawlers.push(uuid);
      }
      if (window.updateFightSlots) updateFightSlots();
    }
  };

  // Restore token from cookie BEFORE vibe initializes so the first hydration
  // already knows we're logged in — avoids a login-screen flash before the
  // ready hook would otherwise restore it.
  const cookie = getCookie();

  window.$ = vibe(
    {
      ...appState,
      token: cookie?.token,
      showSequence: false,
      authMode: 'login',
      authEmail: config.IS_DEV ? config.AUTO_EMAIL : '',
      authPassword: config.IS_DEV ? config.AUTO_PASSWORD : '',
      authRememberMe: config.IS_DEV,
      authCodeOfConduct: config.IS_DEV,
      authError: '',
      sidebarLevel: 1,
      sidebarXpCurrent: 0,
      sidebarXpNeeded: 100,
      sidebarXpPct: 0,
      sidebarChars: [],
      sidebarMaxChars: 1,
      healTimer: 120,
      healTimerPct: 0,
      isDev: config.IS_DEV,
      audio: AUDIO,
      route,
      routeParams,
      pageName
    },
    { debug: false }
  );

  // Force synchronous boot so window.$ is the real proxy immediately
  // (vibe() defers boot to a microtask, but page scripts need $ right away)
  window.$ = vibeBoot();

  // Media queries
  const queries = {
    desktop: '(min-width: 1200px)',
    tablet: '(min-width: 768px) and (max-width: 1199px)',
    smartphone: '(max-width: 767px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    hoverable: '(hover: hover)'
  };

  const mqls = {};
  const updateMedia = () => {
    const media = {};
    Object.keys(mqls).forEach((key) => {
      media[key] = mqls[key].matches;
    });
    try {
      $.mqs = media;
    } catch {}
  };
  Object.keys(queries).forEach((key) => {
    mqls[key] = window.matchMedia(queries[key]);
    mqls[key].addEventListener('change', updateMedia);
  });

  // Initialize services (keystroke handling lives in <Keystrokes> component, mounted via Layout)
  initCombatLoop();
  initSocket();
  initAmbient();

  $.on('ready', () => {
    updateMedia();

    // Apply dark mode from saved settings
    document.body.toggleAttribute('dark', !!$.settings?.darkMode);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$.gameKeyboardDisabled) {
        if ($.dialog) {
          $.dialog = undefined;
          return;
        }
        $.overlay = $.overlay ? '' : 'GameMenu';
      }

      // Shift + Option/Alt + D toggles the DevBar. Match on e.code so we don't
      // have to deal with Option producing the special `∂` character on macOS.
      if ($.isDev && e.shiftKey && e.altKey && e.code === 'KeyD') {
        e.preventDefault();
        $.devbarOpen = !$.devbarOpen;
      }
    });

    // Client clock
    setInterval(() => {
      if ($.serverTimestampSnapshot) {
        $.serverTimestamp = $.serverTimestampSnapshot + (performance.now() - $.syncPerformanceNow);
      }
    }, 250);

    // Heal timer
    const MINUTES_TO_REFILL = 2;
    const FULL_TIME = MINUTES_TO_REFILL * 60 * 1000;

    setInterval(() => {
      // Anchor the cycle to a real timestamp — prefer the server-synced clock
      // when available so heals stay aligned across sessions; fall back to
      // client time so the countdown keeps ticking even before the socket
      // handshake (or if the server never sends a snapshot).
      const anchor = $.serverTimestampSnapshot || Date.now();
      const nowMs = $.serverTimestamp || Date.now();

      const now = new Date(anchor);
      const minutes = now.getMinutes();
      const nextMarkMinute = minutes + (MINUTES_TO_REFILL - (minutes % MINUTES_TO_REFILL));
      const nextMark = new Date(now);
      nextMark.setMinutes(nextMarkMinute, 0, 0);

      const timeToRefill = nextMark.getTime() - nowMs;
      $.healTimer = Math.max(0, Math.ceil(timeToRefill / 1000));
      $.healTimerPct = Math.round(((FULL_TIME - timeToRefill) / FULL_TIME) * 100);

      if (timeToRefill < 0) {
        $.characters.forEach((ref) => {
          try {
            const char = CHARACTERS(ref, true);
            const stats = calculateCombatStatsByCharacter(char);
            const heal = Math.ceil(stats.maxHealth * 0.33);
            ref.overrides.combatStats.currentHealth = Math.min(
              char.combatStats.currentHealth + heal,
              stats.maxHealth
            );
          } catch {}
        });
        $.serverTimestampSnapshot = nowMs;
        $.syncPerformanceNow = performance.now();
      }
    }, 1000);

    // Armory equipment tooltips via event delegation
    document.addEventListener(
      'mouseenter',
      (e) => {
        if (!e.target?.closest) return;
        const row = e.target.closest('[armory-row]');
        if (!row) return;
        const eqLink = row.querySelector('eq-link');
        if (!eqLink) return;

        const rows = [...row.parentElement.querySelectorAll('[armory-row]')];
        const idx = rows.indexOf(row);
        const itemRef = $.inventory[idx];
        if (!itemRef) return;

        try {
          const item = EQUIPMENT(itemRef, true);
          const rect = eqLink.getBoundingClientRect();
          $.tooltip = {
            x: rect.left + rect.width / 2,
            y: rect.top,
            visible: true,
            props: {
              name: item.name,
              level: item.level,
              combatStats: item.combatStats,
              slotsIn: item.slotsIn,
              description: item.description
            }
          };
        } catch {}
      },
      true
    );

    document.addEventListener(
      'mouseleave',
      (e) => {
        if (e.target?.closest?.('[armory-row]') && $.tooltip) $.tooltip.visible = false;
      },
      true
    );
  });

  $.on('afterUpdate', (current, prev) => {
    // Load game state when socket + token are both available
    // Matches SvelteKit's $effect pattern: fires on either transition
    const justConnected = current.socket && !prev.socket && current.token;
    const justGotToken = current.token && !prev.token && current.socket;
    if (justConnected || justGotToken) {
      window.loadGameState?.(current.token);
    }

    // Hydrate sidebar derived values
    try {
      const level = getLevelByExperience(current.experience || 0);
      if (level !== current.sidebarLevel) $.sidebarLevel = level;

      const xpCur = getCurrentExperienceAtLevel(current.experience || 0);
      const xpNeeded = getExperienceForNextLevel(level);
      if (xpCur !== current.sidebarXpCurrent) $.sidebarXpCurrent = xpCur;
      if (xpNeeded !== current.sidebarXpNeeded) $.sidebarXpNeeded = xpNeeded;

      const xpPct = level >= 25 ? 100 : Math.round((xpCur / Math.max(1, xpNeeded)) * 100);
      if (xpPct !== current.sidebarXpPct) $.sidebarXpPct = xpPct;

      const maxChars = Math.floor((current.accountRewards || 1) / 5) + 1;
      if (maxChars !== current.sidebarMaxChars) $.sidebarMaxChars = maxChars;

      const chars = (current.characters || [])
        .map((ref) => {
          try {
            const char = CHARACTERS(ref, true);
            const stats = calculateCombatStatsByCharacter(char);
            const AB = window.ABILITIES_FN;
            const abilities = AB
              ? char.abilities
                  .map((a) => {
                    try {
                      const h = AB(a, true);
                      return { icon: h.icon, ticks: h.ticks };
                    } catch {
                      return null;
                    }
                  })
                  .filter(Boolean)
              : [];
            return {
              name: char.name,
              image: char.image,
              mugshot: char.image.replace('.png', '-mugshot.png'),
              currentHealth: char.combatStats.currentHealth,
              maxHealth: stats.maxHealth,
              healthPct: Math.max(
                0,
                Math.round((char.combatStats.currentHealth / stats.maxHealth) * 100)
              ),
              abilities
            };
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      if (JSON.stringify(chars) !== JSON.stringify(current.sidebarChars)) {
        $.sidebarChars = chars;
      }

      // Combat reward preview
      if (
        current.elapsedMilliseconds >= current.combat?.duration &&
        current.combat?.duration > 0 &&
        !current.combatRewardXp
      ) {
        const fight = ALL_FIGHTS.find((f) => f.id === current.combat.fightId);
        if (fight && current.combat.winningTeam?.index === 0) {
          $.combatRewardXp = getExperienceReward(
            fight.characters.length,
            fight.minLevel,
            fight.maxLevel,
            fight.boss
          );
          $.combatRewardBoss = fight.boss && fight.minLevel > current.bossHighscore;
        }
      }

      // Level-up detection
      const prevLevel = getLevelByExperience(prev.experience || 0);
      if (level > prevLevel && prev.experience > 0) {
        $.overlay = 'AccountProgression';
        $.characters.forEach((c) => {
          try {
            correctHealth(c);
          } catch {}
        });
        try {
          new Howl({
            src: [AUDIO['Fire & Shimmer']],
            volume: ($.settings?.volume?.sfx ?? 0.5) * ($.settings?.volume?.master ?? 0.5)
          }).play();
        } catch {}
      }
    } catch {}

    // Sync data-src → src
    document.querySelectorAll('img[data-src]').forEach((img) => {
      const ds = img.dataset.src;
      if (ds && !ds.includes('@[') && img.src !== ds && !img.src.endsWith(ds)) img.src = ds;
    });
  });
};
