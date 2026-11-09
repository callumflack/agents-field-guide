# Agents Field Guide

[Live site](https://agents-field-guide.callumflack-97f.workers.dev/)

A static Nimbus site. Use Node 22.23.4 or newer and run `npm ci` then `npm run dev` to preview.

`src/content/docs/` contains the public editions of Field Guide notes. Copy in individual pages and attachments approved for the site. Link to original public sources. Keep the private vault, raw notes, and Codex thread links outside this repo.

Pushes to `main` build with `npm run build` in Cloudflare Workers Builds and deploy `dist/` to the live site. For a local build, run `npm run build`.
