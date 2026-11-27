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
    { date: '2026-11-15', summary: 'Publish the completed draft', pages: [
      { file: draft, title: 'Draft', note: 'Published.' },
    ] },
    { date: '2026-11-14', summary: 'Withdraw the guide and rename a catalogue entry', pages: [
      { file: page, title: 'Guide', note: 'Withdrawn.' },
      { file: index, title: 'References', note: 'Updated Renamed external. Removed Guide.' },
    ] },
    { date: '2026-11-13', summary: 'Add another page and improve the existing guide', pages: [
      { file: page, title: 'Guide', note: 'Updated the opening text.' },
    ] },
    { date: '2026-11-11', summary: 'Clarify the guide and add an external reference', pages: [
      { file: page, title: 'Guide', note: 'Updated the opening text.' },
      { file: index, title: 'References', note: 'Added External.' },
    ] },
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
    { date: '2026-11-13', summary: 'Rename one reference and remove another', pages: [
      { file: removed, title: 'Removed', note: 'Removed.' },
      { file: renamed, title: 'Original', note: 'Moved the page.' },
    ] },
  ]);
});

test('a squash lists each surviving public change under one release subject', (t) => {
  const { cwd, git, write, commit } = historyFixture(t);
  const index = 'src/content/docs/skills/index.md';
  const guide = 'src/content/docs/methods/compose.md';
  const draft = 'src/content/docs/methods/draft.md';
  write(index, doc('Skills', '## UI\n\n- [Components](https://example.test/components). Use the old registry.\n- [Old tool](https://example.test/old).'));
  write(guide, doc('Compose an interface', '## Install\n\nInstall the package.\n\n## Verify\n\nRun the checks.'));
  write(draft, doc('Draft', 'Keep this private.', true));
  const since = commit('10', 'Initial pages');
  git('checkout', '-b', 'feature');

  const catalogue = '## UI\n\n- [Components](https://example.test/components). Use Base UI or Radix.\n- [Lint](https://example.test/lint).';
  write(index, doc('Skills', `${catalogue}\n- [Temporary](https://example.test/temp).`));
  write(draft, doc('Private title', 'Private changes.', true));
  commit('11', 'Update the catalogue');

  write('src/content/docs/skills/guide.md', doc('New guide', 'New page'));
  write(index, doc('Skills', `${catalogue}\n- [New guide](/skills/guide/).`));
  write(guide, doc('Compose an interface', '## Install\n\nInstall the package.\n\n[Install for CLI](https://example.test/cli).\n\n[Install for desktop](https://example.test/desktop).\n\n[Setup guide](https://example.test/setup).\n\n## Verify\n\nRun the checks in the browser.'));
  commit('12', 'Add a guide and edit the playbook');

  git('checkout', 'main');
  git('merge', '--squash', 'feature');
  commit('13', 'Publish the UI changes');

  const updates = pageUpdates(cwd, since);
  assert.equal(updates.length, 1);
  assert.equal(updates[0].summary, 'Publish the UI changes');
  assert.deepEqual(updates[0].pages, [
    { file: guide, title: 'Compose an interface', note: 'Added 2 install links and a link to “Setup guide”. Updated “Verify”.' },
    { file: index, title: 'Skills', note: 'Updated Components. Use Base UI or Radix. Added Lint. Removed Old tool.' },
  ]);
});

test('the UI skills release fits in two bullets and names the distinct public updates', () => {
  const cwd = fileURLToPath(new URL('..', import.meta.url));
  const release = pageUpdates(cwd).find(({ summary }) => summary === 'Add UI skills and link the Intent specialist collection');
  assert.equal(release.date, '2026-11-27');
  assert.deepEqual(release.pages.map(({ title, note }) => [title, note]), [
    ['Intent specialists', 'Added 6 install links and a link to “Intent collection in the Skills index”.'],
    ['Skills', 'Added Intent collection, outtrue, Jakub Antalik, Ibelick’s UI Skills and @shadcn/lint. Updated shadcn/ui. Find and compose components from registries, using Base UI, React Aria or Radix.'],
  ]);
});
