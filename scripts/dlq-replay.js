// Replay every cluster in ops/dlq.jsonl. Successes are pruned from the DLQ;
// failures are left in place for the next replay. Output is concise enough
// to ship to a human channel as-is.
//
// Usage: node scripts/dlq-replay.js
//   --limit N    only replay the first N entries
//   --dry        list entries without re-running synthesis

import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { loadDlq, pruneDlq } from '../src/pipeline/dlq.mjs';

dotenv.config();

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const LIMIT = (() => {
  const i = argv.indexOf('--limit');
  if (i >= 0 && argv[i + 1]) return parseInt(argv[i + 1], 10);
  return 25;
})();

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

async function main() {
  const dlq = await loadDlq();
  console.log(`DLQ contains ${dlq.length} entr${dlq.length === 1 ? 'y' : 'ies'}.`);
  if (dlq.length === 0) return;

  if (DRY) {
    for (const e of dlq.slice(0, LIMIT)) {
      console.log(`  ${e.id} [${e.enqueued_at}] ${e.cluster.theme} (${e.cluster.articles.length} sources) — ${e.error.slice(0, 80)}`);
    }
    return;
  }

  // Lazy-import to avoid pulling the whole pipeline graph during --dry runs.
  const { synthesizeAndPublish } = await import('./_dlq-runner.mjs');

  await fs.mkdir(POSTS_DIR, { recursive: true });

  const resolved = [];
  let stillFailed = 0;
  for (const entry of dlq.slice(0, LIMIT)) {
    console.log(`\nReplay ${entry.id}: ${entry.cluster.theme}`);
    try {
      await synthesizeAndPublish(entry.cluster);
      resolved.push(entry.id);
      console.log(`  ✓ resolved.`);
    } catch (e) {
      stillFailed++;
      console.log(`  ✗ still failing: ${e.message.slice(0, 200)}`);
    }
  }
  if (resolved.length) {
    const pruned = await pruneDlq(resolved);
    console.log(`\nPruned ${pruned} resolved entr${pruned === 1 ? 'y' : 'ies'} from DLQ.`);
  }
  console.log(`Summary: ${resolved.length} resolved, ${stillFailed} still failing, ${dlq.length - LIMIT > 0 ? dlq.length - LIMIT + ' not attempted (limit)' : '0 skipped'}.`);
}

main().catch((e) => {
  console.error('Replay aborted:', e);
  process.exit(1);
});
