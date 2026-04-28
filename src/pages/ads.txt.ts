import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const pubId = import.meta.env.PUBLIC_ADSENSE_PUB_ID;
  const content = pubId ? `google.com, pub-${pubId}, DIRECT, f08c47fec0942fa0\n` : '';

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
