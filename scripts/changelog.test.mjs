import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pageAdditions, pageUpdates } from '../src/lib/changelog.mjs';

test('addition dates survive edits, renames and a shallow build checkout; uncommitted pages are omitted', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'field-guide-changelog-'));
  const git = (...args) => execFileSync('git', args, { cwd, stdio: 'pipe' });
  const commit = (date) => execFileSync('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', 'commit', '-m', 'Fixture'], {
    cwd, stdio: 'pipe', env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
  });
  try {
    git('init');
    writeFileSync(join(cwd, 'original.md'), 'Original page\n');
    git('add', '.');
    commit('2026-11-10T12:00:00+10:00');
    git('mv', 'original.md', 'renamed.md');
    commit('2026-11-11T12:00:00+10:00');
    writeFileSync(join(cwd, 'renamed.md'), 'Edited page\n');
    writeFileSync(join(cwd, 'new.md'), 'New page\n');
    git('add', '.');
    commit('2026-11-12T12:00:00+10:00');
    writeFileSync(join(cwd, 'pending.md'), 'Pending\n');

    const pages = [
      { file: 'renamed.md', title: 'Original', href: '/original/' },
      { file: 'pending.md', title: 'Pending', href: '/pending/' },
      { file: 'new.md', title: 'New', href: '/new/' },
    ];
    const expected = [
      { href: '/new/', date: '2026-11-12' },
      { href: '/original/', date: '2026-11-10' },
    ];
    assert.deepEqual(pageAdditions(pages, cwd).map(({ href, date }) => ({ href, date })), expected);

    mkdirSync(join(cwd, 'references'));
    renameSync(join(cwd, 'renamed.md'), join(cwd, 'references/renamed.md'));
    pages[0] = { ...pages[0], file: 'references/renamed.md', previousFile: 'renamed.md' };
    assert.deepEqual(pageAdditions(pages, cwd).map(({ href, date }) => ({ href, date })), expected);

    const shallow = join(cwd, 'shallow-build');
    git('clone', '--depth', '1', `file://${cwd}`, shallow);
    assert.throws(() => pageAdditions(pages, shallow), /full Git history/);
    execFileSync(process.execPath, [fileURLToPath(new URL('./ensure-git-history.mjs', import.meta.url))], {
      cwd: shallow, stdio: 'pipe',
    });
    assert.deepEqual(pageAdditions(pages, shallow).map(({ href, date }) => ({ href, date })), expected);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

function historyFixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'field-guide-updates-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim();
  const write = (file, body) => {
    mkdirSync(join(cwd, file, '..'), { recursive: true });
    writeFileSync(join(cwd, file), body);
  };
  const commit = (day, summary) => {
    git('add', '.');
    const date = day.length === 2 ? `2026-11-${day}T12:00:00+10:00` : day;
    execFileSync('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', 'commit', '-m', summary], {
      cwd, stdio: 'pipe', env: { ...process.env, GIT_AUTHOR_DATE: date, GIT_COMMITTER_DATE: date },
    });
    return git('rev-parse', 'HEAD');
  };
  git('init', '-b', 'main');
  return { cwd, git, write, commit };
}

const doc = (title, body = '', draft = false) => `---\ntitle: ${title}\n${draft ? 'draft: true\n' : ''}---\n\n${body}\n`;

test('updates include public page and catalogue edits, while additions and draft-only work stay out', (t) => {
  const { cwd, write, commit } = historyFixture(t);
  const page = 'src/content/docs/references/guide.md';
  const index = 'src/content/docs/references/index.md';
  const draft = 'src/content/docs/references/draft.md';
  write(page, doc('Guide', 'Original'));
  write(index, doc('References', '- [Guide](/references/guide/)'));
  write(draft, doc('Draft', 'Original', true));
  const since = commit('10', 'Initial pages');

  write(page, doc('Guide', 'Clarified'));
  write(index, doc('References', '- [Guide](/references/guide/)\n- [External](https://example.test/)'));
  commit('11', 'Clarify the guide and add an external reference');

  write('src/content/docs/references/new.md', doc('New', 'New page'));
  write(index, doc('References', '- [Guide](/references/guide/)\n- [External](https://example.test/)\n\n- [New](/references/new/)'));
  write(draft, doc('Draft', 'Still private', true));
  write('src/content/docs/index.mdx', doc('Home', 'Generated catalogue'));
  write('src/content/docs/changelog.mdx', doc('Changelog', 'Changelog presentation'));
  write('astro.config.ts', '// Infrastructure');
  commit('12', 'Add a new page and do mechanical work');

  write('src/content/docs/references/another.md', doc('Another'));
  write(index, doc('References', '- [Guide](/references/guide/)\n- [External](https://example.test/)\n\n- [New](/references/new/)\n- [Another](/references/another/)'));
  write(page, doc('Guide', 'Clarified again'));
  commit('13', 'Add another page and improve the existing guide');

  write(page, doc('Guide', 'Withdrawn', true));
  write(index, doc('References', '- [Renamed external](https://example.test/)\n\n- [New](/references/new/)\n- [Another](/references/another/)'));
  commit('14', 'Withdraw the guide and rename a catalogue entry');

  write(draft, doc('Draft', 'Now public'));
  commit('2026-11-14T23:30:00Z', 'Publish the completed draft');

  assert.deepEqual(pageUpdates(cwd, since), [
    { date: '2026-11-15', summary: 'Publish the completed draft', files: [draft] },
    { date: '2026-11-14', summary: 'Withdraw the guide and rename a catalogue entry', files: [page, index] },
    { date: '2026-11-13', summary: 'Add another page and improve the existing guide', files: [page] },
    { date: '2026-11-11', summary: 'Clarify the guide and add an external reference', files: [page, index] },
  ]);
});

test('first-parent releases include renamed and removed public pages once, using their release subject', (t) => {
  const { cwd, git, write, commit } = historyFixture(t);
  const original = 'src/content/docs/references/original.md';
  const renamed = 'src/content/docs/references/renamed.md';
  const removed = 'src/content/docs/references/removed.md';
  write(original, doc('Original', 'Original page'));
  write(removed, doc('Removed', 'Removed page'));
  const since = commit('10', 'Initial pages');
  git('checkout', '-b', 'feature');
  git('mv', original, renamed);
  rmSync(join(cwd, removed));
  commit('11', 'Work on the feature branch');
  git('checkout', 'main');
  write('README.md', 'Mechanical work');
  commit('12', 'Update infrastructure');
  execFileSync('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', 'merge', '--no-ff', 'feature', '-m', 'Rename one reference and remove another'], {
    cwd, stdio: 'pipe', env: { ...process.env, GIT_AUTHOR_DATE: '2026-11-12T23:30:00Z', GIT_COMMITTER_DATE: '2026-11-12T23:30:00Z' },
  });
  assert.deepEqual(pageUpdates(cwd, since), [
    { date: '2026-11-13', summary: 'Rename one reference and remove another', files: [removed, renamed] },
  ]);
});

test('the UI skills release records both the Skills index and Intent playbook', () => {
  const cwd = fileURLToPath(new URL('..', import.meta.url));
  const release = pageUpdates(cwd).find(({ summary }) => summary === 'Add UI skills and link the Intent specialist collection');
  assert.deepEqual(release, {
    date: '2026-11-27',
    summary: 'Add UI skills and link the Intent specialist collection',
    files: ['src/content/docs/methods/give-a-job-to-a-specialist.md', 'src/content/docs/skills/index.md'],
  });
});
