/**
 * Cloudflare Pages Function: GitHub OAuth — Step 2 (Token Exchange)
 *
 * Exchanges the temporary GitHub auth code for an access token,
 * then returns it to the CMS admin page via postMessage.
 *
 * SECURITY: Only the authorized GitHub user (ALLOWED_USER) can complete
 * the OAuth flow. All other users are rejected.
 *
 * Requires GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
 * environment variables set in Cloudflare Pages.
 */

const ALLOWED_USER = 'burakoskay';

export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const code = searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const clientId = context.env.GITHUB_CLIENT_ID;
  const clientSecret = context.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response('GitHub OAuth credentials not configured', { status: 500 });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return new Response(`GitHub OAuth error: ${tokenData.error_description}`, { status: 400 });
    }

    const token = tokenData.access_token;

    // Verify the authenticated user is the allowed user
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'SystemReport-CMS',
      },
    });

    if (!userResponse.ok) {
      return new Response('Failed to verify user identity', { status: 500 });
    }

    const userData = await userResponse.json();

    if (userData.login.toLowerCase() !== ALLOWED_USER.toLowerCase()) {
      return new Response('Access denied. You are not authorized to use this CMS.', { status: 403 });
    }

    // User is authorized — return the token to the CMS via postMessage
    const provider = 'github';
    const url = new URL(context.request.url);
    const targetOrigin = url.origin;

    const html = `<!doctype html>
<html>
<head><title>OAuth Callback</title></head>
<body>
  <script>
    (function() {
      const targetOrigin = "${targetOrigin}";

      function receiveMessage(e) {
        console.log("receiveMessage %o", e);
        if (e.origin !== targetOrigin) {
          console.warn("Unauthorized message origin: " + e.origin);
          return;
        }

        window.opener.postMessage(
          'authorization:${provider}:success:${JSON.stringify({ token, provider })}',
          targetOrigin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:${provider}", targetOrigin);
    })();
  </script>
</body>
</html>`;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  } catch (error) {
    return new Response(`OAuth token exchange failed: ${error.message}`, { status: 500 });
  }
}
