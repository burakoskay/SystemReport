// Roll up ops/telemetry/YYYY-MM-DD.jsonl into a single-day summary.
// Usage: node scripts/telemetry-rollup.js [YYYY-MM-DD]
// Writes ops/rollup/YYYY-MM-DD.json with success rate, p50/p95 latency per model,
// and an error-class histogram.

import fs from 'fs/promises';
import path from 'path';

const TELEMETRY_DIR = path.join(process.cwd(), 'ops/telemetry');
const ROLLUP_DIR    = path.join(process.cwd(), 'ops/rollup');

function percentile(sorted, p) {
  if (!sorted.length) return null;
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length));
  return sorted[idx];
}

async function rollupDay(day) {
  const file = path.join(TELEMETRY_DIR, `${day}.jsonl`);
  const raw = await fs.readFile(file, 'utf-8').catch(() => '');
  if (!raw) {
    console.log(`No telemetry for ${day}`);
    return;
  }

  const records = raw.trim().split('\n').map(l => JSON.parse(l));
  const byModel = {};
  const errorClasses = {};

  for (const r of records) {
    const key = `${r.provider}/${r.model}`;
    const b = byModel[key] ||= { ok: 0, fail: 0, latencies: [], tasks: {} };
    if (r.ok) b.ok++; else b.fail++;
    b.latencies.push(r.latency_ms);
    b.tasks[r.task] = (b.tasks[r.task] || 0) + 1;
    if (!r.ok) errorClasses[r.error_class || 'unknown'] = (errorClasses[r.error_class || 'unknown'] || 0) + 1;
  }

  const summary = { day, total: records.length, errorClasses, models: {} };
  for (const [k, b] of Object.entries(byModel)) {
    const sorted = [...b.latencies].sort((a, z) => a - z);
    summary.models[k] = {
      attempts: b.ok + b.fail,
      success_rate: +(b.ok / (b.ok + b.fail)).toFixed(3),
      p50_ms: percentile(sorted, 50),
      p95_ms: percentile(sorted, 95),
      tasks: b.tasks,
    };
  }

  await fs.mkdir(ROLLUP_DIR, { recursive: true });
  const out = path.join(ROLLUP_DIR, `${day}.json`);
  await fs.writeFile(out, JSON.stringify(summary, null, 2) + '\n');
  console.log(`Wrote ${out}`);
  console.log(JSON.stringify(summary, null, 2));
}

const day = process.argv[2] || new Date().toISOString().slice(0, 10);
rollupDay(day).catch(e => { console.error(e); process.exit(1); });
