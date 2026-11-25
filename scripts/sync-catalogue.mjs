import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { cataloguePreview, entryExcerpt } from '../src/lib/catalogue.mjs';

const docs = new URL('../src/content/docs/', import.meta.url);
const sections = ['skills', 'prompts', 'methods', 'field-reports', 'references', 'tools'];
const read = (slug) => readFileSync(new URL(`${slug}.md`, docs), 'utf8');

function splitPage(page) {
  const match = page.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Expected Markdown with frontmatter');
  return { frontmatter: match[1], body: match[2].trim() };
}

const homepage = new URL('index.mdx', docs);
const current = readFileSync(homepage, 'utf8');
const { frontmatter, body } = splitPage(current);
const catalogueMarker = '{/* Generated catalogue */}';
const markerIndex = body.indexOf(catalogueMarker);
if (markerIndex < 0) throw new Error('Missing generated catalogue marker on the homepage');
const intro = body.slice(0, markerIndex).trimEnd();
const catalogue = sections.map((slug) => {
  const { frontmatter: meta, body } = splitPage(read(slug));
  const title = meta.match(/^title: (.+)$/m)?.[1].replace(/^"|"$/g, '');
  if (!title) throw new Error(`Missing title for ${slug}`);
  const { entries, hasMore } = cataloguePreview(body);
  const preview = (slug === 'skills' ? entries.map(entryExcerpt) : entries).join('\n');
  return `## [${title}](/${slug}/)\n\n${preview}${hasMore ? `\n\n<p class="catalogue-toggle"><a href="/${slug}/" class="prose-link text-muted-foreground">View all <span aria-hidden="true">&rarr;</span></a></p>` : ''}`;
});
const next = `---\n${frontmatter}\n---\n\n${intro}\n\n${catalogueMarker}\n\n${catalogue.join('\n\n')}\n`;

function checkBreadcrumbs() {
  for (const slug of sections) {
    const { body } = splitPage(read(slug));
    const categoryHref = `/${slug}/`;
    for (const [, href] of body.matchAll(/^- \[[^\]\n]+\]\((\/(?!\/)[^\s)]+)\)/gm)) {
      const [pathname, fragment] = href.split('#');
      const entryHref = pathname.replace(/\/?$/, '/');
      const file = new URL(`../dist${entryHref}index.html`, import.meta.url);
      const html = existsSync(file) ? readFileSync(file, 'utf8') : '';
      if (entryHref === categoryHref && fragment) {
        if (!html.includes(` id="${fragment}"`)) {
          console.error(`${href}: missing category heading.`);
          process.exitCode = 1;
        }
        continue;
      }
      const breadcrumb = html.match(/<nav\b[^>]* aria-label="Breadcrumb"[^>]*>[\s\S]*?<\/nav>/)?.[0];
      if (!breadcrumb?.includes(` href="${categoryHref}"`)) {
        console.error(`${entryHref}: missing breadcrumb to ${categoryHref}. Check the matching sidebar group in astro.config.ts.`);
        process.exitCode = 1;
      }
    }
  }
}

if (process.argv.includes('--check-breadcrumbs')) {
  checkBreadcrumbs();
} else if (current !== next) {
  if (process.argv.includes('--check')) {
    console.error('The homepage catalogue is stale. Run npm run catalogue:sync.');
    process.exitCode = 1;
  } else {
    writeFileSync(homepage, next);
  }
}
