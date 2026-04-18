// Chaos test: injects synthetic provider failures and asserts that the
// router still produces successful completions via failover.
//
// Run locally:   GROQ_API_KEY=... node scripts/chaos-test.js
// CI (optional): kept off the hot path because it spends real quota.
//
// Default: 20 calls at 50% synthetic failure rate. Pass if ≥ 70% succeed —
// the router should pick up survivors from later providers.

import dotenv from 'dotenv';
import { routeCall } from '../src/pipeline/router.mjs';

dotenv.config();

const N = parseInt(process.env.CHAOS_N || '20', 10);
const RATE = process.env.CHAOS_FAIL_RATE || '0.5';
const MIN_SUCCESS_RATE = parseFloat(process.env.CHAOS_MIN_SUCCESS || '0.7');

process.env.CHAOS_FAIL_RATE = RATE;

const PROMPT = 'Reply with the single word "ok" and nothing else.';

let ok = 0;
let fail = 0;
const startedAll = Date.now();

console.log(`Chaos: ${N} calls at fail-rate=${RATE}, threshold=${MIN_SUCCESS_RATE * 100}%`);

for (let i = 1; i <= N; i++) {
  try {
    const r = await routeCall({ task: 'headline', prompt: PROMPT, timeoutMs: 30000 });
    ok++;
    console.log(`  [${i}/${N}] ✓ ${r.provider}/${r.model}: ${r.text.trim().slice(0, 40)}`);
  } catch (e) {
    fail++;
    console.log(`  [${i}/${N}] ✗ ${e.message.slice(0, 140)}`);
  }
}

const rate = ok / N;
const dur = Math.round((Date.now() - startedAll) / 1000);
console.log(`\nChaos complete in ${dur}s: ${ok}/${N} succeeded (${(rate * 100).toFixed(0)}%), ${fail} failed.`);

if (rate < MIN_SUCCESS_RATE) {
  console.error(`✗ Below threshold ${MIN_SUCCESS_RATE * 100}%. Failover not robust enough.`);
  process.exit(1);
}
console.log(`✓ Above threshold. Failover holding under chaos.`);
