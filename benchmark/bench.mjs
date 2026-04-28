import fs from 'fs/promises';
import path from 'path';

// Let's copy the loadSeenUrls logic exactly as it is now
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
    const jsonlFiles = files.filter(x => x.endsWith('.jsonl'));
    const contents = await Promise.all(
      jsonlFiles.map(f => fs.readFile(path.join(LOG_DIR, f), 'utf-8').catch(() => null))
    );

    for (const raw of contents) {
      if (!raw) continue;
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

async function setup() {
  await fs.rm(LOG_DIR, { recursive: true, force: true });
  await fs.mkdir(LOG_DIR, { recursive: true });

  for (let i = 0; i < 200; i++) {
    const lines = [];
    for (let j = 0; j < 500; j++) {
      lines.push(JSON.stringify({
        ts: new Date().toISOString(),
        destination: ['bluesky', 'mastodon', 'telegram'][j % 3],
        url: `https://example.com/post/${i}-${j}`,
        ok: j % 10 !== 0
      }));
    }
    await fs.writeFile(path.join(LOG_DIR, `log-${i}.jsonl`), lines.join('\n') + '\n');
  }
}

async function run() {
  await setup();
  console.log("Setup complete");

  // Warmup
  await loadSeenUrlsSeq('bluesky');
  await loadSeenUrlsPar('bluesky');

  const runs = 5;

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
  console.log(`Parallel: ${(parTime / runs).toFixed(2)} ms`);
}

run();
