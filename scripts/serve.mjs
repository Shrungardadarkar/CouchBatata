import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = normalize(join(fileURLToPath(new URL("..", import.meta.url))));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    const candidate = normalize(join(root, pathname));
    if (!candidate.startsWith(root)) throw new Error("Invalid path");
    const info = await stat(candidate);
    if (!info.isFile()) throw new Error("Not a file");
    const body = await readFile(candidate);
    response.writeHead(200, {
      "content-type": types[extname(candidate)] || "application/octet-stream",
      "cache-control": "no-cache"
    });
    response.end(body);
  } catch {
    response.writeHead(404, {"content-type": "text/plain; charset=utf-8"});
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Couch Batata: http://127.0.0.1:${port}/`);
});
