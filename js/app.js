const loadLocalStorage = (props) =>
  Object.entries(props).reduce(
    (a, [key, value]) => ({
      ...a,
      [key]: window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : value,
    }),
    {},
  );

const SETTINGS_DEFAULT_VOLUME = {
  master: 0,
  ambient: 0.25,
  sfx: 0.5,
  combat: 1,
};

const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0,
  winningTeam: undefined,
  fightId: undefined,
  audio: [],
};

export default {
  combat: INITIAL_COMBAT,
  liveTeams: [],
  combatCards: [],
  elapsedMilliseconds: 0,
  clock: {
    server: 0, // server-trusted wall-clock anchor in ms. Set by the server on auth (and re-anchored on heal).
    client: 0, // client `performance.now()` reading at the same instant as `server`. Together they form the sync pair.
    now: 0, // derived current server time, recomputed every 250ms as `server + (performance.now() - client)`. Read this for "what time is it on the server right now".
  },
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
  notifications: [],
  overlay: {},
  settings: loadLocalStorage({
    volume: SETTINGS_DEFAULT_VOLUME,
    debugOpen: false,
    showDetailedCharacterView: false,
    darkMode: false,
    codeOfConduct: false,
    rememberMe: false,
    savedEmail: '',
    savedPassword: '',
  }),
  page: { name: 'home', params: {} },
};

export { SETTINGS_DEFAULT_VOLUME, INITIAL_COMBAT };
