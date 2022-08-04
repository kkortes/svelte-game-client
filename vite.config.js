import { sveltekit } from '@sveltejs/kit/vite';
import autoImport from 'sveltekit-autoimport';

export default {
	plugins: [
		autoImport({
			components: [{ name: './src/components', flat: true }],
			mapping: {
				ENV: `import ENV from '$src/constants/ENV_VARS'`,
				STORES: `import STORES from '$src/store/abs/stores'`,
				ACTIONS: `import ACTIONS from '$src/store/abs/actions'`
			},
			module: {
				svelte: ['onMount', 'onDestroy'],
				'svelte-component-kit': ['Crow', 'Icon', 'Tooltip']
			},
			include: ['**/*.svelte']
		}),
		sveltekit()
	]
};
