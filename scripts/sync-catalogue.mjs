import { readFileSync, writeFileSync } from 'node:fs';

const docs = new URL('../src/content/docs/', import.meta.url);
const sections = ['skills', 'prompts', 'methods', 'tools', 'experiments', 'examples', 'references'];
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
  let entries = body.replace(/^## .+\n+/gm, '').trim();
  const seventhEntry = [...entries.matchAll(/^- /gm)][6];
  if (seventhEntry) {
    const firstSix = entries.slice(0, seventhEntry.index).trimEnd();
    const remaining = entries.slice(seventhEntry.index);
    entries = `${firstSix}\n\n<details>\n<summary>Show more</summary>\n\n${remaining}\n\n</details>`;
  }
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
