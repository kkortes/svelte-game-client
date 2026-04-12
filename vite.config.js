import { defineConfig } from 'vite';
import { existsSync } from 'fs';
import vibe from '@ape-egg/vite-plugin-vibe';

const dynamicRoutes = [
  { pattern: /^\/brawlers\/\d+$/, file: '/pages/brawler-detail.html' },
  { pattern: /^\/the-arena\/.+$/, file: '/pages/fight-detail.html' },
  { pattern: /^\/reset-password\/.+$/, file: '/pages/reset-password.html' },
];

export default defineConfig({
  server: { port: 3001 },
  plugins: [
    vibe(),
    {
      name: 'mpa-routes',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url.split('?')[0];

          for (const { pattern, file } of dynamicRoutes) {
            if (pattern.test(url)) { req.url = file; return next(); }
          }

          const page = url === '/' ? 'home' : url.slice(1);
          const pagePath = `pages/${page}.html`;
          if (existsSync(pagePath)) { req.url = `/${pagePath}`; return next(); }

          next();
        });
      },
    },
  ],
});
