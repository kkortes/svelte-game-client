import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      $src: 'src/*',
      '$svelte-game-engine': 'svelte-game-engine/*'
    }
  },
  preprocess: vitePreprocess(),
  vitePlugin: {
    // set to true for defaults or customize with object
    inspector: {
      toggleKeyCombo: 'meta-shift',
      showToggleButton: 'never',
      holdMode: true
    }
  }
};
