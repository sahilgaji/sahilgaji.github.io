// @ts-check
import { defineConfig } from "astro/config";

// `site` is set at launch, once the GitHub username (= the *.github.io subdomain)
// is confirmed — see RUNBOOK.md "Launch day". User-site repos (<username>.github.io)
// serve from the root, so no `base` path is needed.
export default defineConfig({
  // site: "https://USERNAME.github.io",
});
