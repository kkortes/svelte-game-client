import { getContext, onMount } from 'svelte';
import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Some props for the app
export const width = writable(browser ? window.innerWidth : undefined);
export const height = writable(browser ? window.innerHeight : undefined);
export const pixelRatio = writable(browser ? window.devicePixelRatio : undefined);
export const ctx = writable();
export const canvas = writable();
export const time = writable(0);

// A more convenient store for grabbing all game props
export const props = deriveObject({
  ctx,
  canvas,
  width,
  height,
  pixelRatio,
  time
});

export const key = Symbol();

// export const getState = () => {
//   const api = getContext(key);
//   return api.getState();
// };

export const renderable = (render) => {
  const api = getContext(key);

  const element = {
    ready: false,
    mounted: false
  };
  if (typeof render === 'function') {
    element.render = render;
  } else if (render) {
    if (render.render) element.render = render.render;
    if (render.setup) element.setup = render.setup;
  }

  onMount(() => {
    api.add(element);

    element.mounted = true;
    return () => {
      api.remove(element);
      element.mounted = false;
    };
  });
};

function deriveObject(obj) {
  const keys = Object.keys(obj);
  const list = keys.map((key) => {
    return obj[key];
  });
  return derived(list, (array) => {
    return array.reduce((dict, value, i) => {
      dict[keys[i]] = value;
      return dict;
    }, {});
  });
}
