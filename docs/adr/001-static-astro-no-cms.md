# ADR-001: Static Astro site, content in git, no CMS

Date: 2026-07-15 · Status: accepted

## Context

Single technical author with an 8–12 hours/month maintenance budget. Content-first
site with a small set of interactive islands. Priorities: fast, accessible,
maintainable, transparent, long-lasting, professional. The primary audience often
arrives via the LinkedIn in-app browser on mid-range phones, which sets the
performance budget.

## Decision

Astro with static output. Content lives as Markdown/MDX in this repository — no CMS.
Styling is vanilla CSS with design tokens — no utility framework. Interactivity ships
as small vanilla-JS islands — no client framework runtime by default.

## Consequences

- Near-zero JavaScript by default; the performance budget is realistic.
- Git history is the content audit trail; no external service to pay for, maintain,
  or be locked into.
- Markdown stays portable for decades; static HTML output outlives any framework.
- Trade-off accepted: no web-based editing UI — fine for a single technical author.
