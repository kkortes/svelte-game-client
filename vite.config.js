import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoImport from 'sveltekit-autoimport';

export default defineConfig({
  build: {
    sourcemap: true
  },
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
        'svelte-component-kit': ['Tooltip'],
        '$src/store': ['STORES', 'ACTIONS'],
        'tailwind-merge': ['twMerge as tw']
      },
      include: ['**/*.svelte']
    }),
    sveltekit()
  ]
});
