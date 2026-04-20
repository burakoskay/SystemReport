import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  date: z.string().or(z.date()).transform((val) => new Date(val)),
  modified_date: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
  tags: z.array(z.string()).optional(),
  hero_image: z.string().optional(),
  hero_image_credit_name: z.string().optional(),
  hero_image_credit_url: z.string().optional(),
  visual_keyword: z.string().optional(),
  description: z.string().optional(),
  sources_count: z.number().optional(),
  audio_path: z.string().optional(),
  audio_bytes: z.number().optional(),
  author: z.string().optional(),
  locale: z.string().optional(),
  canonical_slug: z.string().optional(),
  corrections: z.array(z.object({ date: z.string(), note: z.string() })).optional(),
  // Long-form opinion pieces (Elena's daily). Opts into a distinct layout:
  // EDITORIAL eyebrow, dek, drop cap, numbered section markers, footnote block.
  format: z.enum(['standard', 'editorial']).optional(),
  // Subtitle / dek shown under the headline for editorial pieces.
  dek: z.string().optional(),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: postSchema,
});

// Translated posts live in src/content/posts-i18n/<locale>/<slug>.md.
// Single collection, locale field on each entry, per-locale routing built on top.
const postsI18nCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts-i18n" }),
  schema: postSchema,
});

export const collections = {
  'posts': postsCollection,
  'posts-i18n': postsI18nCollection,
};
