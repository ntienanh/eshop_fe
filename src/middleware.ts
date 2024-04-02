import { pages } from '@/app/auth/config/page';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

async function middleware(request: NextRequestWithAuth) {
  const session = request?.nextauth?.token;
  if (request.nextUrl.pathname === '/') return NextResponse.next();

  if (!session && request.nextUrl.pathname !== '/auth/signIn')
    return NextResponse.redirect(new URL('/auth/signIn', request.url));

  return NextResponse.next();
}

export default withAuth(middleware, {
  callbacks: {
    async authorized({ token }) {
      return !!token;
    },
  },
  pages: pages,
  secret: process.env.NEXTAUTH_SERCRET,
});

export const config = { matcher: ['/admin/:path*'] };
