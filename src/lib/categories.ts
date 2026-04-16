export interface Category {
  label: string;
  keywords: string[];
}

export const CATEGORIES: Record<string, Category> = {
  ai: {
    label: 'AI',
    keywords: [
      'ai', 'artificial intelligence', 'machine learning', 'llm', 'chatgpt', 'openai',
      'gemini', 'gpt', 'neural', 'deep learning', 'generative', 'large language model',
      'claude', 'copilot', 'midjourney', 'siri', 'alexa', 'diffusion model', 'stable diffusion',
      'computer vision', 'natural language', 'model', 'inference',
    ],
  },
  gaming: {
    label: 'Gaming',
    keywords: [
      'gaming', 'game', 'playstation', 'xbox', 'nintendo', 'steam', 'esports', 'ps plus',
      'game pass', 'console', 'pc gaming', 'ps5', 'game studio', 'video game', 'multiplayer',
      'vr gaming', 'game developer', 'indie game',
    ],
  },
  hardware: {
    label: 'Hardware',
    keywords: [
      'hardware', 'chip', 'semiconductor', 'processor', 'gpu', 'cpu', 'smartphone', 'laptop',
      'iphone', 'tablet', 'display', 'oled', 'device', 'wearable', 'headset', 'camera',
      'drone', 'ev', 'electric vehicle', 'battery', 'apple silicon', 'qualcomm', 'arm',
      'folding', 'foldable', 'earbuds', 'smartwatch',
    ],
  },
  software: {
    label: 'Software',
    keywords: [
      'software', 'app', 'ios', 'android', 'windows', 'macos', 'linux', 'browser',
      'operating system', 'saas', 'platform', 'api', 'open source', 'update', 'patch',
      'security update', 'firmware', 'web app', 'mobile app',
    ],
  },
  tech: {
    label: 'Tech',
    keywords: [], // catch-all
  },
};

// Priority order: ai > gaming > hardware > software > tech
const PRIORITY = ['ai', 'gaming', 'hardware', 'software'] as const;

export function getArticleCategory(tags: string[]): string {
  if (!tags?.length) return 'tech';
  const lowerTags = tags.map(t => t.toLowerCase());

  for (const key of PRIORITY) {
    const { keywords } = CATEGORIES[key];
    if (keywords.some(kw => lowerTags.some(t => t.includes(kw) || kw.includes(t)))) {
      return key;
    }
  }

  return 'tech';
}

export const NAV_CATEGORIES = [
  { slug: 'tech',     label: 'Tech'     },
  { slug: 'gaming',   label: 'Gaming'   },
  { slug: 'ai',       label: 'AI'       },
  { slug: 'software', label: 'Software' },
  { slug: 'hardware', label: 'Hardware' },
] as const;
