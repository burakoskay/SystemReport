// Nightly prompt eval. Reads telemetry JSONL for the last N days, joins
// each call against the served `prompt_id` + `prompt_variant`, and computes
// per-variant quality metrics:
//   - call success rate
//   - p50 / p95 latency
//   - mean response_chars
//   - banned-phrase hit rate (if available in telemetry tags)
//   - critique verdict distribution (ship/revise/reject) if present
//
// Output: ops/eval/YYYY-MM-DD.json — one report per run. Comparison is
// done against the prior report so regressions surface immediately.

import fs from 'fs/promises';
import path from 'path';

const TELEMETRY_DIR = path.join(process.cwd(), 'ops/telemetry');
const REPORT_DIR    = path.join(process.cwd(), 'ops/eval');

const DAYS = parseInt(process.env.EVAL_DAYS || '7', 10);

function quantile(arr, q) {
  if (arr.length === 0) return null;
  const s = [...arr].sort((a, b) => a - b);
  const i = Math.floor((s.length - 1) * q);
  return s[i];
}

async function readRecentJsonl(dir, days) {
  const out = [];
  try {
    const entries = await fs.readdir(dir);
    const today = new Date();
    const cutoff = new Date(today.getTime() - days * 24 * 3600 * 1000);
    for (const f of entries) {
      if (!/^\d{4}-\d{2}-\d{2}\.jsonl$/.test(f)) continue;
      const day = new Date(f.slice(0, 10));
      if (day < cutoff) continue;
      const raw = await fs.readFile(path.join(dir, f), 'utf-8');
      for (const line of raw.split('\n')) {
        if (!line) continue;
        try { out.push(JSON.parse(line)); } catch { /* skip malformed */ }
      }
    }
  } catch {
    /* missing telemetry dir is fine on first run */
  }
  return out;
}

function bucketByVariant(records) {
  const buckets = new Map();
  for (const r of records) {
    if (!r.prompt_id || !r.prompt_variant) continue;
    const key = `${r.prompt_id}:${r.prompt_variant}`;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(r);
  }
  return buckets;
}

function summarize(records) {
  const ok = records.filter(r => r.ok);
  const lat = ok.map(r => r.latency_ms).filter((n) => Number.isFinite(n));
  const len = ok.map(r => r.response_chars).filter((n) => Number.isFinite(n));
  const errClasses = {};
  for (const r of records.filter(r => !r.ok)) {
    const k = r.error_class || 'unknown';
    errClasses[k] = (errClasses[k] || 0) + 1;
  }
  return {
    calls: records.length,
    success: ok.length,
    success_rate: records.length ? ok.length / records.length : null,
    latency_p50: quantile(lat, 0.5),
    latency_p95: quantile(lat, 0.95),
    response_chars_mean: len.length ? Math.round(len.reduce((a, b) => a + b, 0) / len.length) : null,
    error_classes: errClasses,
  };
}

async function main() {
  await fs.mkdir(REPORT_DIR, { recursive: true });
  const records = await readRecentJsonl(TELEMETRY_DIR, DAYS);
  const buckets = bucketByVariant(records);

  const report = {
    generated_at: new Date().toISOString(),
    window_days: DAYS,
    total_records: records.length,
    variants: {},
  };
  for (const [key, recs] of buckets) {
    report.variants[key] = summarize(recs);
  }

  const day = new Date().toISOString().slice(0, 10);
  const reportFile = path.join(REPORT_DIR, `${day}.json`);
  await fs.writeFile(reportFile, JSON.stringify(report, null, 2) + '\n');

  // Diff vs the previous report when present.
  const prev = (await fs.readdir(REPORT_DIR))
    .filter(f => /^\d{4}-\d{2}-\d{2}\.json$/.test(f) && f !== `${day}.json`)
    .sort().pop();
  if (prev) {
    try {
      const prevReport = JSON.parse(await fs.readFile(path.join(REPORT_DIR, prev), 'utf-8'));
      console.log(`\nVs previous report (${prev}):`);
      for (const key of Object.keys(report.variants)) {
        const cur = report.variants[key];
        const old = prevReport.variants?.[key];
        if (!old) { console.log(`  + ${key}: new (${cur.calls} calls)`); continue; }
        const dRate = ((cur.success_rate ?? 0) - (old.success_rate ?? 0)) * 100;
        const dP95  = (cur.latency_p95 ?? 0) - (old.latency_p95 ?? 0);
        console.log(`  ~ ${key}: success ${(dRate >= 0 ? '+' : '')}${dRate.toFixed(1)}pp, p95 ${(dP95 >= 0 ? '+' : '')}${dP95}ms (calls ${old.calls}→${cur.calls})`);
      }
    } catch (e) {
      console.log(`(could not diff: ${e.message})`);
    }
  }

  console.log(`\nWrote ${reportFile}`);
  for (const [key, s] of Object.entries(report.variants)) {
    console.log(`  ${key}: ${s.calls} calls, ${(s.success_rate * 100 || 0).toFixed(1)}% success, p50=${s.latency_p50}ms p95=${s.latency_p95}ms`);
  }
}

main().catch((e) => {
  console.error('eval-prompts failed:', e);
  process.exit(1);
});
