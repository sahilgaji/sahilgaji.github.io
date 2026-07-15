# ADR-002: GitHub Pages on <username>.github.io, no purchased domain

Date: 2026-07-15 · Status: accepted

## Context

The original plan specified a purchased exact-match domain (`sahilgaji.com`,
~€10/year) with Cloudflare Pages hosting, for three reasons: name-search SEO,
email on an owned domain, and decade-scale link permanence independent of any
single platform.

## Decision

The owner chose GitHub Pages on the free `<username>.github.io` subdomain instead:
zero recurring cost, and the site's home aligns with the GitHub profile — the
repository, its history, and these ADRs are themselves part of the professional
identity on display.

## Consequences

- The GitHub username becomes part of the brand and is effectively permanent.
- Email stays on the existing provider; the owned-domain email plan is parked.
- Name-search SEO leans on cross-profile coherence and structured data rather
  than an exact-match domain.
- Reversible without breakage: configuring a custom domain later makes GitHub
  301-redirect the github.io URLs.
