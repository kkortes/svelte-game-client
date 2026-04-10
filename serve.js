import { readFileSync, existsSync, watch } from 'fs';
import { join, extname } from 'path';

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
};

const root = import.meta.dir;
const port = Number(process.env.PORT) || 3000;

// MPA route table — clean URLs to page files
const routes = {
  '/': 'pages/home.html',
  '/brawlers': 'pages/brawlers.html',
  '/the-arena': 'pages/the-arena.html',
  '/random-duel': 'pages/random-duel.html',
  '/vendor': 'pages/vendor.html',
  '/debug': 'pages/debug.html',
  '/ability-scaling': 'pages/ability-scaling.html',
  '/character-scaling': 'pages/character-scaling.html',
  '/equipment-scaling': 'pages/equipment-scaling.html',
};

const dynamicRoutes = [
  { pattern: /^\/brawlers\/\d+$/, file: 'pages/brawler-detail.html' },
  { pattern: /^\/the-arena\/.+$/, file: 'pages/fight-detail.html' },
  { pattern: /^\/reset-password\/.+$/, file: 'pages/reset-password.html' },
];

// SSE clients for live reload
const clients = new Set();

for (const dir of ['components', 'pages', 'js', 'css']) {
  const target = join(root, dir);
  if (existsSync(target)) {
    watch(target, { recursive: true }, () => {
      clients.forEach(c => c.enqueue('data: reload\n\n'));
    });
  }
}

const RELOAD_SCRIPT = `<script>new EventSource('/__reload').onmessage = () => location.reload()</script>`;

const servePage = (file) => {
  const content = readFileSync(join(root, file));
  return new Response(content.toString() + RELOAD_SCRIPT, {
    headers: { 'Content-Type': 'text/html' }
  });
};

Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);

    // Live reload SSE
    if (url.pathname === '/__reload') {
      let controller;
      const stream = new ReadableStream({
        start(c) { controller = c; clients.add(c); },
        cancel() { clients.delete(controller); }
      });
      return new Response(stream, {
        headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' }
      });
    }

    // Static files
    const filePath = join(root, url.pathname);
    if (existsSync(filePath) && !filePath.endsWith('/')) {
      const content = readFileSync(filePath);
      const ext = extname(filePath);
      if (ext === '.html') return new Response(content.toString() + RELOAD_SCRIPT, { headers: { 'Content-Type': 'text/html' } });
      return new Response(content, { headers: { 'Content-Type': MIME[ext] || 'application/octet-stream' } });
    }

    // Route table
    const routeFile = routes[url.pathname];
    if (routeFile) return servePage(routeFile);

    // Dynamic routes
    for (const { pattern, file } of dynamicRoutes) {
      if (pattern.test(url.pathname)) return servePage(file);
    }

    return new Response('Not found', { status: 404 });
  },
});

console.info(`Dev server running at http://localhost:${port}`);
