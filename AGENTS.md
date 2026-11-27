# Agents Field Guide

The Field Guide stores source material verbatim. Do not interpret, rewrite or add content unless Callum explicitly asks. The writing guide defines the limited formatting and navigation metadata allowed when filing a source.

Read the [Field Guide writing guide](docs/writing-guide.md) for content changes and [AGENT.md](AGENT.md) for Nimbus implementation and checks. The private KB is a source for research. Only material cleared for readers belongs in `src/content/docs/`.

Save originals under `sources/<reference-slug>/` and run `npm run sources:upload -- <reference-slug>`. The command uploads to R2, verifies the downloads and records their URLs in `source.json`. Use those URLs on guide pages. Source payloads stay out of Git; keep the manifests. See [source storage](sources/README.md).

Apply the writing guide’s catalogue rules to every index entry, including prompts. Check the generated homepage after changing catalogue copy.

Public content commits generate changelog updates. Follow the [changelog rules](docs/writing-guide.md#changelog) and check the rendered entry before and after publishing.

When changing behavior, preserve existing presentation. Carry styles forward when replacing components, and compare the rendered result against the previous version before finishing.

Preview status belongs only in Field reports. Never add a Preview label or line to any other page or catalogue entry, including the private guide. Showing a page on localhost does not call for a status label.

`src/lib/navigation.mjs` owns category groups and legacy redirects. Register new pages there, including pages shown only on localhost. `npm run catalogue:sync` generates the homepage and redirect rules; `npm run build` checks category content paths, URLs and rendered breadcrumbs together. Before showing Callum a page, open its canonical category URL and follow its breadcrumb.

Publish only after Callum explicitly signs off the rendered change. Approval covers the reviewed wording and presentation; subsequent editorial changes need another review before publication.

Treat the standalone site and the private `Agents Field Guide.md` in Obsidian as two editions of the same guide. In the same task, update both editions when changing shared entries, titles, dates, ordering or what appears in the overview. Compare both before finishing. Use the vault's existing note links for private context and public URLs on the site. The site builds from this repo alone.
