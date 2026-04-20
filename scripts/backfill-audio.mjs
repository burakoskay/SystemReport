// One-shot: synthesize narration for every post missing audio_path and
// patch the frontmatter to point at the generated file.
//
// Run with: node scripts/backfill-audio.mjs
// Optional env:
//   BACKFILL_LIMIT=N   stop after N successful files (default: all)
//   BACKFILL_DRY=1     list targets without calling TTS
//
// Safe to re-run: skips posts whose frontmatter already has audio_path.

import fs from 'fs/promises';
import path from 'path';
import { synthesizeSpeech, markdownToSpeechText } from '../src/pipeline/tts.mjs';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const I18N_DIR  = path.join(process.cwd(), 'src/content/posts-i18n');
const AUDIO_DIR = path.join(process.cwd(), 'public/audio');

const LIMIT = parseInt(process.env.BACKFILL_LIMIT || '0', 10) || Infinity;
const DRY   = process.env.BACKFILL_DRY === '1';

function splitFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  return { fm: m[1], body: m[2] };
}

function getField(fm, key) {
  const re = new RegExp(`^${key}:\\s*(?:"([^"]*)"|(.+))$`, 'm');
  const m = fm.match(re);
  if (!m) return '';
  return (m[1] ?? m[2] ?? '').trim();
}

function hasAudio(fm) {
  return /^audio_path:\s*"?\/audio\//m.test(fm);
}

function insertAudioFields(fm, { audioPath, audioBytes, audioMime }) {
  const block = `audio_path: "${audioPath}"\naudio_bytes: ${audioBytes}\naudio_mime: "${audioMime}"`;
  // Insert after hero_image line if present; else append.
  if (/^hero_image:.*$/m.test(fm)) {
    return fm.replace(/^(hero_image:.*)$/m, `$1\n${block}`);
  }
  return `${fm}\n${block}`;
}

async function patchI18nSiblings(baseSlug, audioFields) {
  try {
    const locales = await fs.readdir(I18N_DIR);
    for (const loc of locales) {
      const file = path.join(I18N_DIR, loc, `${baseSlug}.md`);
      try {
        const src = await fs.readFile(file, 'utf-8');
        const parts = splitFrontmatter(src);
        if (!parts || hasAudio(parts.fm)) continue;
        const newFm = insertAudioFields(parts.fm, audioFields);
        await fs.writeFile(file, `---\n${newFm}\n---\n${parts.body}`);
        console.log(`    ↳ patched i18n/${loc}/${baseSlug}.md`);
      } catch { /* no sibling for this locale */ }
    }
  } catch { /* posts-i18n dir may not exist */ }
}

async function main() {
  await fs.mkdir(AUDIO_DIR, { recursive: true });
  const files = (await fs.readdir(POSTS_DIR)).filter(f => f.endsWith('.md')).sort();

  const targets = [];
  for (const file of files) {
    const full = path.join(POSTS_DIR, file);
    const src = await fs.readFile(full, 'utf-8');
    const parts = splitFrontmatter(src);
    if (!parts) continue;
    if (hasAudio(parts.fm)) continue;
    targets.push({ file, full, src, parts });
  }

  console.log(`Found ${targets.length} post(s) missing audio. DRY=${DRY} LIMIT=${LIMIT === Infinity ? 'none' : LIMIT}`);
  if (DRY) { targets.slice(0, 50).forEach(t => console.log('  •', t.file)); return; }

  let ok = 0, failed = 0;
  for (const t of targets) {
    if (ok >= LIMIT) break;
    const baseSlug = t.file.replace(/\.md$/, '');
    const title = getField(t.parts.fm, 'title');
    const description = getField(t.parts.fm, 'description');
    const speechText = markdownToSpeechText(title, description, t.parts.body);
    if (!speechText || speechText.length < 200) {
      console.log(`  ⚠ ${baseSlug}: body too short — skipping`);
      continue;
    }

    try {
      const out = await synthesizeSpeech(speechText);
      const audioFile = path.join(AUDIO_DIR, `${baseSlug}.${out.ext}`);
      await fs.writeFile(audioFile, out.bytes);

      const audioFields = {
        audioPath: `/audio/${baseSlug}.${out.ext}`,
        audioBytes: out.bytes.length,
        audioMime: out.mime,
      };
      const newFm = insertAudioFields(t.parts.fm, audioFields);
      await fs.writeFile(t.full, `---\n${newFm}\n---\n${t.parts.body}`);
      await patchI18nSiblings(baseSlug, audioFields);

      ok++;
      console.log(`  🔊 [${ok}] ${baseSlug} via ${out.provider} (${(out.bytes.length / 1024).toFixed(0)} KB)`);
    } catch (e) {
      failed++;
      console.error(`  ✗ ${baseSlug}: ${e.message.slice(0, 200)}`);
      // Surface provider-exhaustion early so a huge backfill doesn't silently
      // hammer a dead endpoint for 200 posts.
      if (/quota|429|rate/i.test(e.message) && failed >= 3) {
        console.error('Too many rate/quota errors — stopping. Rerun later.');
        break;
      }
    }
  }

  console.log(`\nDone. Narrated: ${ok}. Failed: ${failed}. Remaining: ${targets.length - ok}.`);
}

main().catch(e => { console.error(e); process.exit(1); });
