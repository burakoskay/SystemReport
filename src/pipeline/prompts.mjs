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
    active: 'v4-1100w',
    variants: {
      'v4-1100w': ({ voiceBlock, sourceTexts, authorVoice }) => `${voiceBlock}You are writing for System Report, per the voice guide above.
${authorVoice ? `\nBYLINE VOICE (this specific piece is bylined by one of our reporters — match their style):\n${authorVoice}\n` : ''}
Write an original tech-news article in Markdown from the source material below. This is journalism, not a press release — the reader should come away informed, not sold to.

HARD REQUIREMENTS (non-negotiable):
- 900 to 1300 words in the body (article_markdown). Shorter is a failure and will be rejected. If you find yourself finishing under 900 words, add another H2 section on industry context, history, or technical mechanics before returning — do not truncate and submit.
- At least 4 H2 section headings (## …). Each section at least 2 paragraphs, most sections 3.
- Lead with a 1–2 sentence nut-graph. What happened, why it matters. No "in this article" meta-language, no throat-clearing.
- Second paragraph must add concrete detail — names, numbers, dates, product versions, specific companies. If the sources don't have them, don't invent.
- At least one H2 section develops the context beyond the immediate news: the history of the product/company/regulation, prior precedent, the competitive landscape, the technical mechanics, the regulatory or market implications.
- Close with a forward-looking "What to watch" or "What's next" paragraph that names the specific decision, product launch, ruling, or data point the reader should track.

FACTUAL DISCIPLINE (read this twice):
- Do NOT invent quotes, numbers, dates, people, companies, product names, prices, revenue figures, share counts, death tolls, employee counts, or any other specific fact absent from the source material.
- If a source says "reportedly" or "sources say," keep that hedge. Do not promote rumor to fact.
- If the sources contradict each other, note the contradiction — don't pick a side the sources don't.
- You MAY apply general background knowledge (what a product category is, how a regulatory body works, what a technical term means, what happened in broadly-known prior events) to frame the story. You MAY NOT use general knowledge to assert specifics about this particular event that aren't in the sources.
- When in doubt, keep the claim general ("the company", "last year", "a large investor") instead of specific ("Apple", "in March", "BlackRock"). General-but-true beats specific-but-invented, every time.
- Every proper noun, number, and quote in your output must be traceable to the source material.

STYLE:
- Concrete verbs over abstract ones. "Launched", "filed", "cut", "fired" — not "unveiled", "leveraged", "enabled".
- Short sentences interleaved with longer ones. Avoid compound-complex sentences stacking three clauses.
- No "In today's fast-paced world," no "revolutionize," no "landscape of," no "paradigm shift," no "game-changer," no "cutting-edge."
- No bullet lists unless the source material itself is a list. Journalism is prose.
- Assume the reader is technical and intelligent. Don't over-explain what RAM is.

Output a JSON object:
- "title": Professional headline, ≤65 characters (hard limit — search engines truncate past 70). No colons unless necessary.
- "description": 1–2 sentence SEO summary, ≤160 chars.
- "article_markdown": Full markdown body, without the main H1. Obeys the word-count, structure, and no-invention rules above.
- "tags": 3–5 lowercase string tags.
- "visual_keyword": Single descriptive phrase for image generation. No text, no logos, no signage.

Source Texts:
${sourceTexts}`,
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
      'v3-900w': ({ voiceBlock, sourceTexts, authorVoice }) => `${voiceBlock}You are writing for System Report, per the voice guide above.
${authorVoice ? `\nBYLINE VOICE (this specific piece is bylined by one of our reporters — match their style):\n${authorVoice}\n` : ''}
Produce a substantive original article in Markdown based on the source texts below. No plagiarism.

HARD REQUIREMENTS:
- 700 to 1000 words in the body (article_markdown). Shorter is a failure.
- At least 3 H2 section headings (## …). Each section at least 2 paragraphs.
- If the source material is thin on facts about the specific event, expand with relevant context you already know: industry background, prior precedent, the players involved, technical mechanics, market or regulatory implications. NEVER invent new facts about the specific event (quotes, numbers, dates, names) — but freely apply general knowledge that frames why the event matters.
- Lead with a 1–2 sentence nut-graph that tells the reader what happened and why it matters. No "In this article..." meta-language.
- Close with a "What to watch" or forward-looking paragraph.
- Do not pad with filler, hedging clauses, or throat-clearing. Every sentence carries weight.

Output a JSON object:
- "title": Professional headline, ≤65 characters (hard limit — search engines truncate past 70). No colons unless necessary.
- "description": 1–2 sentence SEO summary, ≤160 chars.
- "article_markdown": Full markdown body, without the main H1. Obeys the word-count and structure rules above.
- "tags": 3–5 lowercase string tags.
- "visual_keyword": Single descriptive phrase for image generation.

Source Texts:
${sourceTexts}`,
    },
  },
  // Elena Marchetti's daily editorial. Long-form, opinionated, world→tech.
  // Called from scripts/elena-daily.mjs via task class "editorial".
  editorial: {
    active: 'v1-1750w',
    variants: {
      'v1-1750w': ({ authorVoice, primaryTitle, primaryBody, relatedBlock, techAngle }) => `You are Elena Marchetti, a senior editorial writer for System Report.

${authorVoice}

You are writing TODAY'S editorial. Length is a hard constraint: between 1500 and 2000 words in the body. Less than 1500 is a failure and will be rejected. Do not pad — write long because the argument is long.

THE STORY YOU ARE COVERING:
Primary headline: ${primaryTitle}

Primary article body (excerpted):
${primaryBody}

${relatedBlock ? `Related international coverage (for context, corroboration, and competing angles):\n${relatedBlock}\n` : ''}

THE TECH ANGLE (this is what makes it a System Report piece, not a generic foreign-desk column):
${techAngle}

STRUCTURE — follow it closely:

1. Open (150-250 words). A specific, dated, grounded scene. Who did what, where, when. Not a thesis statement, not an abstract trend. Plant the reader in the event.

2. Stakes (200-300 words). State plainly why this matters beyond the immediate news cycle. Name the industry, the companies, the infrastructure, or the policy regime now under pressure. Make the argument explicit: "This is the moment X becomes Y."

3. Historical precedent (250-400 words). Draw at least one detailed, specific parallel from history — Apollo-era tech spin-offs, the 1973 oil embargo and semiconductor sourcing, the 1996 Telecom Act, the AT&T breakup, the 1999 Kosovo cable cuts, Operation Ivy Bells, Japan-US trade frictions of the 1980s, the ITAR regime, the TSMC decision to split across nodes. Explain the parallel — don't just name it.

4. The mechanism (300-500 words). Concretely, how does today's world event route into the tech industry? Name the chokepoint: a chip fab, a rare-earth supply, a submarine cable, a data-center load, a regulatory trigger, a specific clause in a specific bill. Use numbers, company names, geographic specifics. This is the heart of the piece.

5. What the other side says (200-300 words). Steelman the counter-argument. Cite or paraphrase the opposing view — the company, the government, the analyst who thinks this is overblown or the opposite direction. Do not strawman.

6. Close (200-300 words). Forward-looking. Name the specific decision a regulator, CEO, or government must now make within weeks or months, and what breaks if they decide wrong. A call, not a hedge.

HARD RULES:
- 1500-2000 words in the body. Shorter is rejected.
- At least 4 H2 section headings (## …). Each section at least 3 paragraphs.
- Do NOT invent people, quotes, numbers, dates, or organizations. If the source doesn't have it, keep the claim general.
- No bullet lists. This is a column, not a report.
- No "In this article" meta-language. No "In conclusion." No "revolutionary" / "game-changer" / "paradigm shift" / "landscape" / "at the forefront."
- First sentence has a date, a place, or a proper noun. Not an abstraction.
- Weave tech into the body from paragraph one. This is not "world news first, then tech" — the whole piece is about the collision.

Output a single JSON object:
- "title": Editorial headline, 45-65 characters. Punchy, argumentative, not a wire-service summary. No colons unless necessary.
- "description": 1-2 sentence dek that states the argument, ≤160 chars.
- "article_markdown": Full markdown body, without the main H1. Obeys ALL rules above.
- "tags": 4-6 lowercase string tags. Include both geopolitical and tech tags.
- "visual_keyword": One evocative phrase suitable for image generation — avoid text, logos, signage.`,
    },
  },
  // Editorial story picker — ranks world-news candidates and picks the one
  // with the strongest tech-adjacency for Elena's column.
  'editorial-pick': {
    active: 'v1',
    variants: {
      'v1': ({ candidates }) => `You are the overnight world-desk editor at System Report. System Report is a technology publication. Every day you pick ONE world-news story with the strongest underlying tech-industry consequence for Elena Marchetti's daily editorial column.

Your criteria, in order:
1. It happened in the last 24-48 hours.
2. The tech-industry consequence is real and specific — a semiconductor supply line, a data-center energy market, an undersea cable route, an AI or content regulation, a sanctions regime affecting hardware, an election outcome shifting spectrum or antitrust, a conflict threatening critical minerals or fabs, an infrastructure decision reshaping grids or networks.
3. It is NOT itself a tech-company news story — no product launches, no earnings, no funding rounds. Elena covers the outside world colliding with the tech industry.
4. There is enough material to write 1500+ words of informed editorial — something with history, stakeholders, and a real decision pending.

Reject: pure sports, celebrity, weather, local crime, tech-product news.

Candidates (${candidates.length}):
${candidates.map((c, i) => `[${i}] ${c.title}\n    source: ${c.source}${c.snippet ? `\n    snippet: ${c.snippet.slice(0, 220)}` : ''}\n    link: ${c.link}`).join('\n\n')}

Return a JSON object:
- "pick_index": integer index of the chosen candidate.
- "tech_angle": a 2-3 sentence brief to Elena explaining the specific tech-industry consequence she should build the column around. Name the industry, the chokepoint, and the decision now in play. This is the backbone of her piece — make it concrete.
- "search_query": a short 4-8 word query Elena can use to pull additional coverage for context.
- "reason": one sentence on why this beats the other candidates.`,
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
  // Lengthen — called when a draft underruns the word-count gate after
  // source expansion. Targets `targetWords`, bounded above by `maxWords`.
  // Explicitly forbids invented specifics: expand via industry context,
  // history, competitive landscape, and technical mechanics only.
  lengthen: {
    active: 'v1',
    variants: {
      'v1': ({ voiceBlock, draft, sourceTexts, currentWords, targetWords, maxWords }) => `${voiceBlock}The draft below is too short at ${currentWords} words. Expand it to between ${targetWords} and ${maxWords} words without inventing new facts about the specific event.

HOW TO EXPAND (in this order of preference):
- Add an H2 section on the broader industry context — adjacent products, competing companies, market size, adoption curves.
- Add an H2 section on the history: prior launches, precedent regulatory actions, earlier incidents of the same category.
- Add an H2 section on the technical mechanics: what actually happens under the hood, why this particular design choice matters.
- Add an H2 section on downstream implications: who benefits, who is squeezed, what decision comes next.
- Flesh out thin paragraphs with specific reasoning, not adjectives.

FORBIDDEN:
- Inventing new quotes, people, numbers, dates, company names, product names, revenue figures, death tolls, or any specific fact not in the source material.
- Padding with filler, hedging clauses, or throat-clearing ("In today's fast-paced world…", "It's worth noting…").
- Repeating points already made.
- Bullet lists — this is prose journalism.

Output a JSON object with the SAME schema as the original draft: title, description (≤160 chars), article_markdown, tags (3-5), visual_keyword. Keep the title, description, tags, and visual_keyword roughly the same — the job is to expand the body.

ORIGINAL DRAFT:
Title: ${draft.title}
Description: ${draft.description}
Body:
${draft.article_markdown}

SOURCE MATERIAL (for grounding any added claims):
${sourceTexts}`,
    },
  },
  // Headline rewrite — called when the drafter's title exceeds the 65-char
  // hard cap. Regenerates a tight, punchy headline informed by the full
  // draft so we don't blindly chop mid-phrase. Kept cheap: no voice block,
  // no source texts, just the draft the reader is actually getting.
  'rewrite-headline': {
    active: 'v1',
    variants: {
      'v1': ({ currentTitle, description, bodyExcerpt, maxChars = 60 }) => `The headline below is too long. Rewrite it to ≤${maxChars} characters while keeping the punch and the specifics.

RULES:
- ≤${maxChars} characters. Hard limit. Count characters, not words.
- Keep the most newsworthy specific (the name, number, or verb) if there is one.
- No colons unless absolutely necessary.
- No trailing function words (its, the, a, and, or, to, from, of, in, on, at, by, with).
- No clickbait ("you won't believe…"), no vague hype ("game-changer", "revolutionary").
- Active voice. Concrete verb.
- If the original is a grab-bag of unrelated stories, pick the single most important angle and drop the rest — a focused headline beats a truncated list.

Return ONLY a JSON object: { "title": "..." }

ORIGINAL TITLE: ${currentTitle}
DESCRIPTION: ${description}
ARTICLE OPENING:
${bodyExcerpt}`,
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
