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
  master: 0,
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
  combatTeam0: [],
  combatTeam1: [],
  combatScale: 1,
  combatEnded: false,
  combatOutcome: '',
  combatRewardXp: 0,
  combatRewardBoss: false,
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
  tooltip: { visible: false, x: 0, y: 0, props: {} },
  dialogProps: '',
  notifications: [],
  overlay: '',
  settings: loadLocalStorage({
    volume: SETTINGS_DEFAULT_VOLUME,
    loginPageMode: 0,
    openProperties: {},
    debugOpen: false,
    showDetailedCharacterView: false,
    darkMode: false,
    codeOfConduct: false,
    rememberMe: false,
    savedEmail: '',
    savedPassword: ''
  }),
  route: '/',
  routeParams: {},
};

export { SETTINGS_DEFAULT_VOLUME, INITIAL_COMBAT };
