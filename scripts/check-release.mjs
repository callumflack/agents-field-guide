import { execFileSync } from 'node:child_process';
import { parseArgs } from 'node:util';
import { parse, serialize } from 'parse5';
import { cataloguePageHrefs, guidePageHref } from '../src/lib/catalogue.mjs';
import { readDocument } from '../src/lib/changelog-details.mjs';
import { pageUpdates } from '../src/lib/changelog.mjs';
import { categoryGroups, guideSite } from '../src/lib/navigation.mjs';

const docsDirectory = 'src/content/docs/';
const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
const attribute = (node, name) => node.attrs?.find((entry) => entry.name === name)?.value;
const hasClass = (node, name) => attribute(node, 'class')?.split(/\s+/).includes(name);
const text = (node) => node.nodeName === '#text' ? node.value : (node.childNodes ?? []).map(text).join('');
const compact = (value) => value.replace(/\s+/g, ' ').trim();

function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of node.childNodes ?? []) {
    const match = find(child, predicate);
    if (match) return match;
  }
  return undefined;
}

function required(node, predicate, description) {
  const match = find(node, predicate);
  if (!match) throw new Error(`Missing ${description}`);
  return match;
}

function normalizeMarkup(node, origins) {
  if (!node.childNodes) return;
  node.childNodes = node.childNodes.filter((child) => child.nodeName !== '#comment');
  for (const child of node.childNodes) {
    child.attrs = child.attrs?.filter(({ name }) => !name.startsWith('data-astro-'));
    for (const attr of child.attrs ?? []) {
      if (['href', 'src'].includes(attr.name) && /^https?:\/\//i.test(attr.value)) {
        const url = new URL(attr.value);
        if (origins.has(url.origin)) attr.value = url.pathname + url.search + url.hash;
      }
    }
    normalizeMarkup(child, origins);
  }
}

function comparableMarkup(node, origins) {
  normalizeMarkup(node, origins);
  return serialize(node);
}

function releaseScope(revision, extraPages) {
  const commit = git('rev-parse', '--verify', '--end-of-options', `${revision}^{commit}`).trim();
  const parent = `${commit}^1`;
  const diff = (filter) => git('diff', '--find-renames', '--name-only', '-z', `--diff-filter=${filter}`, parent, commit, '--', docsDirectory)
    .split('\0').filter((file) => guidePageHref(file));
  const readAtRelease = (file) => readDocument(git('show', `${commit}:${file}`));
  const published = diff('AMR').map((file) => ({
    file,
    path: guidePageHref(file),
    metadata: readAtRelease(file).metadata,
  })).filter(({ metadata }) => metadata.draft !== true);
  const pages = [...new Set([...published.map(({ path }) => path), ...extraPages])].filter((path) => path !== '/changelog/');
  const addedFiles = new Set(diff('A'));
  const newPages = published.filter(({ file }) => addedFiles.has(file));
  const additions = categoryGroups.flatMap(({ segment, landing }) => {
    const candidates = newPages.filter(({ path }) => path !== landing && path.startsWith(landing));
    if (!candidates.length) return [];
    const { body, metadata } = readAtRelease(`${docsDirectory}${segment.slice(1)}/index.md`);
    const hrefs = new Set(cataloguePageHrefs(body));
    return candidates.filter(({ path }) => hrefs.has(path)).map(({ path, metadata: page }) => ({
      path, title: page.title, category: metadata.title,
    }));
  });
  const [update] = pageUpdates(process.cwd(), parent, commit);
  if (!pages.length && !update) throw new Error(`No public guide changes in ${revision}. Pass --commit or add page paths.`);
  return { commit, pages, additions, update };
}

function verifyChangelog(timeline, { additions, update }) {
  const days = (timeline.childNodes ?? []).filter((node) => hasClass(node, 'change-day'));
  const entries = days.flatMap((day) => {
    const date = find(day, (node) => node.tagName === 'time');
    const list = find(day, (node) => hasClass(node, 'change-pages'));
    return (list?.childNodes ?? []).filter((node) => hasClass(node, 'change-page'))
      .map((row) => ({ row, date: date && attribute(date, 'datetime') }));
  });
  for (const { path, title, category } of additions) {
    const matches = entries.flatMap(({ row }) => {
      const label = find(row, (node) => hasClass(node, 'change-category'));
      const link = row.childNodes.find((node) => node.tagName === 'a' && attribute(node, 'href') === path);
      return label && link ? [{ label, link }] : [];
    });
    if (matches.length !== 1) throw new Error(`Expected one addition for ${path}, found ${matches.length}`);
    const [{ label, link }] = matches;
    if (compact(text(link)) !== title || compact(text(label)) !== category) {
      throw new Error(`Expected “${title}” in “${category}” for the addition at ${path}`);
    }
  }
  if (update) {
    const rows = entries.filter(({ row, date }) => {
      const title = find(row, (node) => hasClass(node, 'change-title'));
      return date === update.date && title && compact(text(title)) === update.summary;
    });
    if (rows.length !== 1) throw new Error(`Expected one release entry for “${update.summary}”, found ${rows.length}`);
    const list = required(rows[0].row, (node) => hasClass(node, 'change-notes'), 'release notes');
    const actual = list.childNodes.filter((node) => node.tagName === 'li').map((node) => compact(text(node)));
    const expected = update.pages.map(({ title, note }) => compact(`${title}. ${note}`));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(`Release notes differ. Expected ${expected.join(' | ')}. Found ${actual.join(' | ') || 'no notes'}`);
    }
  }
}

function pageView(html, origins) {
  const main = required(html, (node) => attribute(node, 'id') === 'main-content', 'guide main content');
  const article = required(main, (node) => node.tagName === 'article', 'guide article');
  const heading = required(main, (node) => node.tagName === 'h1', 'page title');
  const header = find(main, (node) => attribute(node, 'data-slot') === 'page-header');
  const description = header && find(header, (node) => node.tagName === 'p');
  return {
    title: compact(text(heading)),
    description: description ? compact(text(description)) : '',
    article: comparableMarkup(article, origins),
  };
}

async function readPage(origin, path) {
  const url = new URL(path, origin);
  try {
    const response = await fetch(url, { redirect: 'error', cache: 'no-store', signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return parse(await response.text());
  } catch (error) {
    throw new Error(`${url}: ${error.cause?.message ?? error.message}`);
  }
}

function compare(preview, live, description) {
  if (preview === live) return;
  let position = 0;
  while (position < Math.min(preview.length, live.length) && preview[position] === live[position]) position += 1;
  const excerpt = (value) => JSON.stringify(value.slice(Math.max(0, position - 20), position + 70));
  throw new Error(`${description} differs\n  Preview: ${excerpt(preview)}\n  Live:    ${excerpt(live)}`);
}

function httpOrigin(value) {
  const url = new URL(value);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Pass an HTTP origin without credentials, a path, query, or fragment');
  }
  return url.origin;
}

const usage = 'npm run release:check -- --preview http://127.0.0.1:4339 [--commit <ref>] [/extra-page/]';

async function main() {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      preview: { type: 'string' },
      live: { type: 'string', default: guideSite },
      commit: { type: 'string', default: 'HEAD' },
      help: { type: 'boolean' },
    },
  });
  if (values.help) {
    console.log(usage);
    return;
  }
  if (!values.preview) throw new Error(`Pass the approved preview origin.\n${usage}`);
  const preview = httpOrigin(values.preview);
  const live = httpOrigin(values.live);
  if (preview === live) throw new Error('The preview and live origins must be different');
  if (positionals.some((path) => !/^\/(?!\/)(?:[a-z0-9-]+\/)*$/i.test(path))) {
    throw new Error('Extra pages must be canonical paths such as /references/rational-design-process/');
  }
  const previewOrigins = new Set([preview, live]);
  const liveOrigins = new Set([live]);
  const scope = releaseScope(values.commit, positionals);
  console.log(`Checking ${scope.commit.slice(0, 7)} against ${live} using ${preview}`);
  const paths = [...scope.pages, '/changelog/'];
  const results = await Promise.allSettled(paths.map(async (path) => {
    const [localPage, livePage] = await Promise.all([readPage(preview, path), readPage(live, path)]);
    if (path === '/changelog/') {
      const localTimeline = required(localPage, (node) => attribute(node, 'data-slot') === 'changelog', 'preview changelog');
      const liveTimeline = required(livePage, (node) => attribute(node, 'data-slot') === 'changelog', 'live changelog');
      for (const [label, timeline] of [['Preview', localTimeline], ['Live', liveTimeline]]) {
        try {
          verifyChangelog(timeline, scope);
        } catch (error) {
          throw new Error(`${label}: ${error.message}`);
        }
      }
      compare(comparableMarkup(localTimeline, previewOrigins), comparableMarkup(liveTimeline, liveOrigins), 'Rendered changelog');
    } else {
      const localView = pageView(localPage, previewOrigins);
      const liveView = pageView(livePage, liveOrigins);
      for (const key of Object.keys(localView)) compare(localView[key], liveView[key], key);
    }
  }));
  for (const [i, result] of results.entries()) {
    if (result.status === 'fulfilled') console.log(`✓ ${paths[i]}`);
    else {
      console.error(`✗ ${paths[i]}: ${result.reason.message}`);
      process.exitCode = 1;
    }
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
