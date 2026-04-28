// Distribution fan-out. Posts a link + blurb to each configured destination
// for every newly-published article. Fire-and-forget: one destination failing
// never blocks another.
//
// Secrets (all optional — missing ones silently skip that destination):
//   BLUESKY_IDENTIFIER   e.g. systemreport.bsky.social
//   BLUESKY_APP_PASSWORD  app password (not the account password)
//   MASTODON_INSTANCE    e.g. https://mastodon.social
//   MASTODON_TOKEN       bearer token (write:statuses scope)
//   TELEGRAM_BOT_TOKEN   bot token
//   TELEGRAM_CHAT_ID     channel id (e.g. @systemreport_news or -1001234567)
//
// Posts are idempotent per-URL: the distribution log at
// ops/distribution/YYYY-MM-DD.jsonl records every success so a rerun on the
// same commit won't double-post. A simple set-of-urls-seen check gates each
// call.

import fs from 'fs/promises';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'ops/distribution');

function today() { return new Date().toISOString().slice(0, 10); }

async function loadSeenUrls(destination) {
  const seen = new Set();
  try {
    const files = await fs.readdir(LOG_DIR);
    await Promise.all(
      files.filter(x => x.endsWith('.jsonl')).map(async (f) => {
        try {
          const raw = await fs.readFile(path.join(LOG_DIR, f), 'utf-8');
          for (const line of raw.split('\n').filter(Boolean)) {
            try {
              const j = JSON.parse(line);
              if (j.destination === destination && j.ok) seen.add(j.url);
            } catch {}
          }
        } catch {}
      })
    );
  } catch {}
  return seen;
}

async function logOutcome(record) {
  await fs.mkdir(LOG_DIR, { recursive: true });
  const file = path.join(LOG_DIR, `${today()}.jsonl`);
  await fs.appendFile(file, JSON.stringify({ ts: new Date().toISOString(), ...record }) + '\n');
}

// --- Bluesky (AT Protocol) ---

async function blueskyLogin() {
  const identifier = process.env.BLUESKY_IDENTIFIER;
  const password = process.env.BLUESKY_APP_PASSWORD;
  if (!identifier || !password) return null;
  const r = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`Bluesky login ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

// Bluesky post limit is 300 graphemes. Keep title + link under that.
function blueskyText(post) {
  const base = post.title;
  const url = post.url;
  const room = 300 - url.length - 2; // space + newline
  const trimmed = base.length > room ? base.slice(0, room - 1) + '…' : base;
  return `${trimmed}\n${url}`;
}

async function postToBluesky(session, post) {
  const text = blueskyText(post);
  // Locate the URL substring so AT Proto renders it as a clickable facet.
  const bytes = new TextEncoder().encode(text);
  const urlBytes = new TextEncoder().encode(post.url);
  const urlStart = bytes.length - urlBytes.length;
  const facets = [{
    index: { byteStart: urlStart, byteEnd: bytes.length },
    features: [{ $type: 'app.bsky.richtext.facet#link', uri: post.url }],
  }];
  const record = {
    $type: 'app.bsky.feed.post',
    text,
    facets,
    createdAt: new Date().toISOString(),
  };
  const r = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessJwt}`,
    },
    body: JSON.stringify({
      repo: session.did,
      collection: 'app.bsky.feed.post',
      record,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`Bluesky post ${r.status}: ${(await r.text()).slice(0, 200)}`);
}

// --- Mastodon ---

async function postToMastodon(post) {
  const instance = (process.env.MASTODON_INSTANCE || '').replace(/\/$/, '');
  const token = process.env.MASTODON_TOKEN;
  if (!instance || !token) return false;
  const status = `${post.title}\n\n${post.url}`.slice(0, 500);
  const r = await fetch(`${instance}/api/v1/statuses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, visibility: 'public' }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`Mastodon ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return true;
}

// --- Telegram ---

async function postToTelegram(post) {
  const tok = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!tok || !chat) return false;
  const text = `*${post.title}*\n${post.url}`;
  const r = await fetch(`https://api.telegram.org/bot${tok}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chat,
      text,
      parse_mode: 'Markdown',
      disable_web_page_preview: false,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!r.ok) throw new Error(`Telegram ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return true;
}

// --- Driver ---

// posts: [{ title, url, description? }]
export async function distributePosts(posts) {
  if (!posts?.length) return { attempted: 0 };

  const seenBsky = await loadSeenUrls('bluesky');
  const seenMast = await loadSeenUrls('mastodon');
  const seenTg   = await loadSeenUrls('telegram');

  let bskySession = null;
  try { bskySession = await blueskyLogin(); }
  catch (e) { console.log(`  ⚠ Bluesky login failed: ${e.message.slice(0, 160)}`); }

  const results = { bluesky: 0, mastodon: 0, telegram: 0, skipped: 0, failed: 0 };

  for (const post of posts) {
    // Bluesky
    if (bskySession && !seenBsky.has(post.url)) {
      try {
        await postToBluesky(bskySession, post);
        await logOutcome({ destination: 'bluesky', url: post.url, ok: true });
        results.bluesky++;
      } catch (e) {
        await logOutcome({ destination: 'bluesky', url: post.url, ok: false, error: e.message.slice(0, 300) });
        results.failed++;
        console.log(`  ✗ Bluesky ${post.url}: ${e.message.slice(0, 160)}`);
      }
    }
    // Mastodon
    if (!seenMast.has(post.url)) {
      try {
        const posted = await postToMastodon(post);
        if (posted) {
          await logOutcome({ destination: 'mastodon', url: post.url, ok: true });
          results.mastodon++;
        }
      } catch (e) {
        await logOutcome({ destination: 'mastodon', url: post.url, ok: false, error: e.message.slice(0, 300) });
        results.failed++;
        console.log(`  ✗ Mastodon ${post.url}: ${e.message.slice(0, 160)}`);
      }
    }
    // Telegram
    if (!seenTg.has(post.url)) {
      try {
        const posted = await postToTelegram(post);
        if (posted) {
          await logOutcome({ destination: 'telegram', url: post.url, ok: true });
          results.telegram++;
        }
      } catch (e) {
        await logOutcome({ destination: 'telegram', url: post.url, ok: false, error: e.message.slice(0, 300) });
        results.failed++;
        console.log(`  ✗ Telegram ${post.url}: ${e.message.slice(0, 160)}`);
      }
    }
  }

  return results;
}
