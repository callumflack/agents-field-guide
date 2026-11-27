# Writing the Field Guide

The Field Guide stores source material verbatim. When Callum asks to add an article, process, prompt, quote or notes, reproduce the requested material in its original wording. An instruction to add something is not permission to rewrite, summarise, interpret or expand it. This applies in every category and in both editions.

When Callum explicitly asks to edit, rewrite, interpret or add content, do that work within his requested scope. The verbatim rule is the default for filing sources, not a reason to refuse an explicitly requested change.

Do not add explanations, examples, conclusions, recommendations, agent applications or other content unless Callum explicitly requests it. Existing authored pages, category names, templates and historical plans do not authorize new writing. Preserve the distinction between the original source and Callum's own notes; reproduce each verbatim with its own attribution.

Filing a source permits only presentation formatting, category registration, navigation links and factual source metadata: title, author, medium, URL, dates, video duration and timestamps. Formatting may change heading levels or link destinations needed for the site, but must preserve wording, emphasis, order and meaning. Do not silently correct, condense or combine source passages. If the requested source or extent cannot be established, ask; do not reconstruct missing text.

Frontmatter descriptions and catalogue descriptions are navigation metadata, not an exception allowing interpretation. Use a verbatim source excerpt or a literal description of the material present, such as “Five steps and the author's notes.” Do not infer benefits, use cases, applications or recommendations. Compare the reproduced text with the source before finishing, and check that metadata introduces no such claims.

Link the original source first, then Callum's notes or article when applicable. Identify the actual medium and title; for video, include the relevant timestamp and duration when available.

Only an explicit request for original writing, interpretation or adaptation permits that work, within the requested scope. Keep it separate from verbatim source material and label its authorship or adaptation. Permission for one entry does not extend to another. Catalogue maintenance or a request to add a source is not a request for original writing.

- Include a technique, tool, or prompt as Field Guide guidance only after Callum has tried it himself, unless he explicitly approves an exception. Keep untried candidates in the private KB.
- Give every major group an index. Use one top-level bullet per entry on the category page, then run `npm run catalogue:sync`. The homepage shows the first six entries in each category. If there are more, a direct **View all** link opens the category page. There is no inline expansion. The generator reads actual top-level entries in source order, never a separate homepage list. Skills descriptions use their first sentence. The build checks that the catalogue is current; `npm run test:catalogue` checks source extraction and excerpts.
- Choose the category by what the reader can do with the entry. A method belongs in Playbooks, including a method taught through an anecdote. References holds articles and papers to return to.
- Use the category groups in `src/lib/navigation.mjs`, the shared executable navigation owner. The build checks content paths, catalogue URLs and rendered breadcrumbs together. Open the canonical entry and follow its category breadcrumb.
- Give each index bullet a linked title and a short description governed by the navigation metadata rule above. Keep the whole bullet within three lines on the rendered homepage and check the wrapping in the browser. If it is too long, shorten the metadata without rewriting the source. Add a full stop after the title if it has no closing punctuation.
- Keep homepage search suggestions above the generated catalogue marker. Give playbooks and field reports their own category entries. Link an existing report to a playbook only when their relationship is explicit in the supplied material or requested by Callum.
- Give each reusable prompt one page. Include the exact prompt and its source. Include a when-to-use sentence only if supplied by the source or explicitly requested by Callum; do not invent one. Adapt only when Callum explicitly asks, and label the adaptation. Link to the prompt wherever an existing experiment uses it.
- Keep author credit on the entry page, with a link to the original source. Keep author names out of index titles and descriptions in every category. Keep dates out of catalogue entries and standalone date lines. The page header supplies the update date and the original source carries its publication date.
- Preview status belongs only in Field reports; never add it elsewhere, including for a localhost review. Put a field report's status in italics immediately after the title, before the description in the catalogue or on its own line on the entry page. Use *In progress* for ongoing trials.
- List experiments under Field reports. Put ideas and work in progress first, followed by completed, stopped, and rejected reports. Give each requested experiment one page. Reproduce supplied reports and source excerpts verbatim. Writing a new report or adding results requires Callum's explicit request and supplied or observed evidence; do not infer experiences or outcomes. Keep authors and their contributions distinct.
- Link existing source examples from their playbooks when that relationship is explicit in the source. Do not create or expand an example without Callum's explicit request.
- When bringing a note across from Obsidian, strip its hand-written navigation line from the published Markdown. Nimbus supplies the site's breadcrumbs. Use public source links and keep vault links, raw notes, Codex threads, and local paths outside the site's content folder.
- Write ordinary Markdown links. The site opens off-site links in a new tab, including skill links on any page.
- Write author and source names in the page body so Nimbus can find them in full-text search.

Use the [external skills inventory procedure](external-skills-inventory.md) to refresh the public collection links.

## Changelog

New catalogue pages keep their Git addition dates. The changelog compares each public update commit with its first parent. The commit subject is the heading, with one short bullet per changed page. The bullets name distinct catalogue and page updates and group repeated actions such as adding several install links. This works the same way for a squash commit. Write a subject that tells readers what shipped. A new page and its catalogue link appear once as an addition. The homepage’s Recently added list shows new pages.

Publishing a draft and withdrawing a public page both create updates. Draft-only work, infrastructure, and the generated homepage stay out of the changelog.

After committing a public content update locally, open the resulting changelog before pushing. Review the entry with the changed pages. After deployment, check the same entry on the live site.

## Preserve reference sources

Save originals and associated files under `sources/<reference-slug>/`, recording the original URL and capture details in `source.json`. Run `npm run sources:upload -- <reference-slug>` to upload to R2 and verify the downloads. Use the resulting `remote_url` links on the guide page, after the publisher’s original link. Keep source wording intact and adaptations separate.

Source payloads are ignored by Git. Commit only the guide page and small manifests. [Source storage](../sources/README.md) owns the command, configuration and maintenance instructions. Follow the existing rendered-review rule for guide publication.

## Copy and structure for requested original writing

Use [What Toyota reveals about organising agents](../src/content/docs/references/what-toyota-reveals-about-organising-agents.md) and [Production leveling](../src/content/docs/references/production-leveling.md) as examples when Callum requests an original reference or adaptation. These examples do not permit rewriting a source that he asks to file verbatim.

Explain the cause and its consequence in ordinary sentences. “Large buffers allow one process to conceal another’s difficulties. Reducing them makes the difficulties affect the line.” Preserve the mechanism that makes the idea useful; framework names alone do not explain it.

The shared shape is: introduce the idea and necessary terms; state the central takeaway; develop a few causal explanations; distinguish source claims from agent applications; close with a question that brings the argument together. A useful opening quotation can precede the introduction. Use this shape where it fits rather than forcing every source into a template.

Keep the closing question above the divider. Put sources and related reading at the end. Connect a follow-on document to the idea it develops, using a complete explanatory sentence with the document title as the link. Callum approved this example:

> Learn how scheduling and buffers affect the rest of the system by reading [**Production leveling**](https://afg.callum.website/references/production-leveling/).

Keep the surrounding sentence ordinary text. The linked title alone may carry emphasis when requested. Do not replace the sentence with an invented navigation label such as “Next:” or add emphasis while publishing approved copy.

Treat a supplied replacement as the copy to implement. Preserve its wording, punctuation, emphasis and link boundary. Check it in the rendered page, show that result for sign-off, and publish the approved version without another editorial pass.
