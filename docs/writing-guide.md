# Writing the Field Guide

Write for a reader scanning for something they can use. Start with the one sentence they need. Add a short list when it makes the substance easier to find. Use a separate section for depth when there is evidence or detail to put there.

- Include a technique, tool, or prompt as Field Guide guidance only after Callum has tried it himself, unless he explicitly approves an exception. Keep untried candidates in the private KB.
- Give every major group an index. Use one top-level bullet per entry on the category page, then run `npm run catalogue:sync`. The homepage shows the first six entries in each category. If there are more, **Show more** reveals up to six additional entries and becomes a **View all** link to the category page. The build checks that the catalogue is current.
- Give each index bullet a linked title and a short, concrete reason to open it. Keep the whole bullet within three lines on the rendered homepage and check the wrapping in the browser. Add a full stop after the title if it has no closing punctuation.
- Keep homepage search suggestions above the generated catalogue marker. Give playbooks and field reports their own category entries and link between them when a report informs the method. See the [Field Guide design](field-guide-design.md) for what to record.
- Give each reusable prompt one page. Include the exact prompt, one sentence on when to use it, and its source. Label adaptations. Link to the prompt wherever an experiment uses it.
- Keep author credit on the entry page, with a link to the original source. Keep author names out of index titles and descriptions in every category. Keep dates out of catalogue entries and standalone date lines. The page header supplies the update date and the original source carries its publication date.
- Put status in italics immediately after the title, before the description in the catalogue or on its own line on an entry page. Use *In progress* for ongoing trials.
- List experiments under Field reports. Give each experiment one page. Start with what you tried. Name each author in the text and keep their contributions distinct. Use brief, exact excerpts with links to the original sources when the wording carries the method. Add results once there are results to report.
- Link examples from the playbooks they illustrate. Give an example its own page when readers need to inspect it in more detail.
- When bringing a note across from Obsidian, strip its hand-written navigation line from the published Markdown. Nimbus supplies the site's breadcrumbs. Use public source links and keep vault links, raw notes, Codex threads, and local paths outside the site's content folder.
- Write ordinary Markdown links. The site opens off-site links in a new tab, including skill links on any page.
- Write author and source names in the page body so Nimbus can find them in full-text search.

Use the [external skills inventory procedure](external-skills-inventory.md) to refresh the public collection links.
