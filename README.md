# sahilgaji-website

Personal website of Sahil Gaji — Project Management & Digital Transformation.

Built in public. Every technical decision must serve one of six words — **fast,
accessible, maintainable, transparent, long-lasting, professional** — or it doesn't ship.

- Framework: [Astro](https://astro.build), static output, near-zero JavaScript
- Content: Markdown/MDX in this repository — git is the CMS
- Styling: vanilla CSS design tokens ([`src/styles/tokens.css`](src/styles/tokens.css))
- Hosting: GitHub Pages, deployed by GitHub Actions on every push to `main`
- Decisions: [`docs/adr/`](docs/adr/) — significant choices get an Architecture Decision Record
- Routine operations: [`RUNBOOK.md`](RUNBOOK.md)

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
```
