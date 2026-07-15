// @ts-check
import { defineConfig } from "astro/config";

// User-site repos (<username>.github.io) serve from the root, so no `base` path is needed.
export default defineConfig({
  site: "https://sahilgaji.github.io",
});
