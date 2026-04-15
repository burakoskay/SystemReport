// One-time repair script: fetch Pexels images for all existing articles.
// Reads PEXELS_API_KEY from .env.local automatically.
//
// Usage: node scripts/fix-images.js

import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');

async function fetchPexelsImage(visualKeyword, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(visualKeyword)}&orientation=landscape&per_page=1`,
        { headers: { Authorization: process.env.PEXELS_API_KEY } }
      );

      if (res.status === 429) {
        const wait = attempt * 5000;
        console.log(`  Rate limited. Waiting ${wait / 1000}s...`);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }

      if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);

      const data = await res.json();
      if (!data.photos?.length) throw new Error(`No results for: ${visualKeyword}`);

      const photo = data.photos[0];
      return {
        url: photo.src.landscape,
        creditName: photo.photographer,
        creditUrl: photo.photographer_url,
      };
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((r) => setTimeout(r, 2000 * attempt));
    }
  }
}

async function main() {
  if (!process.env.PEXELS_API_KEY) {
    console.error('Error: PEXELS_API_KEY is not set in .env.local');
    process.exit(1);
  }

  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'));
  console.log(`Found ${files.length} articles.\n`);

  let fixed = 0;
  let skipped = 0;

  for (const file of files) {
    const fp = path.join(POSTS_DIR, file);
    let content = await fs.readFile(fp, 'utf-8');

    // Extract visual_keyword
    const kwMatch = content.match(/visual_keyword:\s*"([^"]+)"/);
    if (!kwMatch) {
      console.log(`Skip (no visual_keyword): ${file}`);
      skipped++;
      continue;
    }

    const visualKeyword = kwMatch[1];
    console.log(`Fetching: "${visualKeyword}"`);

    try {
      const image = await fetchPexelsImage(visualKeyword);

      // Replace hero_image block (remove any existing credit lines first, then rewrite)
      content = content.replace(/hero_image:\s*"[^"]*"\n(hero_image_credit_name:[^\n]*\nhero_image_credit_url:[^\n]*\n)?/, '');
      content = content.replace(
        /(visual_keyword:)/,
        `hero_image: "${image.url}"\nhero_image_credit_name: "${image.creditName.replace(/"/g, '\\"')}"\nhero_image_credit_url: "${image.creditUrl}"\n$1`
      );

      await fs.writeFile(fp, content, 'utf-8');
      console.log(`  ✓ ${image.creditName}`);
      fixed++;

      // Space requests to be a good API citizen
      await new Promise((r) => setTimeout(r, 1200));
    } catch (err) {
      console.error(`  ✗ ${err.message}`);
    }
  }

  console.log(`\nDone. Fixed: ${fixed}, Skipped: ${skipped}`);
}

main().catch(console.error);
