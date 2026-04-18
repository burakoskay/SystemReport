// Versioned prompt registry. Every prompt the pipeline uses is defined here
// with an id, a current variant, and the variant body. The router records
// which prompt id+variant served each call (via telemetry), so a nightly
// eval can A/B prompt variants on real production output.
//
// To add a variant:
//   1. Add a new entry under `variants` for that prompt id.
//   2. Update `active` if it's the new default, OR rely on PROMPT_VARIANT_<ID>
//      env var to A/B-route a fraction of traffic.
//
// Variants are functions (ctx) → string so the prompt can interpolate
// per-call data without duplicating the surrounding boilerplate.

export const PROMPTS = {
  draft: {
    active: 'v2-800w',
    variants: {
      'v1-400w': ({ voiceBlock, sourceTexts }) => `${voiceBlock}You are writing for System Report, per the voice guide above.
Synthesize a 400-word original article in Markdown based on the source texts below. No plagiarism.

Output JSON: { "title", "description" (≤160 chars), "article_markdown", "tags" (3-5), "visual_keyword" }.

Source Texts:
${sourceTexts}`,
      'v2-800w': ({ voiceBlock, sourceTexts }) => `${voiceBlock}You are writing for System Report, per the voice guide above.
Synthesize an 800-word original article in Markdown based on the source texts below. No plagiarism.

You must output a JSON object containing:
- "title": A catchy, professional headline (no colons unless absolutely needed).
- "description": A compelling 1-2 sentence summary suitable for SEO meta descriptions and article previews (max 160 characters).
- "article_markdown": The full markdown body of the article (without main # title, just the content).
- "tags": An array of 3-5 relevant lowercase string tags.
- "visual_keyword": A single, highly descriptive keyword or short phrase suitable for an image generation prompt.

Source Texts:
${sourceTexts}`,
    },
  },
  revise: {
    active: 'v2-800w',
    variants: {
      'v2-800w': ({ voiceBlock, issues, draft, sourceTexts }) => `${voiceBlock}Revise the draft below to fix every issue the editor flagged. Keep the same structure and approximate length (800 words). Adhere to the voice guide.

Return a JSON object with the SAME schema as the original draft: title, description (≤160 chars), article_markdown, tags (3-5), visual_keyword.

ISSUES TO FIX:
${issues.map(s => `- ${s}`).join('\n')}

ORIGINAL DRAFT:
Title: ${draft.title}
Description: ${draft.description}
Body:
${draft.article_markdown}

SOURCE MATERIAL (for fact-fixing):
${sourceTexts}`,
    },
  },
};

// Returns { id, variant, render } for a prompt id. If
// `PROMPT_VARIANT_<UPPER_ID>` env is set and exists, that wins (A/B test
// override). Otherwise the registry's `active` variant is used.
export function selectPrompt(id) {
  const reg = PROMPTS[id];
  if (!reg) throw new Error(`Unknown prompt id: ${id}`);
  const envOverride = process.env[`PROMPT_VARIANT_${id.toUpperCase()}`];
  const variant = (envOverride && reg.variants[envOverride]) ? envOverride : reg.active;
  return {
    id,
    variant,
    render: (ctx) => reg.variants[variant](ctx),
  };
}
