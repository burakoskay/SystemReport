import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'benchmark/test-logs');

async function loadSeenUrlsSeq(destination) {
  const seen = new Set();
  try {
    const files = await fs.readdir(LOG_DIR);
    for (const f of files.filter(x => x.endsWith('.jsonl'))) {
      const raw = await fs.readFile(path.join(LOG_DIR, f), 'utf-8');
      for (const line of raw.split('\n').filter(Boolean)) {
        try {
          const j = JSON.parse(line);
          if (j.destination === destination && j.ok) seen.add(j.url);
        } catch {}
      }
    }
  } catch {}
  return seen;
}

async function loadSeenUrlsPar(destination) {
  const seen = new Set();
  try {
    const files = await fs.readdir(LOG_DIR);
    await Promise.all(
      files.filter(x => x.endsWith('.jsonl')).map(async (f) => {
        const raw = await fs.readFile(path.join(LOG_DIR, f), 'utf-8');
        for (const line of raw.split('\n').filter(Boolean)) {
          try {
            const j = JSON.parse(line);
            if (j.destination === destination && j.ok) seen.add(j.url);
          } catch {}
        }
      })
    );
  } catch {}
  return seen;
}

async function run() {
  const runs = 5;

  // Warmup
  await loadSeenUrlsSeq('bluesky');
  await loadSeenUrlsPar('bluesky');

  let seqTime = 0;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    await loadSeenUrlsSeq('bluesky');
    seqTime += performance.now() - start;
  }
  console.log(`Sequential: ${(seqTime / runs).toFixed(2)} ms`);

  let parTime = 0;
  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    await loadSeenUrlsPar('bluesky');
    parTime += performance.now() - start;
  }
  console.log(`Parallel (inline parse): ${(parTime / runs).toFixed(2)} ms`);
}

run();
