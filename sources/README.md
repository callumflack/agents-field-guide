# Source storage

R2 stores and serves original source files. Git keeps this README, `storage.json` and each reference’s `source.json`; downloaded files are ignored working copies.

## Add a source

1. Save the original and associated files in `sources/<reference-slug>/`. Record its title, original URL, filename and capture date in that folder’s `source.json`. Keep source wording intact.
2. Run `npm run sources:upload -- <reference-slug>` from the repository root. The command uploads the files, verifies their downloaded SHA-256 checksums and writes the resulting URLs to `source.json` under `objects` and each matching source record’s `remote_url`.
3. Link those URLs from the guide page, retaining the publisher’s original link. Commit the small manifests with the page. Leave downloaded files out of Git.

Omit the slug to upload all references. Add `--dry-run` to list the work without uploads or manifest changes. Rerun the same command to verify and skip files already stored. Changed content receives a new URL; existing copies are retained. The command never deletes local or remote files.

Uploads publish source files independently of site deployment. The guide’s rendered-review rule still applies to its pages. HTML, SVG and executable source formats are served as text downloads.

## Configuration and access

`storage.json` owns the R2 bucket, Cloudflare account ID and public URL. The uploader uses the pinned project-local Wrangler and that explicit account. Authenticate Wrangler to the owning account or supply its approved Cloudflare API token through the existing credential workflow. Do not put credentials in this directory or in command arguments.

Wrangler's login on this Mac is stored in OS Keychain. On a new machine, use `npx wrangler login --use-keyring --scopes account:read user:read workers:write zone:read` with the owning account's authorization. Wrangler adds the refresh-access scope automatically; avoid its broader default login scopes. The command and `storage.json` are sufficient for future uploads; no site deployment or new bucket is needed.

Available transcripts are included in the current captures. Embedded recordings and two failed image downloads remain recorded as gaps in the manifests.
