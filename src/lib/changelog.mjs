import { execFileSync } from 'node:child_process';
import { posix } from 'node:path';
import { documentChanges, readDocument } from './changelog-details.mjs';

/**
 * First recorded addition of each current page; renames retain their date.
 * @template {{ file: string, title: string, previousFile?: string }} T
 * @param {T[]} pages
 * @param {string} cwd
 * @returns {(T & { date: string })[]}
 */
export function pageAdditions(pages, cwd) {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    throw new Error('The changelog needs full Git history. Fetch the complete history before building.');
  }

  return pages.flatMap((page) => {
    const history = (file) => git('log', '--follow', '--diff-filter=A', '--format=%cI', '--', file).split('\n').filter(Boolean);
    let dates = history(page.file);
    if (!dates.length && page.previousFile) dates = history(page.previousFile);
    // Uncommitted additions have no Git date yet.
    const added = dates.at(-1);
    return added ? [{ ...page, date: added.slice(0, 10) }] : [];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'en'));
}

/**
 * Public content changes since update tracking began, one row per release commit.
 * New pages already appear in pageAdditions; generated catalogues are excluded.
 * @param {string} cwd
 * @param {string} since Exclusive first-parent history boundary.
 * @param {string} until Inclusive first-parent history boundary.
 */
export function pageUpdates(cwd, since = '33e36679d20ed1b5c356dae00c43ac8a97263558', until = 'HEAD') {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' });
  if (git('rev-parse', '--is-shallow-repository').trim() === 'true') {
    throw new Error('The changelog needs full Git history. Fetch the complete history before building.');
  }
  const isPublic = (doc) => doc !== undefined && doc.metadata.draft !== true;
  const isTrackedDoc = (file) => /^src\/content\/docs\/.+\.mdx?$/.test(file)
    && !/^src\/content\/docs\/(?:index|changelog)\.mdx?$/.test(file);
  const readerDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Brisbane', year: 'numeric', month: '2-digit', day: '2-digit',
  });

  return git('log', '--first-parent', '--format=%H%x00%cI%x00%s', `${since}..${until}`)
    .split('\n').filter(Boolean).flatMap((release) => {
      const [hash, committedAt, summary] = release.split('\0');
      const parent = `${hash}^1`;
      const names = git('diff', '--name-status', '-z', '--find-renames', parent, hash, '--', 'src/content/docs').split('\0').filter(Boolean);
      const changes = [];
      for (let i = 0; i < names.length;) {
        const status = names[i++][0];
        const oldFile = names[i++];
        const file = status === 'R' ? names[i++] : oldFile;
        if (!isTrackedDoc(file) && !isTrackedDoc(oldFile)) continue;
        changes.push({
          status, file, oldFile,
          before: status === 'A' || !isTrackedDoc(oldFile) ? undefined : readDocument(git('show', `${parent}:${oldFile}`)),
          after: status === 'D' || !isTrackedDoc(file) ? undefined : readDocument(git('show', `${hash}:${file}`)),
        });
      }
      const addedPages = new Map(changes.filter(({ status, after }) => status === 'A' && isPublic(after)).map((page) => [page.file, page]));
      const pages = changes.flatMap(({ status, file, oldFile, before, after }) => {
        const wasPublic = isPublic(before);
        const nowPublic = isPublic(after);
        if (status === 'A' || (!wasPublic && !nowPublic)) return [];
        const title = (nowPublic ? after : before).metadata.title ?? posix.basename(file, posix.extname(file));
        if (!wasPublic) return [{ file, title, note: 'Published.' }];
        if (!nowPublic) {
          return [{ file, title, note: after ? 'Withdrawn.' : 'Removed.' }];
        }

        const findNewPage = (href) => {
          if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) return undefined;
          const target = href.split(/[?#]/)[0];
          const path = target.startsWith('/')
            ? `src/content/docs${target}`
            : posix.join(posix.dirname(file), target);
          const stem = path.replace(/\/$/, '').replace(/\.mdx?$/, '');
          return [`${stem}.md`, `${stem}.mdx`, `${stem}/index.md`, `${stem}/index.mdx`].map((page) => addedPages.get(page)).find(Boolean);
        };
        const sentences = documentChanges(before, after, oldFile, file, findNewPage);
        if (before.metadata.description !== after.metadata.description) sentences.unshift('Updated the page description.');
        if (before.metadata.title !== after.metadata.title) sentences.unshift('Renamed the page.');
        if (oldFile !== file) sentences.unshift('Moved the page.');
        return sentences.length ? [{ file, title, note: sentences.join(' ') }] : [];
      }).sort((a, b) => a.file.localeCompare(b.file, 'en'));
      return pages.length ? [{ date: readerDate.format(new Date(committedAt)), summary, pages }] : [];
    });
}
