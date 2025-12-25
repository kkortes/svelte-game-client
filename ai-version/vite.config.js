import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import autoImport from 'sveltekit-autoimport';
import tailwindcss from '@tailwindcss/vite';
import { componentsTypedefsPlugin } from './scripts/generate-component-typedefs';

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
    tailwindcss(),
    autoImport({
      components: [{ name: './src/components', flat: true }],
      mapping: {
        ENV: `import ENV from '@/constants/ENV_VARS'`,
        app: `import app from '@/app.svelte'`,
        Howl: `import { Howl, Howler } from 'howler'`
      },
      module: {
        svelte: ['onMount', 'onDestroy'],
        '@/ts/use': ['tooltip'],
        'tailwind-merge': ['twMerge as tw']
      },
      include: ['**/*.svelte']
    }),
    componentsTypedefsPlugin(),
    sveltekit()
  ]
});
