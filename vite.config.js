import { defineConfig } from 'vite';
import { existsSync, readdirSync, cpSync } from 'fs';
import { resolve } from 'path';
import vibe from '@ape-egg/vite-plugin-vibe';

const dynamicRoutes = [
  { pattern: /^\/brawlers\/\d+$/, file: '/pages/brawler-detail.html' },
  { pattern: /^\/the-arena\/.+$/, file: '/pages/fight-detail.html' },
  { pattern: /^\/reset-password\/.+$/, file: '/pages/reset-password.html' },
];

const pageInputs = Object.fromEntries(
  readdirSync('pages')
    .filter((f) => f.endsWith('.html'))
    .map((f) => [`pages/${f.replace(/\.html$/, '')}`, resolve('pages', f)]),
);

export default defineConfig({
  server: { port: 3001, allowedHosts: ['.test'] },
  build: {
    rollupOptions: { input: pageInputs },
  },
  plugins: [
    vibe({
      debug: true,
    }),
    {
      name: 'copy-runtime-fetched',
      closeBundle() {
        cpSync('components', 'dist/components', { recursive: true });
        cpSync('static', 'dist/static', { recursive: true });
        cpSync('js', 'dist/js', { recursive: true });
      },
    },
    {
      name: 'mpa-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];

          for (const { pattern, file } of dynamicRoutes) {
            if (pattern.test(url)) {
              req.url = file;
              return next();
            }
          }

          const page = url === '/' ? 'home' : url.slice(1);
          const pagePath = `pages/${page}.html`;
          if (existsSync(pagePath)) {
            req.url = `/${pagePath}`;
            return next();
          }

          next();
        });
      },
    },
  ],
});
