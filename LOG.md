# Worklog

## 2026-11-28 — Apply No Silver Bullet to building with agents

- Callum asked to adapt the preceding discussion into a short section, keeping Brooks’s argument distinct from our application. Mirror it in both editions and show the rendered local page for review.
- Both editions match. The production build and vault link checks pass. Verified the rendered source paragraph, four application bullets and References breadcrumb, then left the browser on the section for review. Delivery is local.
- Callum signed off the rendered page and authorized publication of the reference with “Building with agents,” its catalogue links and source manifest. Publish the approved text through Workers Builds on `main` and verify the live page and its single changelog addition.

## 2026-11-28 — File No Silver Bullet

- Callum asked to read the supplied 1986 UNC report and add it to References. Add the UNC PDF and a verbatim excerpt in both editions. Place the entry first in References. Keep the site local for rendered sign-off. Preserve the supplied bytes locally; the report has no republication notice and the site can link to UNC’s original.
- Filed the paper in both editions. The printed page 14 quotation, six-entry overviews and PDF checksums match. Production build and rendered breadcrumb checks pass. Opened the canonical page at `http://127.0.0.1:4339/references/no-silver-bullet/`, followed its References breadcrumb, and opened it from the homepage. The Obsidian note opens and reads back through its CLI, and its evidence link passes the vault checker. Source upload was a dry run; the entry is local and awaits rendered sign-off before publication.

## 2026-11-27 — Summarize grouped changelog updates

- Callum wants each public change listed inside a squash entry. Generate details from the release commit and its first parent, using the original Skills and Intent update as the review example. Keep the new presentation local for rendered sign-off.
- Callum rejected the first preview’s 13-line breakdown. Use one short bullet per changed page and group repeated actions into sentences. The Skills bullet should name the added entries. The Intent bullet should describe the six installs together and include the link back to Skills.
- The local preview renders two linked bullets. The squash test, production build, catalogue and breadcrumb checks, typecheck and MDX lint pass.
- Callum approved that preview and requested publication to main. The repo instructions now distinguish new-page additions from short updates to existing public pages and catalogues.

## 2026-11-27 — Include edits in the changelog

- Callum asked for a durable changelog rule after commit `a9b1e38` changed the public Skills index and Intent playbook without generating an entry. Keep first-publication dates and generate dated updates from public content commits. Begin with `a9b1e38`. Keep the homepage’s Recently added list focused on new pages.
- Prepare the rule and rendered changelog locally. The new presentation is subject to the Field Guide’s normal sign-off before publication.
- The rendered changelog now lists the 27 November update with working links to Skills and Intent specialists. The playbook retains its 17 November addition entry. Git fixtures, typecheck, docs lint, the production build, and the rendered homepage check passed. The update is ready for local review.

## 2026-11-26 — Five local atomic commits

- Callum authorized five local commits in order: category routes, editorial guidance, R2 source storage, the Parnas reference and agent playbook, then the retained breadboards draft. Do not push or publish.
- Shared navigation, catalogue, instruction and log changes are separated by purpose. The initial index was empty; the starting commit was `9561973`. Reviewed page wording and local source copies are preserved.
- All five approved slices are committed locally, each with a passing production build, catalogue/changelog tests and breadcrumb checks. The 91 source payloads remain ignored. No push or publication; the localhost playbook remains available for review.

## 2026-11-26 — Serve reference sources from R2

- Callum approved R2 storage, direct serving through `sources.afg.callum.website`, source payloads excluded from Git, and a simple upload command and agent instructions. This authorizes the bucket, domain and source uploads; the guide's unapproved page changes remain local.
- Keep the existing `sources/<reference-slug>/` working folders and small manifests. Use the owning Cloudflare account, pinned project-local Wrangler and verified remote downloads. No source deletion until the remote copies are verified; preserve unrelated local work and the existing index.
- Local preparation is ready: pinned Wrangler 4.168.0, `npm run sources:upload`, ignored payloads with tracked manifests, content-addressed URLs, streaming checksum verification and concise agent instructions. The dry run finds 91 files; Git ignores their payloads and preserves the manifests. Syntax, whitespace and production build checks pass.
- Callum approved the exact Wrangler scopes `account:read`, `user:read`, `zone:read`, `workers:write` and `offline_access`, stored in OS Keychain, after automatic approval review rejected broader/default OAuth access. He also approved R2's renewing $0-base subscription and usage pricing. Chrome confirmed the owning personal account `c97f8fd1890b1432a1e34cb0d032e669`, with the `callum.website` zone and `agents-field-guide` Worker. Wrangler login is complete with those five scopes; the unrelated work-account connector was not used for provisioning.
- Created `agents-field-guide-sources` in Standard storage, Oceania. Connected `sources.afg.callum.website` to it (zone `360fb9a2ee408a56443b4ecf35870530`); public development URL remains disabled. All 91 captured payload files are uploaded and their live HTTPS downloads match local SHA-256 checksums. Rerunning the uploader verified and skipped the four previously uploaded Parnas files.
- Updated reference and playbook source links to the verified R2 URLs, copied remote receipts to the private source manifests, and updated the private provenance note. Removed the two duplicate static-site copies after checksum verification. All 91 local payloads are ignored by Git; the production build contains no source payloads. The one-command upload workflow and scoped Keychain login instructions are recorded in `sources/README.md`, with pointers from agent instructions and the writing guide. Build, catalogue, breadcrumb, syntax and whitespace checks pass. No commit, push or guide deployment performed.
- Final browser verification completed after Callum restored Codex login. Restarted this repository's stale preview on port 4327; the fresh playbook renders all five steps without horizontal overflow at the open 835px viewport. Followed Playbooks → playbook → paper reference → playbook. Both preserved PDF and HTML URLs return HTTP 200 with their intended content types; HTML downloads as an attachment. Left the current playbook open in Codex. R2 provisioning, upload verification and the localhost check are complete; guide changes remain local and uncommitted.
- Private provenance-link check reports one pre-existing unresolved Topology note link, outside the newly added source section. All nine updated source manifests and their 91 verified object receipts exist; no unrelated wiki links were changed.

## 2026-11-26 — Module-design playbook and reference preservation

- Added the requested five-step agent playbook at `/methods/design-modules-around-hidden-decisions/`, mirrored in the KB Playbooks library and both overviews, with links to the paper reference. Build, catalogue, breadcrumb and paragraph checks pass; desktop/mobile rendering and the category journey were checked. Local only.
- Callum rejected the expanded archive/permission workflow and explicitly directed all captured sources into one `sources/` folder. Copied all 18 captured source files and 72 images into `sources/<reference-slug>/` and replaced the split-storage instructions with this simple rule. Source metadata records the remaining embedded-media and two image gaps. No commit, push or publication.

## 2026-11-26 — Parnas module decomposition reference

- Callum asked to add the discussed paper, choose Playbooks or References, obey the filing rules and show it on localhost. References owns articles and papers to return to. File a concise source entry with the original paper, its exact information-hiding passage and alternate reading links; no new interpretation. Keep it local for rendered review.
- Added the reference page, References registration, generated homepage and matching private KB source note and six-entry overview. The exact quotation matches the original paper; public and private reference bodies match. Existing category migration and unrelated local changes are preserved.
- Verified: production build, catalogue/changelog tests, rendered breadcrumb checks, docs lint, private wiki links and overview sync pass. Opened the canonical page and followed References → page. The homepage entry uses one line at 1280px and two at 390px; the page and homepage have no horizontal overflow. Opened and read back the private note through Obsidian. Review server: `http://127.0.0.1:4327/references/decomposing-systems-into-modules/`. Local only; no commit, push or publication.

## 2026-11-25 — Breadboards reference retained as draft

- Callum finds the distinction useful but does not consider breadboards and fat-marker sketches part of his agentic coding practice or suitable for the published Field Guide. Set the reference to `draft: true`; retain its text, local category registration and private KB note. Do not publish it without a new explicit decision.
- Removed the entry from References and both overview editions, and removed its unused legacy redirect. Production build and category checks pass; built output excludes the page, alternate formats, content and discovery links. Localhost homepage omits the entry. Draft source and private KB note remain local; no publication performed.

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

## 2026-11-25 — Tanaka and organising agents

- Callum requested the preceding interpretation preserved in the KB and an original article for agents on the Field Guide, both local for discussion. Created the reference essay “What Toyota reveals about organising agents”; kept Tanaka’s source claims, the recorded memory experiment and our proposed applications distinct.
- Registered the essay under References and updated both catalogue overviews. Preserved the existing homepage/changelog work and its uncommitted files.
- The KB Inquiry reproduces the requested reply, changing only internal link destinations and its PDF citation. The chapter PDF is stored in the note’s matching evidence folder, verified byte-for-byte. The public article links to the publisher’s PDF; no redistribution permission was established.
- Production build, catalogue and breadcrumb checks pass. Exact-copy, private-link, evidence-path and public-path checks pass. Drafts remain uncommitted and unpublished.

## 2026-11-25 — Tanaka Scrawl correction

- Read the Scrawl contact sheet and full-size frames 1, 2, 8 and 12. Callum rejected the authorship preface and abstract opening claim, found the memory-experiment section premature and overqualified, and asked for the core Toyota argument before further application.
- Removed the marked preface and abstract claim. Opened with the exact p. 48 quotation about exposing problems, with attribution and a page-targeted source link; retained a plain sentence about how organisation shapes what people can see and change.
- Callum approved the compact rewrite: explain the production system’s two principles and develop three connected ideas—need governs what starts, problems become consequential, and exposure connects to practical help. The page is now 424 words including source metadata; the memory experiment is removed. Catalogue descriptions in both overviews match the new content. The KB discussion is verified byte-for-byte unchanged. Production build and breadcrumb checks pass. Local only.

## 2026-11-25 — Incorporate Astra’s Toyota review

- Followed the second Scrawl’s full-size frames: source quotation, Toyota introduction, then the exact quintessential takeaway and its explanation. Retained the three causal sections; added the insights about capable connections and an organisation emerging from improving real work.
- Added “The quintessential takeaway:” above the takeaway and “The quintessential question:” above the closing question. Further reading follows the divider as the final paragraph. Added no caution section. The KB discussion remains byte-for-byte unchanged. Build and breadcrumb checks pass.
- Callum authorized publication on 25 Nov 2026 through the existing main-branch Cloudflare Workers Builds pipeline. The public article, category registration and catalogue entries are the publication scope; the KB discussion remains private and unchanged. Verify the build and live article after pushing.
- Published in commit `87d9a85`; the live article was checked with the approved takeaway and closing question before further reading.

## 2026-11-25 — Production leveling

- Callum requested a short follow-on reference retaining only the essential ideas. Scope: production leveling, the causes of uneven demand, changeover costs and the different purposes of buffers; distinguish manufacturing explanations from proposed agent applications. Keep this addition local.
- Source: the supplied Wikiwand screenshot and existing raw capture, checked against the Lean Enterprise Institute’s heijunka reference. Preserve the published Toyota page and its private discussion.
- Callum also requested separate chats for Ryan Singer/Bob Moesta’s demand-side thinking and Shape Up’s breadboarding, fat-marker sketches and circuit analogy. Start those after this reference’s shared catalogue edits, with explicit ownership and local-only delivery.
- Added the compact reference and matching KB Summary with the supplied screenshot in its evidence folder. Production build, category breadcrumb, two-line mobile homepage entry and wiki-link checks pass; both editions match and the earlier Toyota discussion is byte-for-byte unchanged. The production-leveling note was also checked in Obsidian. Local only.
- Started user-owned chats `01a21179-fe91-7432-9f83-dfd66689cea7` (Singer/Moesta; owns only `demand-side-thinking.md`) and `01a2117a-4534-7873-a81e-2893f2db4a4e` (Shape Up; owns only `breadboards-and-fat-marker-sketches.md`). This chat owns their pending catalogue registration, mirrored KB references and localhost checks once their source-grounded drafts are ready. Both chats were instructed to keep work local and preserve concurrent edits.
- Both chats completed their source-grounded drafts (about 420 words each). Demand-side thinking explains circumstances and sought progress, including Singer’s calendar example and movement between problem and solution. The Shape Up reference distinguishes flow from spatial arrangement and treats the circuit analogy as an explanation of abstraction. This chat is integrating their catalogues and mirrored KB editions without changing the earlier breadboard playbook.
- Integration complete: all three new references are registered under References, the generated homepage and six-entry private overview agree, and matching KB Summaries have one index entry each. The existing breadboard playbook and Toyota discussion are unchanged. Build and wiki-link checks pass. Both new pages were opened at desktop and mobile widths with no horizontal overflow; their breadcrumb links were followed to References. All three homepage entries use two lines at 390px. The references remain local and uncommitted; no publication is authorized for these additions. The two user-owned chats remain available for further discussion.
- Placement correction: Callum identified the missing forward connection from the Toyota work to production leveling. The new page already linked back, but checking its category breadcrumb had not checked this reading path. Added a contextual forward link in Toyota’s buffer discussion and placed production leveling immediately after Toyota, explicitly labelled as its follow-on in both catalogues. Keep the prior KB discussion unchanged and this correction local.
- Verified the local Toyota → production-leveling link and the return journey in the browser. Build and overview-sync checks pass; the follow-on catalogue entry uses two lines at 390px with no overflow. The KB Toyota discussion retains its original hash. No publication performed.

## 2026-11-25 — Publish production leveling

- Callum authorized publication of production leveling and its connection to the Toyota reference. The Toyota page’s final “For more information” paragraph now presents production leveling as the next step; production leveling links back to Toyota. Registered it immediately after Toyota in the catalogue and navigation.
- Publication scope: these two pages, their catalogue/navigation changes and this receipt. The separate demand-side thinking and Shape Up reference drafts remain local. Both editions of the overview agree; the original KB Toyota discussion remains unchanged. Publish through the existing main-branch Cloudflare Workers Builds pipeline and verify both live directions.
- Validation: the staged publication alone passes the production build, catalogue tests and breadcrumb checks; localhost confirms the next-step link is in Toyota’s final information paragraph and production leveling links back.
- Delivery complete: commit `19f21b3` pushed through the existing pipeline. The live Toyota footer contains the final next-step link; followed it to production leveling and followed the return link successfully. The live References catalogue places production leveling immediately after Toyota. Temporary scoped-build copy removed. Independent reference drafts remain local.

## 2026-11-25 — Publication hold

- Callum explicitly requires sign-off before any further publication. This supersedes the earlier instruction to publish the Toyota-footer correction. The wording correction is local only; do not commit for delivery, push, deploy or publish it until Callum explicitly signs off the reviewable wording.
- Requested sentence: “To find out how scheduling and buffers affect the rest of the system, read production leveling.” Only “production leveling” is linked in this sentence; no bold, “Next” label or colon. The prior published footer remains live until approval.
- Superseding wording correction: “Learn how scheduling and buffers affect the rest of the system by reading Production leveling.” Only the linked title “Production leveling” is bold, using the supplied public URL. No “Next” label or colon. This remains local under the explicit sign-off gate.

## 2026-11-25 — Category routes and copywriting repair

- Callum signed off publication of the exact explanatory sentence, committed and pushed as `6a9341c`. Verified live: the sentence matches, only the linked title is bold, and there is no “Next:” label. That permission does not publish the following structural changes.
- Root cause: the sidebar category created a correct breadcrumb independently of a root-level content route, and the existing build check verified only the breadcrumb link. Prose had not enforced category URL structure.
- Authorized local repair: physical category folders, a shared executable navigation definition, build failure when category routes and breadcrumbs disagree, and backwards-compatible redirects. Preserve presentation and content wording. Also extend the existing writing guide from the accepted Toyota/production-leveling examples and exact related-reading sentence. Keep all new routing and guidance changes local for sign-off.
- Implemented 34 content moves: category-owned entries and category index pages now live in matching folders. `src/lib/navigation.mjs` is shared by Astro, catalogue checks and changelog discovery; it also owns legacy aliases. The existing catalogue command generates hosting redirect rules and rejects mismatched source paths/URLs before building, then checks rendered breadcrumbs afterwards. Agent-facing Markdown and category discovery URLs use the nested paths.
- Regression proof: the previous breadcrumb check passed the original flat URLs; the strengthened check rejected them. A temporary root-level References registration also fails the normal prebuild command, while restoring the valid configuration passes. Changelog tests now cover an uncommitted category move using its actual prior Git path so local previews retain original addition dates.
- Writing guide: added the Toyota and production-leveling examples, their shared causal structure, closing-question/further-reading order, exact approved related-reading sentence, and the reviewed-copy publication boundary. Root agent instructions and Nimbus implementation guidance point to the executable navigation owner; there is no prose category map.
- Verification: production build, catalogue/changelog tests, typecheck (zero diagnostics), MDX lint and private-overview sync pass. Followed old URLs into the new category URLs for References, Playbooks, Prompts, Field reports and Skills. Toyota links to production leveling locally and its canonical URL matches its breadcrumb. Mobile page/homepage checks have no horizontal overflow. All 26 previously published moved page bodies retain their words and formatting, with link destinations alone changed; the original private Toyota discussion retains its hash.
- Concurrent user work preserved: the separate Shape Up chat set its reference to `draft: true` and removed it from catalogues/discovery; the Singer/Moesta chat refined its local reference. Both chats are idle. No further publication performed. Routing and writing-guide changes are ready locally and await Callum’s explicit sign-off.

## 2026-11-25 — Rename SpaceX five-step build process

- Callum requested a SpaceX-specific title and slug; interpreted the typed “spacaex” as “spacex”, stated before editing. Renamed the title to “SpaceX five-step build process” and the canonical URL to `/methods/spacex-five-step-build-process/`. Source wording is unchanged. Updated navigation, public/private catalogue titles and the generated homepage; both previous URL forms redirect directly to the renamed page. Local only under the existing sign-off gate.
- Source correction: the five-step list must transcribe the supplied sign, rather than use the article’s different wording. Replaced it with the sign’s exact numbered lines and capitalization: Make Requirements Less Dumb; Delete the Part or Process Step; Optimize; Accelerate; Automate. Updated both catalogue descriptions to distinguish the sign from the article notes. Compared the complete notes section against the captured article: wording and emphasis match, with heading levels alone adapted. Local only; no publication.

## 2026-11-25 — Publish demand-side thinking

- Callum approved publication of the rendered reference after Astra’s two wording improvements and the Scrawl definition bullets. Publish the exact page at `/references/demand-side-thinking/` with its catalogue, homepage and navigation entry.
- Isolated this delivery from the unapproved category-route migration: all existing published page routes and source wording remain at their current production versions. The independent Shape Up draft and routing/writing-guide work remain local.
- The publication copy passes the production build, catalogue/changelog tests and breadcrumb check. The private reference body now exactly matches the approved public body; its existing index entry and overview description match, and the wiki-link check passes. Publication and live verification are in progress through the existing main-branch Cloudflare Workers Builds pipeline.
- Delivery complete: commit `098fddc` pushed; Cloudflare Workers build `7df54b12-8380-49ce-9d9d-e85ef25dde21` succeeded. The live authored body exactly matches the approved body, and the live page, category breadcrumb, References catalogue and homepage link were verified. Temporary publication preview stopped and scoped copy removed. Unapproved migration and other drafts remain local.

## 2026-11-25 — Publish reviewed SpaceX page

- Callum signed off the renamed page and exact transcription of the sign. Publish “SpaceX five-step build process” at `/methods/spacex-five-step-build-process/`; preserve the article notes verbatim. Both old URL forms redirect directly to this canonical route.
- Isolate this publication from the wider category-route migration, writing-guide changes and independent draft. The shared guide overview already has the approved title and source description. Validate the staged publication, then deliver through the existing main-branch Cloudflare Workers Builds pipeline and verify the rendered title, five steps and old-URL redirects live.
- Validation: the isolated staged publication passes the production build, catalogue/changelog tests and rendered breadcrumb check. The five numbered lines match the supplied sign exactly; the separate article notes retain their source wording.
- Delivered in commit `ad499cd` through the existing pipeline. Verified live: canonical nested URL, SpaceX title, all five lines exactly matching the sign, Playbooks breadcrumb, renamed homepage entry, and both previous HTML URLs plus old Markdown/MDX URLs redirecting to the new route. Temporary publication copy removed. Wider routing/writing-guide changes and the independent draft remain local.

## 2026-11-26 — Clarify demand-side thinking for agent work

- Callum requested the preceding explanation worked into the reference, kept concise and shown on localhost before publication. Added the connection between task purpose and agent tradeoffs, a clearly adapted persistent-memory example, and the distinction between shaping ambiguous work and executing settled instructions. Shortened existing source summaries to keep the page compact; preserved definition bullets and sources.
- Mirrored the body in the existing private Summary. Title, description, catalogue order and overview remain unchanged. This revision is local and awaits rendered review before any publication.
- Verified: 443 words including metadata; both reference bodies match exactly; wiki-link, production build, catalogue and breadcrumb checks pass. Opened the canonical localhost page, inspected the rendered additions and followed References and its return link. Left the local page open for review; no commit, push or publication.
- Callum approved publication of the reviewed agent-work revision after one formatting correction: only the terms “demand side” and “supply side” are bold in the two definition bullets. Applied identically in both editions; publish this exact revision without further editorial changes.

## 2026-11-26 — Publish agent-work clarification

- Callum approved the rendered demand-side reference with the agent-work explanation, memory example and distinction between shaping and settled execution. His final correction limits definition-bullet emphasis to “demand side” and “supply side”; both editions match exactly. Publish this exact revision at `/references/demand-side-thinking/`.
- Delivery is limited to the reference and this receipt. The separate category-route migration, writing-guide changes and independent draft remain local. Verify the isolated production build, then publish through the existing main-branch Cloudflare Workers Builds pipeline and check the live source and formatting.
- The isolated publication passes the production build, catalogue/changelog tests and breadcrumb check. The page body matches the reviewed local reference exactly.
- Delivered in commit `9561973`. Cloudflare Workers build `fcb00899-7491-4d9e-93ac-15c1f1844b99` succeeded. The live authored body exactly matches the approved reference; browser verification confirms only the definition terms are bold and the agent-work explanation is present. Both editions match; unrelated work remains local. Removed the temporary publication copy.
