import { STORES } from '$src/store';
import { browser } from '$app/env';

const { settings } = STORES;

settings.subscribe((settings) =>
  Object.entries(settings).forEach(
    ([key, value]) => browser && window.localStorage.setItem(key, JSON.stringify(value))
  )
);
