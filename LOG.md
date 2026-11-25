# Worklog

## 2026-11-24 — Git-based changelog

- Outcome: a dated timeline of current catalogue pages, linking to each page. Git supplies each page's first recorded addition date, following renames; edits and maintenance commits do not create entries.
- Final design chosen by Callum: one date and one dot per day, with that day's pages grouped alongside. The explanatory body sentence was removed.
- The header and homepage link to Changelog. The private guide overview uses the same wording and links to the public route.
- Build behavior: full Git history is required; the prebuild step fetches it from origin when Cloudflare supplies a shallow checkout. Uncommitted pages have no addition date yet. Git lookup uses the project working directory so source paths also resolve during static builds.
- Validation: typecheck has zero diagnostics; MDX lint passes; Git history (including a real shallow build checkout) and catalogue tests, catalogue sync, production build and category breadcrumb checks pass. Built HTML has 9 day labels and 49 working page targets, all also present in Markdown. Desktop and mobile were checked on localhost.
- Delivery: Callum authorized publication through the existing main-branch Cloudflare Workers Builds pipeline. Deployment and live verification evidence belongs in the publishing chat.

## 2026-11-25 — Separate decisions from effects

- Added the approved adapted prompt with Jussi’s source credit; registered through the existing Prompts directory rule. Updated both catalogues and six-entry overviews, plus the canonical private Prompt record.
- Verified production build, catalogue and breadcrumb checks, matching prompt wording in both editions, and localhost page, category breadcrumb and homepage entry (one line at 1280px, no horizontal overflow). Private links and overview sync pass.
- Callum authorized publication with the shared wrapping fix on 25 Nov 2026. Both editions are synchronized; delivery follows the existing main-branch Cloudflare Workers Builds pipeline.

## 2026-11-25 — Wrap prompt blocks

- Plaintext prompt fences wrap within the content width and grow with their contents. Removed the intrinsic max-content width for these blocks; retained the existing border, spacing, font and copy control.
- Production build and breadcrumb checks pass. On localhost the decisions prompt grew from 48px to 120px at 1280px, with scroll width equal to visible width and no clipped text. At 390px, both this prompt and the long-URL performance prompt have no horizontal or vertical clipping. Callum authorized publication on 25 Nov 2026.
