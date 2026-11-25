# Worklog

## 2026-11-25 — Homepage changelog preview

- Final direction approved by Callum: a compact “Recently added” section beneath search, with three linked titles and “View changelog →”. No homepage timeline, dates or category labels; the full Changelog retains its dated timeline.
- HTML, alternate Markdown and private overview show the same three titles. The homepage uses the existing Git addition data; the full timeline component is unchanged.
- Validation: production build, catalogue and breadcrumb checks, typecheck (zero diagnostics), and MDX lint pass. Localhost shows exactly three links with no timeline rows or horizontal overflow. Markdown has three entries without dates or categories; full timeline retains all entries. KB overview sync passes; prior vault layout and harness checks passed for the support-script change.
- Delivery: Callum authorized publication on 25 Nov 2026. Publish the compact homepage and prior writing-instruction commit through the main-branch Cloudflare pipeline. The separate Toyota essay remains local and excluded. Verify the successful build and live homepage after pushing.


## 2026-11-25 — Five-step build process

- Added the five-step process to Playbooks, sourced from Callum's grid-fins article and its linked Everyday Astronaut interview. Callum rejected the agent's initial paraphrases and added interpretation: the page now reproduces his step list and notes verbatim, with only heading levels adjusted. Removed the agent adaptation and rewritten anecdotes.
- Added the entry first in both editions and regenerated their six-entry overviews. The private edition links to the existing article capture.
- Validation: production build, catalogue tests and category breadcrumb checks pass. Localhost page and category navigation checked; homepage entry wraps to two lines. Both overview titles, order and new description match. Docs lint passes for MDX but does not inspect Markdown pages.
- Delivery: Callum authorized publication on 25 Nov 2026. Source entry and image committed as `685a143` and pushed to main. Cloudflare Workers Builds completed successfully (build `fd73ddab-4557-4a5a-8da2-f30daa2ae44b`); live Markdown notes match the approved source text, timing is present, and live image bytes match. Rendered production page checked at https://afg.callum.website/five-step-build-process/.
- Follow-up: added Callum's supplied SpaceX process photo immediately above “The five steps”; stored the asset in the site's public images folder with descriptive alt text.
- Scrawl correction: YouTube is the first source, labelled “Starbase Tour with Elon Musk [PART 1 // Summer 2021]”, with its 53:16 duration and 13:22 start time. Callum's article is the second source. Verbatim notes checked against the existing article capture.
- Instruction repair: the writing guide now makes verbatim reproduction the default for sourced additions, requires explicit requests for rewriting, interpretation, expansion or adaptations, and requires comparison against the source. Its original-writing advice is scoped to requested writing and catalogue copy. The existing AGENTS.md link remains the entry point.
- Review repair: made source storage unqualified at the root and writing guide; limited catalogue/frontmatter copy to source excerpts or literal inventory descriptions; removed implied authority to invent prompt uses, reports or examples. Removed the operative link to the older design proposal and marked that document historical. Fresh independent review: PASS, no remaining operative permission for interpretation or substantive additions from “add this source.” Reviewed the Codex and Claude instruction routes and five source/original-report scenarios. This verifies instruction consistency, not future agent compliance. Diff whitespace check passes; changes remain local.
- Final clarification: the verbatim default must not prevent an explicitly requested edit, rewrite, interpretation or addition. Callum asked for the writing-instruction changes to be committed separately after publication; that commit remains local.

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
