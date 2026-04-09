const loadLocalStorage = (props) =>
  Object.entries(props).reduce(
    (a, [key, value]) => ({
      ...a,
      [key]: window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : value
    }),
    {}
  );

const SETTINGS_DEFAULT_VOLUME = {
  master: 0.5,
  ambient: 0.25,
  sfx: 0.5,
  combat: 1
};

const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0,
  winningTeam: undefined,
  fightId: undefined,
  audio: []
};

export default {
  combat: INITIAL_COMBAT,
  liveTeams: [],
  elapsedMilliseconds: 0,
  serverTimestampSnapshot: 0,
  syncPerformanceNow: 0,
  serverTimestamp: 0,
  experience: 0,
  coins: 400,
  accountRewards: 1,
  bossHighscore: 0,
  characters: [],
  inventory: [],
  socket: undefined,
  token: undefined,
  selectedBrawlers: [],
  maxBrawlers: 0,
  tooltip: undefined,
  dialog: undefined,
  showAccountProgression: false,
  notifications: [],
  gameKeyboardDisabled: false,
  keys: ['keyw','keya','keys','keyd','keyi','keyq','keye','keyz','keyx','keyc','arrowright','arrowleft','arrowdown','arrowup','escape','enter','shiftleft','shiftright','digit1','digit2','digit3','digit4','digit5','numpad1','numpad2','numpad3','numpad4','numpad5','numpad6','numpad7','numpad8','numpad9'].reduce((a, key) => ({ ...a, [key]: false }), {}),
  combatTeam0: [],
  combatTeam1: [],
  combatRewardXp: 0,
  healTimer: 120,
  healTimerPct: 0,
  overlay: '',
  settings: loadLocalStorage({
    volume: SETTINGS_DEFAULT_VOLUME,
    loginPageMode: 0,
    openProperties: {},
    debugOpen: false,
    showDetailedCharacterView: false
  }),
  route: '/',
  routeParams: {},
  mqs: {}
};

export { SETTINGS_DEFAULT_VOLUME, INITIAL_COMBAT };
