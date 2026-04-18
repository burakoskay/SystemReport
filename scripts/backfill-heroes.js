// One-shot: download every existing post's remote hero into public/hero/<slug>.jpg
// and rewrite the frontmatter to point at the local path.
//
// Run with: node scripts/backfill-heroes.js
// Safe to re-run: skips posts whose hero_image already points at a local /hero/ path.

import fs from 'fs/promises';
import path from 'path';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const HERO_DIR  = path.join(process.cwd(), 'public/hero');

async function downloadOne(remoteUrl, slug) {
  const localPath = path.join(HERO_DIR, `${slug}.jpg`);
  const r = await fetch(remoteUrl, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(localPath, buf);
}

function replaceHero(md, webPath) {
  return md.replace(/^hero_image:\s*".*?"/m, `hero_image: "${webPath}"`);
}

async function main() {
  await fs.mkdir(HERO_DIR, { recursive: true });
  const files = (await fs.readdir(POSTS_DIR)).filter(f => f.endsWith('.md'));
  let converted = 0, skipped = 0, failed = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const full = path.join(POSTS_DIR, file);
    const md = await fs.readFile(full, 'utf-8');
    const match = md.match(/^hero_image:\s*"(.+?)"/m);
    if (!match) { skipped++; continue; }
    const current = match[1];
    if (current.startsWith('/hero/')) { skipped++; continue; }

    const webPath = `/hero/${slug}.jpg`;
    try {
      await downloadOne(current, slug);
      await fs.writeFile(full, replaceHero(md, webPath));
      converted++;
      if (converted % 10 === 0) console.log(`  ...${converted} done`);
    } catch (e) {
      console.error(`  ✗ ${slug}: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nBackfill complete: ${converted} converted, ${skipped} skipped, ${failed} failed.`);
}

main().catch((e) => { console.error(e); process.exit(1); });
