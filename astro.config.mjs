// @ts-check
import { defineConfig } from "astro/config";

// User-site repos (<username>.github.io) serve from the root, so no `base` path is needed.
// i18n (ADR-004): English is the default locale at the root; German lives under
// /de/. Pages are hand-authored per locale under src/pages/ and src/pages/de/ —
// translated one page at a time, English-first, as each page is written.
export default defineConfig({
  site: "https://sahilgaji.github.io",
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
