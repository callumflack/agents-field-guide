import { execFileSync } from 'node:child_process';

const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim();
if (shallow === 'true') {
  execFileSync('git', ['fetch', '--unshallow', 'origin'], { stdio: 'inherit' });
}
