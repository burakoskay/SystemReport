/**
 * Cloudflare Pages Function: GitHub OAuth — Step 1 (Authorization)
 *
 * Redirects the user to GitHub's OAuth authorization page.
 * Requires GITHUB_CLIENT_ID environment variable set in Cloudflare Pages.
 */
export async function onRequestGet(context) {
  const clientId = context.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return new Response('GITHUB_CLIENT_ID not configured', { status: 500 });
  }

  const redirectUri = new URL('/api/callback', context.request.url).toString();
  const scope = 'repo,user';

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${scope}`;

  return Response.redirect(authUrl, 302);
}
