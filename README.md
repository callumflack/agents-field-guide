# Agents Field Guide

[Live site](https://afg.callum.website/)

A static Nimbus site. Use Node 22.23.4 or newer and run `npm ci` then `npm run dev` to preview.

`src/content/docs/` contains the public editions of Field Guide notes. Copy in individual pages and attachments approved for the site. Link to original public sources. Keep the private vault, raw notes, and Codex thread links outside this repo.

Original reference sources are stored in R2 and served through `sources.afg.callum.website`. Local [`sources/<reference-slug>/`](sources/README.md) folders are ignored working copies; Git keeps only manifests. Use `npm run sources:upload -- <reference-slug>` to upload and verify a source. The [source storage guide](sources/README.md) owns setup and maintenance.

Pushes to `main` build with `npm run build` in Cloudflare Workers Builds and deploy `dist/` to the live site. For a local build, run `npm run build`.

The [changelog](https://afg.callum.website/changelog/) records catalogue additions and groups edits by their first-parent release commit. Before building, a shallow clone fetches the complete history from origin so older entries keep their original dates.

### Release check

After sign-off, build and serve the reviewed copy from the release commit so the preview includes its changelog. Once it deploys, verify it with one command:

```sh
npm run release:check -- --preview http://127.0.0.1:4339
```

Use the origin of the approved preview. The check uses `HEAD` by default and compares the rendered titles, descriptions and articles of the release’s public pages with production. It checks the rendered changelog against the preview and verifies the release’s expected additions and update notes. Pass `--commit <ref>` to select a different release. Pass extra page paths to cover changes from shared components or partials.

### Cross-reference check

```sh
npm run refs:check -- /references/decomposing-systems-into-modules/
```

The report shows editorial links in both directions, title mentions and shared citations. Supply multiple page paths to review a connection you already have in mind. Add a link where it gives the reader a useful next step. A small extension can go on the existing page. Leave the connection alone when it already serves the reader.
