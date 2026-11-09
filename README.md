# Agents Field Guide

[Live site](https://agents-field-guide.callumflack-97f.workers.dev/)

A static Nimbus site. Use Node 22.23.4 or newer and run `npm ci` then `npm run dev` to preview.

`src/content/docs/` contains the public editions of Field Guide notes. Copy in individual pages and attachments approved for the site. Link to original public sources. Keep the private vault, raw notes, and Codex thread links outside this repo.

Build with `npm run build`. Deploy the build with `npx wrangler deploy` while signed in to the Cloudflare account that owns the Worker. Cloudflare receives the contents of `dist/`.
