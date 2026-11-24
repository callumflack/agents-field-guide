import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pageAdditions } from '../src/lib/changelog.mjs';

test('page additions retain their original date through edits and renames, and omit uncommitted pages', () => {
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
    assert.deepEqual(pageAdditions(pages, cwd).map(({ href, date }) => ({ href, date })), [
      { href: '/new/', date: '2026-11-12' },
      { href: '/original/', date: '2026-11-10' },
    ]);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
