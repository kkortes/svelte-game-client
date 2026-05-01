import vibe from '@ape-egg/vibe';
import { boot as vibeBoot } from '@ape-egg/vibe/boot';
import appState, { INITIAL_COMBAT } from '/js/app.js';
import config from '/js/config.js';
import { getCookie } from '/js/helpers.js';
import { init as initCombatLoop } from '/js/combat-loop.js';
import { init as initSocket } from '/js/connectSocket.js';
import { init as initAmbient } from '/js/ambient.js';
import CHARACTERS from '/js/constants/CHARACTERS.js';
import ABILITIES from '/js/constants/ABILITIES.js';
import EQUIPMENT from '/js/constants/EQUIPMENT.js';
import { ALL_FIGHTS } from '/js/constants/FIGHTS.js';
import { calculateCombatStatsByCharacter } from '/js/utils.js';
import {
  getLevelByExperience,
  getCurrentExperienceAtLevel,
  getExperienceForNextLevel,
  allowedNumberOfCharacters,
  getExperienceReward
} from '/js/level.js';
import { Howl } from 'howler';
import AUDIO from '/js/audio.js';
import { correctHealth } from '/js/equipment.js';
import { equipmentTooltipProps, abilityTooltipProps } from '/js/tooltip.js';

const loadGameState = async (token) => {
  try {
    const { gameState, serverTimestampSnapshot } = await $.socket.sendAsync('user/authenticate', {
      token,
      clientVersion: '0.1.0',
      isDev: config.IS_DEV
    });
    if (gameState) {
      if (gameState.characters) $.characters = gameState.characters;
      if (gameState.inventory) $.inventory = gameState.inventory;
      if (gameState.experience) $.experience = gameState.experience;
      if (gameState.coins !== undefined) $.coins = gameState.coins;
      if (gameState.accountRewards) $.accountRewards = gameState.accountRewards;
    }
    if (serverTimestampSnapshot) {
      $.clock = {
        ...$.clock,
        server: serverTimestampSnapshot,
        client: performance.now(),
      };
    }
  } catch (e) {
    window.notify?.(e);
    $.token = undefined;
    document.cookie = 'token=; Max-Age=0';
  }
};

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
  window.EQUIPMENT = EQUIPMENT;
  window.equipmentTooltipProps = equipmentTooltipProps;
  window.abilityTooltipProps = abilityTooltipProps;
  window.ALL_FIGHTS = ALL_FIGHTS;
  window.INITIAL_COMBAT = INITIAL_COMBAT;
  window.calculateCombatStatsByCharacter = calculateCombatStatsByCharacter;
  window.getLevelByExperience = getLevelByExperience;
  window.getCurrentExperienceAtLevel = getCurrentExperienceAtLevel;
  window.getExperienceForNextLevel = getExperienceForNextLevel;
  window.getExperienceReward = getExperienceReward;
  window.allowedNumberOfCharacters = allowedNumberOfCharacters;
  window.isDev = config.IS_DEV;

  window.selectBrawler = (e, uuid) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!$.maxBrawlers || !uuid) return;
    if ($.selectedBrawlers.includes(uuid)) {
      $.selectedBrawlers = $.selectedBrawlers.filter((id) => id !== uuid);
    } else if ($.selectedBrawlers.length < $.maxBrawlers) {
      $.selectedBrawlers.push(uuid);
    }
    if (window.updateFightSlots) updateFightSlots();
  };

  // Restore token from cookie BEFORE vibe initializes so the first hydration
  // already knows we're logged in — avoids a login-screen flash before the
  // ready hook would otherwise restore it.
  const cookie = getCookie();

  window.$ = vibe(
    {
      ...appState,
      token: cookie?.token,
      page: { name: pageName, params: routeParams },
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
    document.body.toggleAttribute('light', !$.settings?.darkMode);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$.gameKeyboardDisabled) {
        $.overlay = Object.keys($.overlay).length ? {} : { name: 'GameMenu' };
      }

      // Shift + Option/Alt + D toggles the DevBar. Match on e.code so we don't
      // have to deal with Option producing the special `∂` character on macOS.
      if (window.isDev && e.shiftKey && e.altKey && e.code === 'KeyD') {
        e.preventDefault();
        $.devbarOpen = !$.devbarOpen;
      }
      if (window.isDev && e.shiftKey && e.altKey && e.code === 'KeyS') {
        e.preventDefault();
        $.vibeStateInspector = !$.vibeStateInspector;
      }
    });

    // Client clock
    setInterval(() => {
      if ($.clock.server) {
        $.clock.now = $.clock.server + (performance.now() - $.clock.client);
      }
    }, 250);

  });

  $.on('afterUpdate', (current, prev) => {
    // Load game state when socket + token are both available
    // Matches SvelteKit's $effect pattern: fires on either transition
    const justConnected = current.socket && !prev.socket && current.token;
    const justGotToken = current.token && !prev.token && current.socket;
    if (justConnected || justGotToken) {
      loadGameState(current.token);
    }

    // Level-up detection (stays global — triggers overlay + heals all characters)
    try {
      const level = getLevelByExperience(current.experience || 0);
      const prevLevel = getLevelByExperience(prev.experience || 0);
      if (level > prevLevel && prev.experience > 0) {
        $.overlay = { name: 'AccountProgression' };
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
