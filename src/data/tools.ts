// Tool registry. The /tools index page reads from this; each tool has its
// own page under src/pages/tools/<slug>.astro. Adding a new tool is two
// files (page + entry here) plus a nav link update.

export type ToolStatus = 'live' | 'coming-soon';

export interface Tool {
  slug: string;
  title: string;
  // Short pitch shown in the tools grid card. Keep under 90 chars.
  tagline: string;
  // Longer description used in meta tags and schema.org when the tool's own
  // page hasn't been opened yet.
  description: string;
  // Broad category for filtering as the catalogue grows.
  category: 'Privacy' | 'Developer' | 'AI' | 'Design' | 'Network';
  status: ToolStatus;
  // Inline SVG path (Heroicons 24/outline) used on the card.
  iconPath: string;
  // Keywords that the page targets in search + LLM answer retrieval.
  keywords: string[];
}

export const TOOLS: Tool[] = [
  {
    slug: 'exif-stripper',
    title: 'EXIF Metadata Remover',
    tagline: 'Strip GPS, camera, and timestamp data from photos — in your browser.',
    description:
      'Free, private EXIF metadata remover. Removes GPS coordinates, camera model, serial numbers, ' +
      'and timestamps from JPEG, PNG, and WebP images. Runs entirely in your browser — your files ' +
      'never upload anywhere.',
    category: 'Privacy',
    status: 'live',
    iconPath:
      'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
    keywords: [
      'remove exif data',
      'strip metadata from photos',
      'exif remover',
      'image metadata remover',
      'remove gps from photo',
      'clean photo metadata',
    ],
  },
  // Future tools slot in here. Examples already scoped:
  //   - llm-memory-calculator   (AI)
  //   - token-counter           (AI)
  //   - regex-tester            (Developer)
];
