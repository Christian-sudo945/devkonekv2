import { NextResponse, NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function middleware(req: NextRequest) {
  const publicPaths = [
    '/',                  
    '/signin',             // Sign in page
    '/signup',             // Sign up page
    '/api/auth/signin',    // Sign in API
    '/api/auth/signup',    // Sign up API
    '/_next',              // Next.js assets
    '/favicon.ico',        // Favicon
    '/assets'              // Public assets
  ];

  // Check if the current path is public
  if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionToken = req.cookies.get('session')?.value;

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  try {
    const decoded = verify(sessionToken, process.env.JWT_SECRET || 'your-secret-key');
    const session = await prisma.session.findFirst({
      where: {
        sessionToken,
        expires: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-user-id', session.userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: [
    // Protected routes that require authentication
    '/home/:path*',
    '/api/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/projects/:path*',
    '/messages/:path*',
    
    // Exclude public paths
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)'
  ],
};
