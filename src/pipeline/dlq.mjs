// Dead-letter queue. Any cluster that fails after retries lands here so it
// can be inspected and replayed. JSONL append-only, one entry per failure.
// Replay tooling lives in scripts/dlq-replay.js.

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const DLQ_FILE = path.join(process.cwd(), 'ops/dlq.jsonl');

function clusterKey(cluster) {
  // Stable id: hash the source URLs so the same cluster doesn't get queued
  // multiple times with different ids if it fails on consecutive runs.
  const urls = (cluster.articles || []).map(a => a.link).sort().join('\n');
  return crypto.createHash('sha1').update(urls).digest('hex').slice(0, 16);
}

export async function enqueueFailure({ cluster, error, stage }) {
  await fs.mkdir(path.dirname(DLQ_FILE), { recursive: true });
  const entry = {
    id: clusterKey(cluster),
    enqueued_at: new Date().toISOString(),
    stage,
    error: String(error?.message || error).slice(0, 800),
    cluster: {
      theme: cluster.theme,
      articles: (cluster.articles || []).map(a => ({
        title: a.title,
        link: a.link,
        source: a.source,
        content: (a.content || '').slice(0, 4000),
      })),
    },
  };
  await fs.appendFile(DLQ_FILE, JSON.stringify(entry) + '\n');
  return entry.id;
}

export async function loadDlq() {
  try {
    const raw = await fs.readFile(DLQ_FILE, 'utf-8');
    return raw.split('\n').filter(Boolean).map(l => JSON.parse(l));
  } catch {
    return [];
  }
}

// Rewrites the DLQ to keep only the entries whose ids are NOT in `resolvedIds`.
// Used by the replay script after successful re-runs.
export async function pruneDlq(resolvedIds) {
  const all = await loadDlq();
  const survivors = all.filter(e => !resolvedIds.includes(e.id));
  if (survivors.length === all.length) return 0;
  await fs.writeFile(DLQ_FILE, survivors.map(e => JSON.stringify(e)).join('\n') + (survivors.length ? '\n' : ''));
  return all.length - survivors.length;
}
