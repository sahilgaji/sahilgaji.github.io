// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// User-site repos (<username>.github.io) serve from the root, so no `base` path is needed.
// i18n (ADR-004): English is the default locale at the root; German lives under
// /de/. Pages are hand-authored per locale under src/pages/ and src/pages/de/ —
// translated one page at a time, English-first, as each page is written.
//
// React (ADR-005): added as an island for a single page (the Signal & Surface
// Home), not a sitewide framework. Every other page stays plain Astro/HTML —
// see ADR-005 for why and what it costs the performance budget.
export default defineConfig({
  site: "https://sahilgaji.github.io",
  integrations: [react()],
  i18n: {
    locales: ["en", "de"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
