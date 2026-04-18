// Discord webhook alerting. No-ops when DISCORD_WEBHOOK_URL unset.
// Keep payloads small; Discord rejects >2000 chars per content field.

export async function sendAlert({ title, lines = [], level = 'info' }) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;

  const emoji = { info: 'ℹ️', warn: '⚠️', error: '🔥' }[level] || 'ℹ️';
  const body = lines.join('\n').slice(0, 1800);
  const content = `${emoji} **${title}**\n${body}`.slice(0, 1990);

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (e) {
    console.log(`  [alerts] webhook failed: ${e.message}`);
  }
}
