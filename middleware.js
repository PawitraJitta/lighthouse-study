import { NextResponse } from 'next/server';

const PASSWORD = process.env.SITE_PASSWORD || 'lighthouse2026';
const COOKIE_NAME = 'lighthouse_auth';
const COOKIE_VALUE = 'granted';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow login page and API route through
  if (pathname === '/login.html' || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // Allow static assets (css, js, images, fonts)
  if (
    pathname.startsWith('/_next') ||
    pathname.match(/\.(css|js|ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  // Check auth cookie
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value === COOKIE_VALUE) {
    return NextResponse.next();
  }

  // Redirect to login, preserve intended destination
  const loginUrl = new URL('/login.html', request.url);
  loginUrl.searchParams.set('next', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
