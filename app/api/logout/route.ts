import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function GET() {
  try {
    cookies().delete('sbAuth');
    NextResponse.redirect(new URL('/'));
    return NextResponse.json(
      {
        success: true,
        message: 'User logged out.',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        messaage:
          error instanceof Error ? error?.message : 'Something went worng.',
      },
      {
        status: 500,
      },
    );
  }
}
