# System Report

**AI-curated tech news aggregation and synthesis** — a fully automated, zero-touch editorial pipeline.

Live: [systemreport.net](https://systemreport.net)

---

## Architecture

```
RSS Feeds (8 sources)
       │
       ▼
GitHub Actions (hourly cron)
       │
       ▼
Node.js ETL Pipeline
  ├─ Sanitize & deduplicate
  ├─ Gemini API (semantic clustering)
  ├─ Gemini API (article synthesis)
  └─ Pollinations/Unsplash (hero images)
       │
       ▼
Git commit → Cloudflare Pages auto-deploy
       │
       ▼
Static site (Astro + Tailwind CSS v4)
  ├─ Pagefind search
  ├─ Sitemap + RSS feed
  └─ Sveltia CMS at /admin
```

**Zero servers. Zero databases. Zero attack surface.**

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro.js v6 (Static Site Generation) |
| Styling | Tailwind CSS v4 (Vite plugin) |
| AI Engine | Google Gemini 2.5 Flash |
| Search | Pagefind (client-side, indexed at build) |
| CMS | Sveltia CMS (Git-backed, GitHub OAuth) |
| CI/CD | GitHub Actions (hourly cron) |
| Hosting | Cloudflare Pages (global edge CDN) |
| Analytics | Cloudflare Web Analytics (cookie-free) |
| Ads | Google AdSense (optional) |

## Project Structure

```
├── src/
│   ├── components/        # 11 Astro components
│   │   ├── AdUnit.astro
│   │   ├── ArticleCard.astro
│   │   ├── DarkModeToggle.astro
│   │   ├── MobileMenu.astro
│   │   ├── NewsletterSignup.astro
│   │   ├── Pagination.astro
│   │   ├── RelatedPosts.astro
│   │   ├── SearchModal.astro
│   │   ├── ShareButtons.astro
│   │   └── TagPill.astro
│   ├── content/posts/     # Markdown articles (auto-generated + manual)
│   ├── layouts/Layout.astro
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro         # About page
│   │   ├── privacy.astro       # Privacy policy
│   │   ├── 404.astro           # Custom 404
│   │   ├── rss.xml.js          # RSS feed
│   │   ├── page/[page].astro   # Paginated archives
│   │   ├── posts/[slug].astro  # Article pages
│   │   └── tags/               # Tag cloud + filtered views
│   └── styles/global.css       # Tailwind v4 design system
├── scripts/ingest.js           # ETL pipeline
├── functions/api/              # Cloudflare Pages Functions (OAuth)
├── public/
│   ├── admin/                  # Sveltia CMS
│   ├── _headers                # Security headers
│   └── favicon.svg
└── .github/workflows/automate.yml
```

## Setup

### Prerequisites

- Node.js 22+
- A GitHub account
- A [Google AI API key](https://aistudio.google.com/apikey) (free tier)

### Local Development

```bash
npm install
npm run dev
```

### Environment Variables

#### GitHub Actions Secrets (for the ETL pipeline)

| Variable | Required | Purpose |
|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `UNSPLASH_ACCESS_KEY` | No | Unsplash API key (image fallback) |

#### Cloudflare Pages Environment Variables (for CMS OAuth)

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_CLIENT_ID` | Yes | GitHub OAuth App client ID |
| `GITHUB_CLIENT_SECRET` | Yes | GitHub OAuth App client secret |

### Deployment

1. Push to GitHub (public repo recommended for free Actions minutes)
2. Connect the repo to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Build command: `npm run build`
   - Output directory: `dist`
3. Set environment variables in Cloudflare dashboard
4. Create a [GitHub OAuth App](https://github.com/settings/developers):
   - Homepage URL: `https://systemreport.net`
   - Callback URL: `https://systemreport.net/api/callback`
5. Update `public/admin/config.yml` with your GitHub repo path
6. Set DNS: point `systemreport.net` to Cloudflare Pages

### Enable AdSense (Optional)

1. Uncomment the AdSense script in `src/layouts/Layout.astro`
2. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
3. Replace ad slot IDs in `AdUnit.astro` components

## ETL Pipeline

The pipeline (`scripts/ingest.js`) runs every hour via GitHub Actions:

1. **Fetch** — Pulls RSS from 8 tech publications (Wired, TechCrunch, The Verge, Ars Technica, Hacker News, Engadget, 9to5Google, 9to5Mac)
2. **Sanitize** — Strips HTML to prevent XSS, deduplicates against `processed_urls.json`
3. **Cluster** — Gemini groups similar stories into semantic clusters
4. **Synthesize** — Gemini writes original editorial articles from each cluster
5. **Illustrate** — Pollinations.ai generates hero images (Unsplash fallback)
6. **Commit** — Writes Markdown files, commits, and pushes to trigger rebuild

## Content Management

Access the CMS at `/admin` (requires GitHub OAuth). The CMS provides:

- Rich Markdown editor
- Editorial workflow (draft → review → publish)
- Image uploads to `public/images/uploads/`
- Tag management
- Year-based article grouping

## License

MIT
