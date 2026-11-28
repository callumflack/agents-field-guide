import assert from 'node:assert/strict';
import { execFile, execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const script = (name) => fileURLToPath(new URL(`./${name}.mjs`, import.meta.url));
const doc = (title, body) => `---\ntitle: ${title}\n---\n\n${body}\n`;

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'afg-checks-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const write = (file, body) => {
    const path = join(cwd, 'src/content/docs', file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, body);
  };
  return { cwd, write };
}

async function serve(t, pages) {
  const server = createServer((request, response) => {
    const html = pages.get(request.url);
    response.writeHead(html ? 200 : 404, { 'Content-Type': 'text/html' });
    response.end(html);
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  t.after(() => new Promise((resolve) => server.close(resolve)));
  return `http://127.0.0.1:${server.address().port}`;
}

test('the release command detects stale article content and wrong entries even when both changelogs agree', async (t) => {
  const { cwd, write } = fixture(t);
  const git = (...args) => execFileSync('git', ['-c', 'user.name=Fixture', '-c', 'user.email=fixture@example.test', ...args], {
    cwd, stdio: 'pipe',
    env: { ...process.env, GIT_AUTHOR_DATE: '2026-11-28T12:00:00+10:00', GIT_COMMITTER_DATE: '2026-11-28T12:00:00+10:00' },
  });
  git('init');
  write('references/index.md', doc('References', '- [Existing](/references/existing/)'));
  write('references/existing.md', doc('Existing', 'Earlier wording.'));
  git('add', '.');
  git('commit', '-m', 'Initial references');
  write('references/index.md', doc('References', '- [Existing](/references/existing/)\n- [New](/references/new/)'));
  write('references/existing.md', doc('Existing', 'Approved wording.'));
  write('references/new.md', doc('New', 'New article.'));
  git('add', '.');
  git('commit', '-m', 'Update and add references');

  const article = (title, body) => `<main id="main-content"><h1>${title}</h1><article><p>${body}</p></article></main>`;
  const addition = '<li class="change-page"><a href="/references/new/">New</a><span class="change-category">References</span></li>';
  const update = '<li class="change-page"><span class="change-title">Update and add references</span><ul class="change-notes"><li><a href="/references/existing/">Existing</a>. Updated the opening text.</li></ul></li>';
  const changelog = (rows) => `<ol data-slot="changelog"><li class="change-day"><time datetime="2026-11-28">28 Nov</time><ul class="change-pages">${rows}</ul></li></ol>`;
  const pages = new Map([
    ['/references/', article('References', 'The catalogue.')],
    ['/references/existing/', article('Existing', 'Approved wording.')],
    ['/references/new/', article('New', 'New article.')],
    ['/changelog/', changelog(update + addition)],
  ]);
  const published = new Map(pages);
  const [preview, live] = await Promise.all([serve(t, pages), serve(t, published)]);
  const approved = article('Existing', `Approved wording. <a href="${live}/references/new/">New</a>`);
  pages.set('/references/existing/', approved);
  published.set('/references/existing/', approved);
  const check = () => run(process.execPath, [script('check-release'), '--preview', preview, '--live', live], { cwd });
  const { stdout } = await check();
  assert.match(stdout, /✓ \/references\/existing\//);
  assert.match(stdout, /✓ \/changelog\//);

  published.set('/references/existing/', article('Existing', 'Earlier wording.'));
  await assert.rejects(check, (error) => error.code === 1 && /\/references\/existing\/: article differs/.test(error.stderr));
  published.set('/references/existing/', pages.get('/references/existing/'));

  pages.set('/changelog/', changelog(update + addition + addition));
  published.set('/changelog/', pages.get('/changelog/'));
  await assert.rejects(check, (error) => error.code === 1 && /Expected one addition for \/references\/new\/, found 2/.test(error.stderr));

  pages.set('/changelog/', changelog(addition));
  published.set('/changelog/', pages.get('/changelog/'));
  await assert.rejects(check, (error) => error.code === 1 && /Expected one release entry for “Update and add references”, found 0/.test(error.stderr));
});

test('the reference report shows editorial links and shared citations while ignoring catalogue navigation', async (t) => {
  const { cwd, write } = fixture(t);
  write('references/index.md', doc('References', '- [Source note](/references/source/)'));
  write('references/source.md', doc('Source note', '[Apply the rule](/methods/apply/).\n\n[Paper](https://example.com/paper#part-1).'));
  write('methods/apply.md', doc('Apply the rule', '[Read the source](/references/source/).'));
  write('references/related.md', doc('Companion note', 'Source note makes the earlier claim. See [paper](https://example.com/paper#part-2).'));
  const { stdout } = await run(process.execPath, [script('check-references'), '/references/source/'], { cwd });
  assert.match(stdout, /Apply the rule .*links in both directions/);
  assert.match(stdout, /Companion note .*mentions this page’s title.*shared citation https:\/\/example\.com\/paper/);
  assert.doesNotMatch(stdout, /^\s+References \(/m);
});
