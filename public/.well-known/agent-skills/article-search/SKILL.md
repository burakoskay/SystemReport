# Article Search

Search and retrieve tech news articles from [System Report](https://www.systemreport.net).

## Endpoints

### Full Article Index

```
GET https://www.systemreport.net/data/posts.json
```

Returns a JSON object with all published articles:

```json
{
  "_schema_version": 1,
  "generated_at": "2026-04-25T12:00:00Z",
  "count": 500,
  "items": [
    {
      "slug": "2026-04-25-example-article",
      "url": "https://www.systemreport.net/posts/2026-04-25-example-article",
      "title": "Article Title",
      "description": "Brief summary of the article",
      "date": "2026-04-25T10:00:00Z",
      "tags": ["ai", "machine-learning"],
      "hero_image": "https://www.systemreport.net/hero/example.jpg",
      "audio_path": "https://www.systemreport.net/audio/example.mp3",
      "sources_count": 5,
      "story_url": "https://www.systemreport.net/stories/2026-04-25-example-article"
    }
  ]
}
```

### Streaming NDJSON

```
GET https://www.systemreport.net/data/clusters.jsonl
```

Returns one JSON object per line. Smaller payload, suitable for streaming and incremental processing.

### RSS Feed (full content)

```
GET https://www.systemreport.net/rss.xml
```

RSS 2.0 with `content:encoded` (full HTML body), `media:content` (hero image), and `dc:creator` (byline). Latest 50 articles.

### JSON Feed

```
GET https://www.systemreport.net/feed.json
```

JSON Feed 1.1 with article summaries, tags, and images.

## Filtering

The JSON endpoints return all articles sorted by date (newest first). To filter:
- **By tag**: Check the `tags` array on each item
- **By date range**: Compare the `date` field (ISO 8601)
- **By category**: Tags map to categories — `ai`, `gaming`, `hardware`, `software`, `tech`

## Rate Limits

All endpoints are served from Cloudflare's edge CDN with a 5-minute cache TTL. No authentication required. No rate limits beyond standard Cloudflare protections.

## Languages

Articles are available in 11 languages. Translated versions are at `/{locale}/posts/{slug}` where locale is one of: `tr`, `es`, `fr`, `de`, `ja`, `zh-CN`, `ko`, `pt`, `it`, `ar`.
