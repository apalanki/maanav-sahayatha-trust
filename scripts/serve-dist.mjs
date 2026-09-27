/**
 * Serves dist/public the way GitHub Pages does, for end-to-end tests:
 * - `/programs/medical` resolves to `programs/medical.html` (or `.../index.html`)
 * - unknown paths return 404.html with a 404 status
 * - served from `/` when client/public/CNAME exists, otherwise under `/maanav-sahayatha-trust/`
 *
 * Usage: node scripts/serve-dist.mjs   (PORT env var, default 4321)
 */
import { existsSync, readFileSync, statSync } from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "dist", "public");
const prefix = existsSync(path.join(root, "client", "public", "CNAME"))
  ? "/"
  : "/maanav-sahayatha-trust/";
const port = Number(process.env.PORT || 4321);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

const isFile = f => existsSync(f) && statSync(f).isFile();

http
  .createServer((req, res) => {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname
    );
    let file;
    if (pathname.startsWith(prefix) || pathname + "/" === prefix) {
      const base = path.join(dir, pathname.slice(prefix.length));
      if (base.startsWith(dir)) {
        file = [base, `${base}.html`, path.join(base, "index.html")].find(
          isFile
        );
      }
    }
    const status = file ? 200 : 404;
    file ??= path.join(dir, "404.html");
    res.writeHead(status, {
      "content-type":
        types[path.extname(file).toLowerCase()] || "application/octet-stream",
    });
    res.end(readFileSync(file));
  })
  .listen(port, () =>
    console.log(`Serving dist/public at http://localhost:${port}${prefix}`)
  );
