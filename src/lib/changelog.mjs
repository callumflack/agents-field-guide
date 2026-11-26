import { execFileSync } from 'node:child_process';

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
