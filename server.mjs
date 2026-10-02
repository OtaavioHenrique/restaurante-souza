import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };
const publicFiles = new Set(['/index.html', '/styles.css', '/script.js', '/assets/churrasco.jpg']);
const port = Number(process.env.PORT || 4173);

createServer(async (request, response) => {
  try {
    if (!['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { Allow: 'GET, HEAD' });
      response.end();
      return;
    }
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const publicPath = pathname === '/' ? '/index.html' : pathname;
    if (!publicFiles.has(publicPath)) {
      response.writeHead(404); response.end('Página não encontrada'); return;
    }
    const file = resolve(root, '.' + publicPath);
    if (!file.startsWith(root + sep)) {
      response.writeHead(403); response.end('Forbidden'); return;
    }
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Página não encontrada');
  }
}).listen(port, '127.0.0.1', () => console.log(`Restaurante Souza: http://127.0.0.1:${port}`));
