import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  try {
    const path = request.nextUrl.pathname;

    // const isPublicPath = path === '/pages/signin'
    //   || path === '/pages/signup'
    //   || path === '/pages/slams';

    const isPublicPath = path === '/pages/slams';

    const verifyAccessToken = request.cookies.get('sbAuth')?.value || '';
    console.log('verify-token', verifyAccessToken);

    if (isPublicPath && verifyAccessToken) {
      return NextResponse.rewrite(new URL('/pages/slams', request.url));
    }

    if (isPublicPath && !verifyAccessToken) {
      return NextResponse.rewrite(new URL('/pages/signin', request.url));
    }
    if (!isPublicPath && !verifyAccessToken) {
      return NextResponse.rewrite(new URL('/pages/signup', request.url));
    }

    // if (isPublicPath && verifyAccessToken) {
    //   return NextResponse.redirect(new URL('/pages/slams', request.url));
    // }
    // if (isPublicPath && !verifyAccessToken) {
    //   return NextResponse.redirect(new URL('/pages/signin', request.url));
    // }
    // if (!isPublicPath && !verifyAccessToken) {
    //   return NextResponse.redirect(new URL('/pages/signup', request.url));
    // }
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

export const decodeCookie = (token: string) => {
  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET!);
    // @ts-ignore
    const { email } = verifyToken;
    return email;
  } catch (error) {
    return console.log(
      error instanceof Error
        ? error?.message
        : 'Failed to authenticate the user try again later.',
    );
  }
};

export const config = {
  // matcher: ['/pages/signin', '/pages/signup', '/pages/slams'],
  matcher: '/pages/slams',
};
