import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()).transform((val) => new Date(val)),
    tags: z.array(z.string()).optional(),
    hero_image: z.string().optional(),
    hero_image_credit_name: z.string().optional(),
    hero_image_credit_url: z.string().optional(),
    visual_keyword: z.string().optional(),
    description: z.string().optional(),
    sources_count: z.number().optional(),
    audio_path: z.string().optional(),
    audio_bytes: z.number().optional(),
  }),
});

export const collections = {
  'posts': postsCollection,
};
