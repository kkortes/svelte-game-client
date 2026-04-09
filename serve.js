import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.wav': 'audio/wav', '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
};

const root = import.meta.dir;

Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    let path = join(root, url.pathname);

    // Serve static files if they exist
    if (existsSync(path) && !path.endsWith('/')) {
      return new Response(readFileSync(path), {
        headers: { 'Content-Type': MIME[extname(path)] || 'application/octet-stream' },
      });
    }

    // SPA fallback — serve index.html for all other routes
    return new Response(readFileSync(join(root, 'index.html')), {
      headers: { 'Content-Type': 'text/html' },
    });
  },
});

console.info('Dev server running at http://localhost:3000');
