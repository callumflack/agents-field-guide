import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { cataloguePreview, entryExcerpt, categoryEntryHref } from '../src/lib/catalogue.mjs';
import { categoryGroups, guideSite, legacyRedirects } from '../src/lib/navigation.mjs';

const docs = new URL('../src/content/docs/', import.meta.url);
const sections = categoryGroups.map((group) => group.segment.slice(1));
const read = (slug) => readFileSync(new URL(`${slug}/index.md`, docs), 'utf8');

for (const group of categoryGroups) {
  for (const item of group.items) {
    if (typeof item === 'string') {
      categoryEntryHref(group.landing, `/${item}/`);
      if (!['md', 'mdx'].some((ext) => existsSync(new URL(`${item}.${ext}`, docs)))) {
        throw new Error(`Missing category content: ${item}`);
      }
    } else if (item.autogenerate) {
      categoryEntryHref(group.landing, `/${item.autogenerate.directory}/`);
    }
  }
}

function localEntries(body, categoryHref) {
  return [...body.matchAll(/^- \[[^\]\n]+\]\(([^\s)]+)\)/gm)].flatMap(([, href]) => {
    const url = new URL(href, new URL(categoryHref, guideSite));
    if (url.origin !== new URL(guideSite).origin) return [];
    return [{ href, entryHref: categoryEntryHref(categoryHref, url.href), fragment: url.hash.slice(1) }];
  });
}

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
  localEntries(body, `/${slug}/`);
  const { entries, hasMore } = cataloguePreview(body);
  const preview = (slug === 'skills' ? entries.map(entryExcerpt) : entries).join('\n');
  return `## [${title}](/${slug}/)\n\n${preview}${hasMore ? `\n\n<p class="catalogue-toggle"><a href="/${slug}/" class="prose-link text-muted-foreground">View all <span aria-hidden="true">&rarr;</span></a></p>` : ''}`;
});
const next = `---\n${frontmatter}\n---\n\n${intro}\n\n${catalogueMarker}\n\n${catalogue.join('\n\n')}\n`;

function checkBreadcrumbs() {
  for (const slug of sections) {
    const { body } = splitPage(read(slug));
    const categoryHref = `/${slug}/`;
    for (const { href, entryHref, fragment } of localEntries(body, categoryHref)) {
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

const redirectFile = new URL('../public/_redirects', import.meta.url);
const redirectRules = Object.entries(legacyRedirects).flatMap(([from, to]) => [
  `${from} ${to} 301`,
  `${from}/ ${to} 301`,
  `${from}/index.md ${to}index.md 301`,
  `${from}/index.mdx ${to}index.mdx 301`,
]).join('\n') + '\n';

for (const [file, expected, label] of [[homepage, next, 'homepage catalogue'], [redirectFile, redirectRules, 'legacy redirects']]) {
  const actual = existsSync(file) ? readFileSync(file, 'utf8') : '';
  if (actual !== expected) {
    if (process.argv.includes('--check') || process.argv.includes('--check-breadcrumbs')) {
      console.error(`The ${label} is stale. Run npm run catalogue:sync.`);
      process.exitCode = 1;
    } else {
      writeFileSync(file, expected);
    }
  }
}

if (process.argv.includes('--check-breadcrumbs')) checkBreadcrumbs();
