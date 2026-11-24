# Worklog

## 2026-11-24 — Git-based changelog

- Outcome: a dated timeline of current catalogue pages, linking to each page. Git supplies each page's first recorded addition date, following renames; edits and maintenance commits do not create entries.
- Final design chosen by Callum: one date and one dot per day, with that day's pages grouped alongside. The explanatory body sentence was removed.
- The header and homepage link to Changelog. The private guide overview uses the same wording and links to the public route.
- Build behavior: full Git history is required; uncommitted pages have no addition date yet. Git lookup uses the project working directory so source paths also resolve during static builds.
- Validation: typecheck has zero diagnostics; MDX lint passes; Git history and catalogue tests, catalogue sync, production build and category breadcrumb checks pass. Built HTML has 9 day labels and 49 working page targets, all also present in Markdown. Desktop and mobile were checked on localhost.
- Delivery: Callum authorized publication through the existing main-branch Cloudflare Workers Builds pipeline. Deployment and live verification evidence belongs in the publishing chat.
