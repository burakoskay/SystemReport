// Post-build deploy size check. Cloudflare Pages (free plan) rejects any
// deployment with more than 20,000 files, but only after the build has
// passed, so the failure shows up as a stale site rather than a red build.
// This counts the real output and fails the build itself, with the number,
// if src/lib/deploy-budget.ts ever lets the output past the limit.

import { readdirSync } from 'node:fs';

const LIMIT = 20_000; // keep in sync with CLOUDFLARE_FILE_LIMIT in src/lib/deploy-budget.ts
const DIST = 'dist';

const files = readdirSync(DIST, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile()).length;

console.log(`deploy size: ${files} files (Cloudflare Pages limit ${LIMIT})`);

if (files > LIMIT) {
  console.error(`::error::Build output has ${files} files; Cloudflare Pages rejects deployments over ${LIMIT}. ` +
    'Lower FILE_BUDGET or the per-post estimate in src/lib/deploy-budget.ts.');
  process.exit(1);
}
