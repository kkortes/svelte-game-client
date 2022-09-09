import SGS from 'svelte-global-store';
import _stores from '$src/store/stores';
import _actions from '$src/store/actions';

const { stores, actions } = SGS(_stores, _actions);

export const STORES = stores;
export const ACTIONS = actions;
