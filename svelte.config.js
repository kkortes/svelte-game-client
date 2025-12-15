import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter(),
    alias: {
      '@': 'src/*'
    }
  },
  compilerOptions: {
    runes: true
  },
  preprocess: vitePreprocess(),
  vitePlugin: {
    // set to true for defaults or customize with object
    inspector: {
      toggleKeyCombo: 'meta-shift',
      showToggleButton: 'never',
      holdMode: true
    },
    // This ignores "compilerOptions.runes = true" for external packages
    // Ideally this is removed once third party packages supports Svelte 5 runes
    dynamicCompileOptions({ filename }) {
      if (filename.includes('node_modules')) {
        return { runes: undefined }; // or false, check what works
      }
    }
  }
};
