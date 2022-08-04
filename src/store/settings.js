import STORES from '$src/store/abs/stores';
import { browser } from '$app/env';

const { settings } = STORES;

// TODO: check if this is causes a memory leak
settings.subscribe((_settings) =>
	Object.entries(_settings).forEach(
		([key, value]) => browser && window.localStorage.setItem(key, JSON.stringify(value))
	)
);
