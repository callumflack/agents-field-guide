export const visibleEntries = 6;

export function categoryEntryHref(categoryHref, href) {
  const pathname = new URL(href, 'https://field-guide.example').pathname;
  const entryHref = pathname.replace(/\/?$/, '/');
  if (entryHref !== categoryHref && !entryHref.startsWith(categoryHref)) {
    throw new Error(`${entryHref}: category URLs must be nested under ${categoryHref}.`);
  }
  return entryHref;
}

export function catalogueEntries(body) {
  return body.replace(/<!--[\s\S]*?-->/g, '').split('\n')
    .filter((line) => line.startsWith('- '));
}

export function entryExcerpt(entry) {
  const match = entry.match(/^(- (?:\[[^\]]+\]\([^)]+\)|\*\*.+?\*\*)\.?)(?: (.*))?$/);
  if (!match?.[2]) return entry;
  const firstSentence = match[2].match(/^.*?[.!?](?=\s|$)/)?.[0] ?? match[2];
  return `${match[1]} ${firstSentence}`;
}

export function cataloguePreview(body) {
  const entries = catalogueEntries(body);
  return { entries: entries.slice(0, visibleEntries), hasMore: entries.length > visibleEntries };
}
