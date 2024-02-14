import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/pages/signin' || 'pages/signup';
    const verifyAccessToken = request.cookies.get('smAuth')?.value || '';

    if (isPublicPath && verifyAccessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (!isPublicPath && !verifyAccessToken) {
      return NextResponse.redirect(new URL('/pages/signup', request.url));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({
      message:
        error instanceof Error
          ? error?.message
          : 'Something went wrong try again.',
    });
  }
}

export const config = {
  matcher: ['/pages/signin', '/pages/signup', '/pages/slams'],
};
