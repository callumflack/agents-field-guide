import { readFileSync, writeFileSync } from 'node:fs';

const docs = new URL('../src/content/docs/', import.meta.url);
const sections = ['prompts', 'skills', 'methods', 'tools', 'experiments', 'examples', 'references'];
const read = (slug) => readFileSync(new URL(`${slug}.md`, docs), 'utf8');

function splitPage(page) {
  const match = page.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Expected Markdown with frontmatter');
  return { frontmatter: match[1], body: match[2].trim() };
}

const current = read('index');
const { frontmatter } = splitPage(current);
const catalogue = sections.map((slug) => {
  const { frontmatter: meta, body } = splitPage(read(slug));
  const title = meta.match(/^title: (.+)$/m)?.[1].replace(/^"|"$/g, '');
  if (!title) throw new Error(`Missing title for ${slug}`);
  // Each category keeps its own subheadings; the home catalogue keeps one
  // heading per category and includes every item from that category.
  const entries = body.replace(/^## .+\n+/gm, '').trim();
  return `## [${title}](/${slug}/)\n\n${entries}`;
});
const next = `---\n${frontmatter}\n---\n\n${catalogue.join('\n\n')}\n`;

if (current !== next) {
  if (process.argv.includes('--check')) {
    console.error('The homepage catalogue is stale. Run npm run catalogue:sync.');
    process.exitCode = 1;
  } else {
    writeFileSync(new URL('index.md', docs), next);
  }
}
