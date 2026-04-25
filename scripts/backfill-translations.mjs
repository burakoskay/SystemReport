// Backfill: for every English post, generate any missing per-locale translation.
//
// Translation in the hot ETL path is "best effort — never blocks publishing,"
// so locales routinely skip when the router is saturated. Over time this
// leaves a ragged per-locale index (some locales current, some 20 posts
// behind). This script closes that gap without re-running the whole ETL.
//
// Run: node scripts/backfill-translations.mjs
// Env:
//   BACKFILL_LOCALES=tr,es      only these locales (default: all LOCALES)
//   BACKFILL_LIMIT=N            stop after N successful writes (default: all)
//   BACKFILL_DRY=1              list gaps without calling the router

import fs from 'fs/promises';
import path from 'path';
import { translateArticle, LOCALES } from '../src/pipeline/translator.mjs';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const I18N_DIR  = path.join(process.cwd(), 'src/content/posts-i18n');

const LIMIT   = parseInt(process.env.BACKFILL_LIMIT || '0', 10) || Infinity;
const DRY     = process.env.BACKFILL_DRY === '1';
const WANTED  = (process.env.BACKFILL_LOCALES || '').split(',').map(s => s.trim()).filter(Boolean);
const LOC_IDS = WANTED.length ? WANTED.filter(l => LOCALES[l]) : Object.keys(LOCALES);

function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m ? { fm: m[1], body: m[2] } : null;
}
function field(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*(?:"([^"]*)"|(.+))$`, 'm'));
  return m ? (m[1] ?? m[2] ?? '').trim() : '';
}
function rawLine(fm, key) {
  const m = fm.match(new RegExp(`^${key}:[^\\n]*$`, 'm'));
  return m ? m[0] : '';
}

async function main() {
  const files = (await fs.readdir(POSTS_DIR)).filter(f => f.endsWith('.md')).sort();

  // Tally gaps
  const gaps = []; // { file, locale }
  const perLocale = Object.fromEntries(LOC_IDS.map(l => [l, 0]));

  for (const f of files) {
    for (const loc of LOC_IDS) {
      const target = path.join(I18N_DIR, loc, f);
      try { await fs.stat(target); } catch { gaps.push({ file: f, locale: loc }); perLocale[loc]++; }
    }
  }

  console.log(`English posts: ${files.length}. Locales: ${LOC_IDS.join(',')}.`);
  console.log(`Gaps per locale:`, perLocale);
  console.log(`Total gaps: ${gaps.length}. DRY=${DRY} LIMIT=${LIMIT === Infinity ? 'none' : LIMIT}`);
  if (DRY) return;

  let ok = 0, failed = 0;
  // Interleave locales so a one-provider bad day doesn't silently starve one
  // locale while another looks healthy. Process by file, then locale.
  gaps.sort((a, b) => a.file.localeCompare(b.file) || a.locale.localeCompare(b.locale));

  for (const g of gaps) {
    if (ok >= LIMIT) break;
    const enSrc = await fs.readFile(path.join(POSTS_DIR, g.file), 'utf-8');
    const parts = splitFrontmatter(enSrc);
    if (!parts) { failed++; continue; }

    const title = field(parts.fm, 'title');
    const description = field(parts.fm, 'description');
    const body = parts.body;

    try {
      const t = await translateArticle({ title, description, body }, g.locale);

      // Copy hero/audio/tag lines verbatim — they're locale-independent.
      const keepLines = ['date', 'tags', 'hero_image', 'hero_image_credit_name', 'hero_image_credit_url', 'visual_keyword', 'sources_count', 'author', 'audio_path', 'audio_bytes', 'audio_mime']
        .map(k => rawLine(parts.fm, k))
        .filter(Boolean)
        .join('\n');

      const baseSlug = g.file.replace(/\.md$/, '');
      const tFm = [
        `---`,
        `title: "${t.title.replace(/"/g, '\\"')}"`,
        keepLines,
        `description: "${t.description.replace(/"/g, '\\"')}"`,
        `locale: "${g.locale}"`,
        `canonical_slug: "${baseSlug}"`,
        `---`,
        ``,
        t.body,
      ].join('\n');

      const outDir = path.join(I18N_DIR, g.locale);
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, g.file), tFm, 'utf-8');
      ok++;
      console.log(`  🌐 [${ok}] ${g.locale}/${g.file} via ${t._translator}`);
    } catch (e) {
      failed++;
      console.error(`  ✗ ${g.locale}/${g.file}: ${e.message.slice(0, 200)}`);
      if (/quota|cap|exceeded/i.test(e.message) && failed >= 5) {
        console.error('Too many quota errors — stopping. Rerun later.');
        break;
      }
    }
  }

  console.log(`\nDone. Translated: ${ok}. Failed: ${failed}. Remaining: ${gaps.length - ok}.`);
}

main().catch(e => { console.error(e); process.exit(1); });
