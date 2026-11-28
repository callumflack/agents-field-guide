import { readdirSync, readFileSync } from 'node:fs';
import { markdownToMdast, mdxToMdast } from 'satteri';
import { guidePageHref } from '../src/lib/catalogue.mjs';
import { readDocument } from '../src/lib/changelog-details.mjs';
import { categoryGroups, guideSite, legacyRedirects } from '../src/lib/navigation.mjs';

const docsDirectory = 'src/content/docs';
const navigation = new Set(['/', '/changelog/', ...categoryGroups.map(({ landing }) => landing)]);
const usage = 'npm run refs:check -- /references/rational-design-process/ [/another-page/]';
const phrase = (text) => ` ${text.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()} `;

function canonicalPath(pathname) {
  const clean = pathname.replace(/\/index\.(?:html|mdx?)$/, '/').replace(/\/?$/, '/');
  return legacyRedirects[clean.slice(0, -1)] ?? clean;
}

function inspectDocument(file) {
  const { body, metadata } = readDocument(readFileSync(file, 'utf8'));
  const path = guidePageHref(file);
  const parse = file.endsWith('.mdx') ? mdxToMdast : markdownToMdast;
  const tree = parse(body, { position: false, features: { gfm: true, headingAttributes: true } });
  const words = [];
  const urls = [];
  const references = [];
  const definitions = new Map();
  function visit(node) {
    if (node.type === 'text') words.push(node.value);
    if (node.type === 'link') urls.push(node.url);
    if (node.type === 'linkReference') references.push(node.identifier);
    if (node.type === 'definition' && !definitions.has(node.identifier)) definitions.set(node.identifier, node.url);
    for (const child of node.children ?? []) visit(child);
  }
  visit(tree);
  for (const identifier of references) {
    if (definitions.has(identifier)) urls.push(definitions.get(identifier));
  }
  const links = new Set();
  const sources = new Set();
  for (const href of urls) {
    const url = URL.parse(href, new URL(path, guideSite));
    if (!url || !['http:', 'https:'].includes(url.protocol)) continue;
    if (url.origin === guideSite) links.add(canonicalPath(url.pathname));
    else {
      url.hash = '';
      sources.add(url.href);
    }
  }
  return {
    path, title: metadata.title ?? path, description: metadata.description, draft: metadata.draft === true,
    words: phrase(words.join(' ')), links, sources,
  };
}

function describeRelation(page, other) {
  const relations = [];
  const linksOut = page.links.has(other.path);
  const linksIn = other.links.has(page.path);
  if (linksOut && linksIn) relations.push('links in both directions');
  else if (linksOut) relations.push('linked from this page');
  else if (linksIn) relations.push('links to this page');
  if (!linksOut && page.words.includes(phrase(other.title))) relations.push('title mentioned on this page');
  if (!linksIn && other.words.includes(phrase(page.title))) relations.push('mentions this page’s title');
  const shared = [...page.sources].filter((source) => other.sources.has(source));
  if (shared.length && !linksOut && !linksIn) relations.push(`shared citation ${shared.join(', ')}`);
  return relations;
}

function report(page, documents, requested) {
  console.log(`${page.title} (${page.path})${page.draft ? ' [draft]' : ''}`);
  if (page.description) console.log(`  ${page.description}`);
  const related = [];
  for (const other of documents.values()) {
    if (other.path === page.path || navigation.has(other.path)) continue;
    if (other.draft && !page.draft && !requested.has(other.path)) continue;
    const relations = describeRelation(page, other);
    if (!relations.length && requested.has(other.path)) relations.push('no direct reference found');
    if (relations.length) related.push(`  ${other.title} (${other.path})${other.draft ? ' [draft]' : ''} · ${relations.join(' · ')}`);
  }
  console.log(related.length ? related.join('\n') : '  No direct links, title mentions, or shared citations found.');
  for (const path of page.links) {
    const isGuidePath = categoryGroups.some(({ landing }) => path.startsWith(landing));
    if (isGuidePath && (!documents.has(path) || (!page.draft && documents.get(path)?.draft))) {
      console.log(`  Check target ${path} · no published guide page`);
    }
  }
}

function main(paths) {
  if (!paths.length || paths.includes('--help')) {
    console.log(usage);
    return;
  }
  const files = readdirSync(docsDirectory, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => `${entry.parentPath}/${entry.name}`).sort();
  const documents = new Map(files.map((file) => {
    const page = inspectDocument(file);
    return [page.path, page];
  }));
  const requested = new Set(paths.map(canonicalPath));
  for (const path of requested) {
    const page = documents.get(path);
    if (!page || navigation.has(path)) throw new Error(`Choose a guide entry, got ${path}`);
    report(page, documents, requested);
  }
  console.log('Review each connection for a useful link, a short addition to an existing page, or no change.');
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
