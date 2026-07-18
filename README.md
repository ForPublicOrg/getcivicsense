# Get Civic Sense

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org)

**getcivicsense.org** - a free, non-partisan, all-ages civic-sense platform for India.
Sibling to [RankYourPolitician](https://www.rankyourpolitician.com); same architecture DNA
(static, cited, fast on cheap phones), a different job: teach civic sense as a mirror, not a lecture.

> **Civic sense isn't about them. It's about all of us.**

Each behaviour is an illustrated card: a picture and a plain line a seven-year-old can read up top,
and - one tap down, in a native `<details>` drawer with zero JavaScript - the real cause → mechanism →
measured effect, each with a source, a strength-of-evidence badge, and the date we checked it.

## The three things this repo never trades away

1. **Speed / cost.** Every page is static/ISR and CDN-served. No database at all. No blocking scripts.
   Big lists precompute to `public/*.json`; search is a static index answered in the browser.
2. **No personal data.** No accounts, no login, no analytics, no beacons. The "I do this too" tally lives
   only in `localStorage`, on-device, and is never transmitted. DPDP Act 2023 by architecture.
3. **Everything is for the public.** MIT, open seed, non-partisan, non-religious. **No citation, no claim** -
   `npm run validate` fails the build on any uncited or over-claimed fact.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000 - builds the static content, then serves the seed
```

`npm run build` runs `prebuild` first (regenerate `public/*.json`, then `validate`), then `next build`.

## How it's built (mirrors the sibling)

- **Next.js 15 App Router, React 19, TypeScript, Tailwind.** Every page static/ISR.
- **Locale** is the `[lang]` URL segment, rewritten from a `lang` cookie at the edge in `middleware.ts` -
  never read during render, so pages stay statically cacheable. English is the source of truth; other
  locales deep-merge over it and fall back to English per key.
- **Content** is committed JSON in `data/seed/` → `tools/build-content.mjs` emits per-category slices +
  one search index into `public/` → pages prerender via `generateStaticParams`.
- **Illustrations** are two-tier: inline single-concept pictograms (`components/Icon.tsx`) and flat,
  text-free scene SVGs (`components/Illustration.tsx`) themed via CSS variables + `currentColor`, so one
  asset serves every language and both light/dark.

## The evidence model

Every impact claim carries `cause`, `mechanism`, `effect`, `jurisdiction`, an `evidence_tier`, a verbatim
`supported_by` quote, `source_url` and `retrieved_date`. A printed magnitude number is only allowed on the
top tiers (`strong`, `official`); observational claims show an association, mechanistic claims show no
number. Foreign figures (e.g. WHO's European noise thresholds) are labelled and shown for the mechanism,
never laundered into an Indian number. See `/methodology`.

## Structure

```
app/[lang]/              every page, static per locale (home, [category], [category]/[behaviour], search, about, methodology, sources, privacy)
components/              Illustration, BehaviourCard, EvidenceDrawer (the <details> drawer), StrengthBadge, CategoryGrid, SearchBox, SameNa, ShareButton, Header, Footer
data/seed/               taxonomy.json + behaviours/*.json (the committed, cited dataset)
lib/                     i18n core, content loader, types, site links
tools/                   build-content.mjs (prebuild payloads) · validate.mjs (no citation, no claim)
middleware.ts            edge locale routing
```

## Cross-link with RankYourPolitician

RYP's footer links here via a `footer.civicSense` key ("What is civic sense?"); this site links back to RYP
from its own footer. Neither takes a runtime dependency on the other.

## License

MIT. Facts retain their own sources, cited per datapoint (see `/sources`).
