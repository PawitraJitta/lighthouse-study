export default async function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Allow login page and auth API through
  if (pathname === '/login.html' || pathname.startsWith('/api/auth')) {
    return;
  }

  // Allow static assets
  if (pathname.match(/\.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf)$/)) {
    return;
  }

  // Parse cookie from header manually
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );

  if (cookies['lighthouse_auth'] === 'granted') {
    return;
  }

  // Redirect to login
  const loginUrl = new URL('/login.html', request.url);
  loginUrl.searchParams.set('next', pathname);
  return Response.redirect(loginUrl, 302);
}

export const config = {
  matcher: ['/((?!_vercel|favicon.ico).*)'],
};
