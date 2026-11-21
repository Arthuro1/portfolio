# CV sources

`cv.en.html` and `cv.de.html` share `cv.css` and are printed to `public/cv/*.pdf` by `node cv/render.mjs` (run from the repo root; needs Microsoft Edge and internet access for the Inter font).
Playwright is not a repo dependency: set `PLAYWRIGHT_PATH` to a local `node_modules/playwright` folder, for example `PLAYWRIGHT_PATH=/path/to/node_modules/playwright node cv/render.mjs`. Without it the script tries a normal `require("playwright")` and stops with a message if that fails.
