import type { Combat } from '@/types/combat';
import type { CharacterRef } from '@/types/character';
import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '@/app.svelte';
import type { EquipmentRef } from '@/types/equipment';
import type { Tooltip } from '@/ts/use';
import type { Team } from '@/types/team';
import type { Dialog } from '@/ts/dialog';
import type { DynamicObject } from '@/types/common';
import loadLocalStorage from '@/ts/loadLocalStorage';
import { browser } from '$app/environment';
import mediaQuery from '@/ts/mediaQuery';

const audioModules = import.meta.glob('/static/audio/**/*.*', { eager: true });
export const AUDIO: Record<string, string> = {};

for (const [path, module] of Object.entries(audioModules)) {
  const filename =
    path
      .split('/')
      .pop()
      ?.replace(/\.(wav|mp3)$/, '') || '';
  AUDIO[filename] = (module as { default: string }).default; // correct production URL
}

export const SETTINGS_DEFAULT_VOLUME = {
  master: 0.5,
  ambient: 0.25,
  sfx: 0.5,
  combat: 1
};

export const INITIAL_COMBAT = {
  teamsStartState: [],
  teamsEndState: [],
  events: [],
  duration: 0,
  winningTeam: undefined,
  fightId: undefined,
  audio: []
};

const INITIAL_CHARACTERS: Required<CharacterRef>[] = [];
// const INITIAL_INVENTORY = [
//   EQUIPMENT('sword'),
//   EQUIPMENT('sword'),
//   EQUIPMENT('dagger'),
//   EQUIPMENT('dagger'),
//   EQUIPMENT('shield'),
//   EQUIPMENT('greatSword'),
//   EQUIPMENT('leatherBoots')
// ];
const INITIAL_INVENTORY: EquipmentRef[] = [];
const INITIAL_COINS = 400; // One silver

export default new (class {
  combat: Combat = $state(INITIAL_COMBAT);
  liveTeams: Team[] = $state([]);
  elapsedMilliseconds: number = $state(0);

  serverTimestampSnapshot: number = $state(0);
  syncPerformanceNow: number = $state(0);
  serverTimestamp: number = $state(0);

  experience: number = $state(0);
  coins: number = $state(INITIAL_COINS);
  accountRewards: number = $state(1);
  bossHighscore: number = $state(0);

  characters: Required<CharacterRef>[] = $state(INITIAL_CHARACTERS);
  inventory: EquipmentRef[] = $state(INITIAL_INVENTORY);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();
  selectedBrawlers: string[] = $state([]);
  maxBrawlers: number = $state(0);

  tooltip?: Tooltip = $state();
  dialog?: Dialog = $state();
  showAccountProgression: boolean = $state(false);
  notifications: string[] = $state([]);

  gameKeyboardDisabled: boolean = $state(false);
  keys: DynamicObject = $state({});
  overlay: string = $state('');
  settings: DynamicObject = $state(
    loadLocalStorage({
      volume: SETTINGS_DEFAULT_VOLUME,
      loginPageMode: 0,
      openProperties: {},
      debugOpen: false,
      showDetailedCharacterView: false
    })
  );

  audio: any = $state(AUDIO);

  mqs = mediaQuery({
    desktop: '(min-width: 1200px)',
    tablet: '(min-width: 768px) and (max-width: 1199px)',
    smartphone: '(max-width: 767px)',
    landscape: '(orientation: landscape)',
    portrait: '(orientation: portrait)',
    hoverable: '(hover: hover)'
  });

  constructor() {
    $effect.root(() => {
      $effect(() => {
        const settings = $state.snapshot(this.settings);

        Object.entries(settings).forEach(
          ([key, value]) => browser && window.localStorage.setItem(key, JSON.stringify(value))
        );
      });
      $effect(() => {
        const inventory = $state.snapshot(this.inventory); // Hack to trigger reruns
        const characters = $state.snapshot(this.characters); // Hack to trigger reruns
        const experience = $state.snapshot(this.experience); // Hack to trigger reruns
        const coins = $state.snapshot(this.coins); // Hack to trigger reruns
        const accountRewards = $state.snapshot(this.accountRewards); // Hack to trigger reruns
        // console.info(app.syncPerformanceNow);
        const saveDebounce = setTimeout(() => {
          if (app.socket && app.token) {
            (async () => {
              const res = await app.socket.sendAsync('store-game-state', {
                token: app.token,
                inventory,
                characters,
                experience,
                coins,
                accountRewards
              });

              app.serverTimestampSnapshot = res;
              app.syncPerformanceNow = performance.now();
              console.info('Game state saved');
            })();
          }
        }, 1000);

        return () => clearTimeout(saveDebounce);
      });
    });
  }

  dump() {
    function flatSnapshot(o: any) {
      const out: any = {};
      let p = o;
      while ((p = Object.getPrototypeOf(p)) && p !== Object.prototype) {
        for (const n of Object.getOwnPropertyNames(p)) {
          const d = Object.getOwnPropertyDescriptor(p, n);
          if (d?.get && !(n in out)) {
            try {
              out[n] = o[n];
            } catch {
              console.error('Failed to get property', n);
            }
          }
        }
      }
      return out;
    }
    return flatSnapshot(this);
  }
})();
