# ADR-004: Bilingual site (English + German), rolled out page by page

Date: 2026-07-15 · Status: accepted

## Context

The original content strategy (see workspace `website/00-DECISIONS.md`, Phases 2
and 9) planned English-only content until the owner could write, maintain, and
defend every page in German at a fluency matching the page itself — reflecting
a genuine B1 (improving) level and a wish not to create expectations an
interview couldn't meet.

The owner overrode this: the site's audience includes both English- and
German-speaking professionals, and it should not be limited to one language
regardless of his own current proficiency.

## Decision

The site is bilingual, English (default, root paths) and German (`/de/`),
configured via Astro's built-in i18n routing. Rollout is **page by page,
English-first**: a page ships in English, then gains a German version as a
later, separate changelog entry — mirroring how case studies themselves ship
incrementally. No page is bilingual before it exists in English.

German content is AI-drafted and human-reviewed before publishing, and each
translated page discloses this plainly — extending the same transparency
commitment already made for AI-assisted site development (colophon, ADR
practice) to translation specifically. This keeps the bilingual site
consistent with the project's honesty principle even though the original
proficiency-gated trigger no longer applies.

## Consequences

- Ongoing translation is now a standing, permanent maintenance task, not a
  deferred one — every future page adds an English task and (soon after) a
  German task. This materially increases the effort per page above the
  original 8–12 h/month plan; the owner has accepted that trade knowingly.
- `LangToggle.astro` only appears on pages that actually have both versions,
  so no dead links are ever shown.
- Legal pages (Impressum, Datenschutz) remain canonically German-only, per
  standard German practice — not a gap in the bilingual commitment.
