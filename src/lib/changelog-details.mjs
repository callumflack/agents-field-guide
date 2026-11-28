import { markdownToMdast, mdxToMdast } from 'satteri';
import { parse } from 'yaml';

const list = new Intl.ListFormat('en-AU');

export function readDocument(source) {
  if (source === undefined) return undefined;
  const header = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return { metadata: header ? parse(header[1]) ?? {} : {}, body: source.slice(header?.[0].length ?? 0) };
}

function plainText(node) {
  if (node.type === 'html') return '';
  return node.value ?? node.alt ?? node.children?.map(plainText).join('') ?? '';
}

function sections(body, file) {
  const parseBody = file.endsWith('.mdx') ? mdxToMdast : markdownToMdast;
  const tree = parseBody(body, { position: false, features: { gfm: true, headingAttributes: true } });
  const stack = [];
  const result = new Map();
  let section = { name: 'opening content', blocks: [] };
  result.set('', section);
  for (const node of tree.children ?? []) {
    if (node.type === 'heading') {
      while (stack.at(-1)?.depth >= node.depth) stack.pop();
      const name = plainText(node).trim();
      stack.push({ depth: node.depth, name });
      const path = JSON.stringify(stack);
      let key = path;
      for (let occurrence = 2; result.has(key); occurrence++) key = `${path}:${occurrence}`;
      section = { name, heading: node, blocks: [] };
      result.set(key, section);
    } else if (node.type !== 'html' || !/^\s*(?:<!--(?:(?!-->)[\s\S])*-->\s*)+$/.test(node.value)) {
      section.blocks.push(node);
    }
  }
  return result;
}

function catalogueItem(node) {
  const children = node.children?.[0]?.children ?? [];
  const [title, ...description] = children;
  if (title?.type !== 'link' && title?.type !== 'strong') return undefined;
  return {
    name: plainText(title).trim().replace(/\.$/, ''),
    href: title.url,
    description: description.map(plainText).join('').replace(/^[.\s]+/, ''),
    value: JSON.stringify(node.children),
  };
}

function sectionParts(section, catalogue) {
  const items = [];
  const prose = [];
  for (const block of section?.blocks ?? []) {
    if (catalogue && block.type === 'list' && !block.ordered) {
      const otherItems = [];
      for (const node of block.children ?? []) {
        const item = catalogueItem(node);
        if (item?.name) items.push(item);
        else otherItems.push(node);
      }
      if (otherItems.length) prose.push({ ...block, children: otherItems });
      continue;
    }

    if (!catalogue && block.type === 'paragraph') {
      const links = [];
      const text = [];
      for (const node of block.children ?? []) {
        const name = node.type === 'link' ? plainText(node).trim() : '';
        if (name) links.push({ node, name });
        else text.push(node);
      }
      const context = text.map(plainText).join('').trim();
      // A short callout such as “Browse the [collection].” is covered by its link.
      const callout = links.length === 1 && context.length <= 24;
      for (const { node, name } of links) {
        items.push({ name, href: node.url, value: JSON.stringify(callout ? block : node) });
      }
      if (!callout) prose.push({ ...block, children: text });
      continue;
    }
    prose.push(block);
  }
  return { items, prose: JSON.stringify(prose) };
}

function itemChanges(previous, current, catalogue, findNewPage) {
  const unmatched = new Set(previous);
  const pairs = current.map((item) => {
    const match = [...unmatched].find(({ value }) => value === item.value);
    unmatched.delete(match);
    return { item, match };
  });
  const kind = catalogue ? 'entry' : 'link';
  const details = [];
  for (const pair of pairs) {
    const { item } = pair;
    if (pair.match) continue;
    const newPage = catalogue ? findNewPage(item.href) : undefined;
    let match = [...unmatched].find((old) => old.name === item.name || (item.href && old.href === item.href));
    if (!match && newPage) {
      const opening = sections(newPage.after.body, newPage.file).get('');
      const [source] = sectionParts(opening, false).items;
      if (source?.href) {
        match = [...unmatched].find((old) => old.href === source.href && old.description === item.description
          && !current.some((entry) => entry.name === old.name || entry.href === old.href));
      }
    }
    pair.match = match;
    if (match) {
      unmatched.delete(match);
      details.push({
        kind, action: 'Updated', name: item.name,
        description: item.description !== match.description ? item.description : undefined,
      });
    } else if (!newPage) {
      details.push({ kind, action: 'Added', name: item.name, value: item.value });
    }
  }
  for (const item of unmatched) details.push({ kind, action: 'Removed', name: item.name, value: item.value });
  const order = pairs.flatMap(({ match }) => match ? [previous.indexOf(match)] : []);
  return { details, reordered: order.some((index, i) => index < order[i - 1]) };
}

function withoutMovedLinks(changes) {
  const removedLinks = Map.groupBy(changes.filter(({ kind, action }) => kind === 'link' && action === 'Removed'), ({ value }) => value);
  const movedLinks = new Set();
  for (const change of changes) {
    if (change.kind !== 'link' || change.action !== 'Added') continue;
    const removed = removedLinks.get(change.value)?.pop();
    if (!removed) continue;
    movedLinks.add(removed);
    movedLinks.add(change);
  }
  return changes.filter((change) => !movedLinks.has(change));
}

function changeSentences(details) {
  const groups = Map.groupBy(details, ({ kind, action }) => `${kind}:${action}`);
  return [...groups.values()].flatMap((group) => {
    const [{ kind, action, description }] = group;
    let names = group.map(({ name }) => name);
    if (kind === 'link') {
      const installs = names.filter((name) => /^Install\s/i.test(name));
      names = installs.length > 1
        ? [`${installs.length} install links`, ...names.filter((name) => !installs.includes(name)).map((name) => `a link to “${name}”`)]
        : names.map((name) => `a link to “${name}”`);
    }
    const sentence = `${action} ${list.format(names)}.`;
    // Keep the wording of a single catalogue edit when it is brief enough to read inline.
    return group.length === 1 && description && description.length <= 140 ? [sentence, description] : [sentence];
  });
}

/** @returns {string[]} */
export function documentChanges(before, after, oldFile, file, findNewPage) {
  const catalogue = /\/index\.mdx?$/.test(file);
  const previous = sections(before.body, oldFile);
  const current = sections(after.body, file);
  const keys = new Set([...current.keys(), ...previous.keys()]);
  const changes = [];
  const notes = [];
  for (const key of keys) {
    const oldSection = previous.get(key);
    const section = current.get(key);
    const name = (section ?? oldSection).name;
    const oldParts = sectionParts(oldSection, catalogue);
    const parts = sectionParts(section, catalogue);
    const { details, reordered } = itemChanges(oldParts.items, parts.items, catalogue, findNewPage);
    const headingChanged = JSON.stringify(oldSection?.heading) !== JSON.stringify(section?.heading);
    // Catalogue links to first publications may be the entire new section.
    const headingOnly = headingChanged && (oldSection && section || !catalogue || (!parts.items.length && !oldParts.items.length));
    if (oldParts.prose !== parts.prose || headingOnly) {
      const action = !oldSection ? 'Added' : !section ? 'Removed' : 'Updated';
      details.push({ kind: 'section', action, name: key ? `“${name}”` : 'the opening text' });
    }
    changes.push(...details);
    if (reordered) notes.push(key ? `Reordered entries in “${name}”.` : 'Reordered entries.');
  }
  const survivingSections = (first, second) => [...first.keys()].filter((key) => second.has(key));
  if (JSON.stringify(survivingSections(previous, current)) !== JSON.stringify(survivingSections(current, previous))) {
    notes.push('Reordered page sections.');
  }
  return [...changeSentences(withoutMovedLinks(changes)), ...notes];
}
