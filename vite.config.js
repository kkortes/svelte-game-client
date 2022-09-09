import { sveltekit } from '@sveltejs/kit/vite';
import autoImport from 'sveltekit-autoimport';

export default {
  build: {
    sourcemap: true
  },
  // Allows us to read data from `package.json`
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [
    autoImport({
      components: [{ name: './src/components', flat: true }],
      mapping: {
        ENV: `import ENV from '$src/constants/ENV_VARS'`
      },
      module: {
        svelte: ['onMount', 'onDestroy'],
        'svelte-component-kit': ['Crow', 'Icon', 'Tooltip'],
        '$src/store': ['STORES', 'ACTIONS']
      },
      include: ['**/*.svelte']
    }),
    sveltekit()
  ]
  // resolve: {
  // 	mainFields: ['module', 'jsnext:main', 'jsnext', 'browser']
  // },
};
