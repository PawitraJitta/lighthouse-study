export const config = { runtime: 'edge' };

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const body = await request.json().catch(() => ({}));
  const { password, next } = body;

  const correctPassword = process.env.SITE_PASSWORD || 'lighthouse2026';

  if (password !== correctPassword) {
    return new Response(JSON.stringify({ ok: false, error: 'Incorrect password' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Set auth cookie — 7 day expiry
  const maxAge = 60 * 60 * 24 * 7;
  const redirectTo = next && next.startsWith('/') ? next : '/index.html';

  return new Response(JSON.stringify({ ok: true, redirect: redirectTo }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `lighthouse_auth=granted; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax; Secure`,
    },
  });
}
