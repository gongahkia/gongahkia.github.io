import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distRoot = path.join(root, "dist");
const routesPath = path.join(root, "public", "content", "routes.json");

function outputPathForRoute(route) {
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  if (!clean) return null;
  if (clean.endsWith(".html")) return path.join(distRoot, clean);
  return path.join(distRoot, clean, "index.html");
}

async function main() {
  const [indexHtml, routesRaw] = await Promise.all([
    fs.readFile(path.join(distRoot, "index.html"), "utf8"),
    fs.readFile(routesPath, "utf8"),
  ]);
  const routes = JSON.parse(routesRaw);
  let written = 0;

  for (const route of routes) {
    const target = outputPathForRoute(route);
    if (!target) continue;
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, indexHtml, "utf8");
    written += 1;
  }

  console.log(`generated ${written} static route wrappers`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
