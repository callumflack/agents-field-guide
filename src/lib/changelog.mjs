import { execFileSync } from 'node:child_process';
import { posix } from 'node:path';

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
 * @returns {{ date: string, summary: string, files: string[] }[]}
 */
export function pageUpdates(cwd, since = '33e36679d20ed1b5c356dae00c43ac8a97263558') {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
  if (git('rev-parse', '--is-shallow-repository') === 'true') {
    throw new Error('The changelog needs full Git history. Fetch the complete history before building.');
  }
  const isPublic = (content) => {
    if (content === undefined) return false;
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
    return !/^draft:\s*true\s*(?:#.*)?$/m.test(frontmatter);
  };
  const isTrackedDoc = (file) => /^src\/content\/docs\/.+\.mdx?$/.test(file)
    && !/^src\/content\/docs\/(?:index|changelog)\.mdx?$/.test(file);
  const readerDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Australia/Brisbane', year: 'numeric', month: '2-digit', day: '2-digit',
  });

  return git('log', '--first-parent', '--format=%H%x00%cI%x00%s', `${since}..HEAD`)
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
          before: status === 'A' ? undefined : git('show', `${parent}:${oldFile}`),
          after: status === 'D' ? undefined : git('show', `${hash}:${file}`),
        });
      }
      const addedPages = new Set(changes.filter(({ status, after }) => status === 'A' && isPublic(after)).map(({ file }) => file));
      const files = changes.filter(({ status, file, before, after }) => {
        if (status === 'A' || (!isPublic(before) && !isPublic(after))) return false;
        if (status !== 'M' || !/\/index\.mdx?$/.test(file)) return true;

        // An index merely listing this release's new pages adds no second event.
        const lines = git('diff', '--unified=0', parent, hash, '--', file).split('\n')
          .filter((line) => /^[+-]/.test(line) && !/^(---|\+\+\+)/.test(line) && line.slice(1).trim());
        const onlyNewPageLinks = lines.length > 0 && lines.every((line) => {
          if (!line.startsWith('+')) return false;
          const href = line.slice(1).match(/^\s*[-*]\s+\[[^\]]+\]\(([^)\s]+)\)/)?.[1];
          if (!href || /^(?:[a-z]+:|\/\/)/i.test(href)) return false;
          const target = href.split(/[?#]/)[0];
          const path = target.startsWith('/')
            ? `src/content/docs${target}`
            : posix.join(posix.dirname(file), target);
          const stem = path.replace(/\/$/, '').replace(/\.mdx?$/, '');
          return [`${stem}.md`, `${stem}.mdx`, `${stem}/index.md`, `${stem}/index.mdx`].some((page) => addedPages.has(page));
        });
        return !onlyNewPageLinks;
      }).map(({ file }) => file).sort();
      return files.length ? [{ date: readerDate.format(new Date(committedAt)), summary, files }] : [];
    });
}
