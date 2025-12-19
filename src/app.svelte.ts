import type { AsyncAwaitWebsocket } from 'async-await-websockets';
import app from '@/app.svelte';
import type { Tooltip } from '@/ts/use';
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
  sfx: 0.5
};

export default new (class {
  serverTimestampSnapshot: number = $state(0);
  syncPerformanceNow: number = $state(0);
  serverTimestamp: number = $state(0);
  socket = $state() as AsyncAwaitWebsocket;
  token: string | undefined = $state();
  experience: number = $state(0);
  tooltip?: Tooltip = $state();
  dialog?: Dialog = $state();

  notifications: string[] = $state([]);

  gameKeyboardDisabled: boolean = $state(false);
  keys: DynamicObject = $state({});
  overlay: string = $state('');
  settings: DynamicObject = $state(
    loadLocalStorage({
      darkMode: true,
      lockSidebar: false,
      volume: SETTINGS_DEFAULT_VOLUME,
      loginPageMode: 0,
      openProperties: {},
      debugOpen: false
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
        const experience = $state.snapshot(this.experience); // Hack to trigger reruns

        // console.info(app.syncPerformanceNow);
        const saveDebounce = setTimeout(() => {
          if (app.socket && app.token) {
            (async () => {
              const res = await app.socket.sendAsync('store-game-state', {
                token: app.token,

                experience
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
