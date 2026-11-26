import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cataloguePreview, entryExcerpt, categoryEntryHref } from '../src/lib/catalogue.mjs';

test('category URLs follow their category even when a root page has the right breadcrumb', () => {
  assert.throws(() => categoryEntryHref('/references/', '/production-leveling/'), /nested under \/references\//);
  assert.throws(() => categoryEntryHref('/references/', '/references-other/page/'), /nested under \/references\//);
  assert.equal(categoryEntryHref('/references/', '/references/production-leveling/'), '/references/production-leveling/');
  assert.equal(categoryEntryHref('/references/', '/references/production-leveling#buffers'), '/references/production-leveling/');
  assert.equal(categoryEntryHref('/skills/', '/skills/#collections'), '/skills/');
});

test('homepage uses the first six real entries, ignoring groups and comment lists', () => {
  const body = `<!-- Catalogue summary\n- [Handwritten substitute](/wrong/)\n-->\n
## First group
A group introduction.
- [One](/one/). First entry.
- [Two](/two/). Second entry.
## Second group
${Array.from({length: 13}, (_, i) => `- [Item ${i + 3}](/item-${i + 3}/). Entry ${i + 3}.`).join('\n')}`;
  const { entries, hasMore } = cataloguePreview(body);
  assert.equal(entries.length, 6);
  assert.equal(hasMore, true);
  assert.equal(entries[0], '- [One](/one/). First entry.');
  assert.equal(entries[1], '- [Two](/two/). Second entry.');
  assert.equal(entries.at(-1), '- [Item 6](/item-6/). Entry 6.');
  assert.ok(entries.every((entry) => !entry.includes('Handwritten substitute')));
});

test('homepage excerpt retains the source link and first description sentence', () => {
  assert.equal(
    entryExcerpt('- [Collection](https://example.org/skills). Plan a change. `architect` covers the next step.'),
    '- [Collection](https://example.org/skills). Plan a change.',
  );
  assert.equal(entryExcerpt('- [A question?](/question/) Ask it before starting.'), '- [A question?](/question/) Ask it before starting.');
});

test('View all appears only when the category has more than six entries', () => {
  const six = Array.from({length: 6}, (_, i) => `- [Item ${i}](/item-${i}/). Description.`).join('\n');
  assert.equal(cataloguePreview(six).hasMore, false);
  assert.equal(cataloguePreview(six + '\n- [Seventh](/seven/). More.').hasMore, true);
});
