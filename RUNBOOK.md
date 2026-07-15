# Runbook

Routine operations for this site. If a task isn't written down here, it depends on
someone's memory — write it down.

## Develop

- `npm install` — once per machine
- `npm run dev` — local dev server
- `npm run build` — production build to `dist/`

## Deploy

Push to `main`. GitHub Actions builds and deploys to GitHub Pages. No manual steps.

## Pre-launch state (current)

The site is deployed but deliberately NOT indexable:

- `<meta name="robots" content="noindex">` in `src/layouts/Base.astro`
- `Disallow: /` in `public/robots.txt`

## Launch day (v1.0 — when the Definition of Done is met, not a date)

1. Remove the noindex meta from `Base.astro`.
2. Replace `public/robots.txt` with allow-all + sitemap line.
3. Set `site` in `astro.config.mjs` (enables canonical URLs and the sitemap).
4. Verify Impressum + Datenschutz pages are live (legal blocker in Germany).
5. Submit the sitemap to Google Search Console and Bing Webmaster Tools.
6. Changelog entry `v1.0.0`.

## Quarterly ritual (~2 h)

- Update dependencies (`npm outdated` → update → build → verify).
- Refresh dashboard data.
- Update the Now page (mono "last updated" stamp).
- Glance at Search Console + analytics.
- Changelog entry if anything notable.
