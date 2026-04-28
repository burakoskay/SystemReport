import assert from 'node:assert';
import test from 'node:test';
import { onRequestGet } from './callback.js';

// Mock global fetch
global.fetch = async (url) => {
  if (url === 'https://github.com/login/oauth/access_token') {
    return {
      json: async () => ({ access_token: 'test-token' })
    };
  }
  if (url === 'https://api.github.com/user') {
    return {
      ok: true,
      json: async () => ({ login: 'burakoskay' })
    };
  }
  return { ok: false };
};

// Mock Response
global.Response = class {
  constructor(body, init) {
    this.body = body;
    this.init = init;
    this.headers = new Map(Object.entries(init.headers || {}));
  }
  async text() {
    return this.body;
  }
};

test('callback returns secure HTML', async () => {
  const context = {
    request: {
      url: 'https://www.systemreport.net/api/callback?code=test-code'
    },
    env: {
      GITHUB_CLIENT_ID: 'test-id',
      GITHUB_CLIENT_SECRET: 'test-secret'
    }
  };

  const response = await onRequestGet(context);
  const html = await response.text();

  // 1. Verify it DOES NOT contain the insecure postMessage("*")
  const insecurePattern = /postMessage\s*\(\s*['"]authorizing:github['"]\s*,\s*['"]\*['"]\s*\)/;
  assert.strictEqual(insecurePattern.test(html), false, 'Should not use wildcard targetOrigin');

  // 2. Verify it DOES contain origin validation in receiveMessage
  const hasOriginValidation = html.includes('if (e.origin !== targetOrigin)') || html.includes('if(e.origin!==targetOrigin)');
  assert.strictEqual(hasOriginValidation, true, 'Should validate message origin');

  // 3. Verify it uses the correct target origin
  const securePattern = /window\.opener\.postMessage\("authorizing:github", targetOrigin\)/;
  assert.strictEqual(securePattern.test(html), true, 'Should use specific targetOrigin for initial message');

  const secondSecurePattern = /window\.opener\.postMessage\(\s*['"]authorization:github:success:.*['"]\s*,\s*targetOrigin\s*\)/;
  assert.strictEqual(secondSecurePattern.test(html), true, 'Should use specific targetOrigin for token message');

  assert.ok(html.includes('const targetOrigin = "https://www.systemreport.net";'), 'Should define targetOrigin correctly');
});
