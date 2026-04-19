import fs from 'fs';
import path from 'path';
import { assignAuthor } from '../src/lib/authors.mjs';

const dir = 'src/content/posts';
let n = 0, skipped = 0;
for (const f of fs.readdirSync(dir)) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  if (/^author:\s/m.test(s)) { skipped++; continue; }
  const tagsM = s.match(/^tags:\s*\[(.*?)\]/m);
  const tags = tagsM ? tagsM[1].split(',').map(x => x.replace(/["\s]/g, '').toLowerCase()).filter(Boolean) : [];
  const a = assignAuthor(tags, 'tech', f);
  // Insert author line after sources_count (common anchor) or after description.
  if (/^sources_count:/m.test(s)) {
    s = s.replace(/(^sources_count:.*$)/m, `$1\nauthor: "${a.slug}"`);
  } else {
    s = s.replace(/^(description:.*)$/m, `$1\nauthor: "${a.slug}"`);
  }
  fs.writeFileSync(p, s);
  n++;
}
console.log(`backfilled ${n}, skipped ${skipped}`);
