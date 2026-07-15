# ADR-003: Typography — Newsreader, system sans, Geist Mono

Date: 2026-07-15 · Status: accepted

## Context

The design system defines three typographic voices: a display serif (titles, pull
quotes), a text sans (body, UI), and a data mono (metrics, dates, changelog,
captions). Candidates were compared on a specimen page (`/specimen`, retired with
this ADR) using real site copy, judged on phone and desktop in both themes.

## Decision

- **Display serif: Newsreader** — more editorial character than Source Serif 4
  at display sizes.
- **Text sans: the system stack** — chosen over Geist. Native rendering on every
  platform and zero font bytes for the highest-volume voice.
- **Data mono: Geist Mono** — chosen over JetBrains Mono.

Newsreader and Geist Mono are OFL-licensed variable fonts, self-hosted via
Fontsource packages (no Google Fonts CDN — GDPR) and imported globally in the
base layout. Unused candidate packages were removed.

## Consequences

- Web-font payload is limited to two variable faces; body text costs nothing.
- OFL licensing permits committing font files to this public repository.
- The system-stack body means body text renders slightly differently per OS —
  accepted as a feature (native feel), not a defect.
