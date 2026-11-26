import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readdir, readFile, rename, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sourceRoot = path.join(root, 'sources');
const config = JSON.parse(await readFile(path.join(sourceRoot, 'storage.json'), 'utf8'));
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const selected = args.filter(arg => !arg.startsWith('--'));

if (args.includes('--help')) {
  console.log('npm run sources:upload -- [reference-slug] [--dry-run]\nUploads source files to R2, verifies their SHA-256, and saves URLs in source.json. Rerunning verifies and skips existing files.');
  process.exit(0);
}
if (selected.length > 1 || selected.some(slug => !/^[a-z0-9][a-z0-9-]*$/.test(slug)) || args.some(arg => arg.startsWith('--') && arg !== '--dry-run')) {
  throw new Error('Use one reference slug and/or --dry-run. See --help.');
}
if (!dryRun && !config.accountId) {
  throw new Error('Set the owning Cloudflare accountId in sources/storage.json before uploading.');
}

const mimeTypes = {
  '.pdf': 'application/pdf', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.avif': 'image/avif', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
  '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
};

async function localFiles(directory, prefix = '') {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'source.json') continue;
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) result.push(...await localFiles(path.join(directory, entry.name), relative));
    else if (entry.isFile()) result.push(relative);
    else throw new Error(`Source must be a regular file: ${relative}`);
  }
  return result.sort();
}

async function digest(chunks) {
  const hash = createHash('sha256');
  let bytes = 0;
  for await (const chunk of chunks) {
    hash.update(chunk);
    bytes += chunk.length;
  }
  return { sha256: hash.digest('hex'), bytes };
}

async function remoteDigest(url) {
  const probe = new URL(url);
  probe.searchParams.set('verify', `${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const response = await fetch(probe, { signal: AbortSignal.timeout(60_000), redirect: 'error' });
  if (response.status === 404) {
    await response.body?.cancel();
    return null;
  }
  if (!response.ok) throw new Error(`Download failed: HTTP ${response.status} ${url}`);
  return digest(response.body);
}

async function upload(file, key, contentType, download) {
  const command = [path.join(root, 'node_modules/wrangler/bin/wrangler.js'),
    'r2', 'object', 'put', `${config.bucket}/${key}`, '--file', file, '--remote',
    '--content-type', contentType, '--cache-control', 'public, max-age=31536000, immutable'];
  if (download) {
    const filename = path.basename(file).replace(/["\r\n]/g, '_');
    command.push('--content-disposition', `attachment; filename="${filename}.txt"`);
  }
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, command, {
      cwd: root,
      env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: config.accountId },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    child.stdout.on('data', chunk => { output += chunk; });
    child.stderr.on('data', chunk => { output += chunk; });
    child.on('error', reject);
    child.on('close', code => code === 0 ? resolve() : reject(new Error(`Wrangler upload failed for ${key}:\n${output}`)));
  });
}

async function store(folder, file) {
  const absolute = path.join(sourceRoot, folder, file);
  const expected = await digest(createReadStream(absolute));
  const key = `${folder}/${expected.sha256}/${file}`;
  const url = `${config.publicBaseUrl.replace(/\/$/, '')}/${key.split('/').map(encodeURIComponent).join('/')}`;
  const extension = path.extname(file).toLowerCase();
  const download = ['.html', '.htm', '.svg', '.xml', '.js', '.mjs'].includes(extension);
  const contentType = download ? 'text/plain; charset=utf-8' : (mimeTypes[extension] || 'application/octet-stream');
  if (!dryRun) {
    const existing = await remoteDigest(url);
    if (existing && existing.sha256 !== expected.sha256) throw new Error(`Remote checksum mismatch; refusing to overwrite ${url}`);
    if (!existing) {
      await upload(absolute, key, contentType, download);
      const saved = await remoteDigest(url);
      if (!saved || saved.sha256 !== expected.sha256) throw new Error(`Uploaded file did not verify: ${url}`);
    }
    console.log(`${existing ? 'Verified' : 'Uploaded'} ${folder}/${file}`);
  }
  return { file, key, url, ...expected, content_type: contentType };
}

function updateRecords(value, objects) {
  if (!value || typeof value !== 'object') return;
  if (value.file && objects.has(value.file)) {
    const saved = objects.get(value.file);
    Object.assign(value, { storage: 'r2', remote_url: saved.url, object_key: saved.key, sha256: saved.sha256, bytes: saved.bytes });
    if (value.reader_copy) value.reader_copy = saved.url;
  }
  for (const child of Object.values(value)) updateRecords(child, objects);
}

const folders = selected.length ? selected : (await readdir(sourceRoot, { withFileTypes: true })).filter(entry => entry.isDirectory() && !entry.name.startsWith('.')).map(entry => entry.name).sort();
let total = 0;
for (const folder of folders) {
  const manifest = path.join(sourceRoot, folder, 'source.json');
  const metadata = JSON.parse(await readFile(manifest, 'utf8'));
  const files = await localFiles(path.join(sourceRoot, folder));
  const objects = new Array(files.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(4, files.length) }, async () => {
    for (let index; (index = cursor++) < files.length;) objects[index] = await store(folder, files[index]);
  }));
  if (!dryRun) {
    delete metadata.objects;
    updateRecords(metadata, new Map(objects.map(object => [object.file, object])));
    metadata.objects = objects;
    const temporary = path.join(path.dirname(manifest), '.source.json.tmp');
    await writeFile(temporary, `${JSON.stringify(metadata, null, 2)}\n`);
    await rename(temporary, manifest);
  }
  total += files.length;
  console.log(`${dryRun ? 'Would upload' : 'Saved'} ${files.length} files for ${folder}.`);
}
console.log(`${dryRun ? 'Planned' : 'Verified'} ${total} source files. Local copies retained.`);
