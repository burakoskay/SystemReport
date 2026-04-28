import fs from 'fs';
import yaml from 'js-yaml';

try {
  const content = fs.readFileSync('src/content/posts/2026-04-15-ai-s-double-edged-sword-economic-slowdown-masks-targeted-job-displacement-548c9a.md', 'utf8');
  const frontmatter = content.match(/---\n([\s\S]+?)\n---/)[1];
  yaml.load(frontmatter);
  console.log("YAML parses successfully.");
} catch (e) {
  console.error(e);
}
