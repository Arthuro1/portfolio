// Prints cv.en.html and cv.de.html to the PDFs in public/cv with Microsoft Edge.
// Playwright is not a dependency of this repo: set PLAYWRIGHT_PATH to any local install
// of the "playwright" package, or install it where Node can resolve it.
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require(process.env.PLAYWRIGHT_PATH ?? "playwright"));
} catch (error) {
  if (error.code !== "MODULE_NOT_FOUND") throw error;
  console.error(
    "Playwright not found. Set PLAYWRIGHT_PATH to a local node_modules/playwright folder, e.g.\n" +
      "  PLAYWRIGHT_PATH=/path/to/node_modules/playwright node cv/render.mjs",
  );
  process.exit(1);
}
const here = path.dirname(fileURLToPath(import.meta.url));
const jobs = [
  ["cv.en.html", "Paul-Arthur-Meteng-CV-EN.pdf"],
  ["cv.de.html", "Paul-Arthur-Meteng-Lebenslauf-DE.pdf"],
];

const browser = await chromium.launch({ channel: "msedge" });
try {
  const page = await browser.newPage();
  for (const [source, target] of jobs) {
    await page.goto(pathToFileURL(path.join(here, source)).href, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(here, "..", "public", "cv", target);
    await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
    console.log(`Wrote ${path.relative(process.cwd(), out)}`);
  }
} finally {
  await browser.close();
}
