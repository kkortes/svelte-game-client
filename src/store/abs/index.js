import SGS from 'svelte-global-store';
import stores from '$src/store/stores';
import actions from '$src/store/actions';

export default SGS(stores, actions);
