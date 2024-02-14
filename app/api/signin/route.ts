import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import connectToDb from '@/lib/ConnectToDb';
import jwt from 'jsonwebtoken';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export type UserType = z.infer<typeof UserSchema>;

export async function POST(req: NextRequest) {
  try {
    const userInput: UserType = UserSchema.parse(await req.json());
    const { email, password } = userInput;

    // Connect to the database
    await connectToDb();

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Email or password is invalid.' },
        { status: 422 },
      );
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Email or password is invalid.' },
        { status: 422 },
      );
    }

    // JWT Token Generation
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    cookies().set('sbAuth', token, {
      httpOnly: true,
      secure: true,
      path: '/',
    });
    // NextResponse.redirect(new URL('/pages/signin'));
    return NextResponse.json(
      { success: true, message: 'User logged in successfully.', token },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error during user registration:', error);
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof z.ZodError) {
      errorMessage = error.errors[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      errorMessage = 'Database error. Please try again later.';
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
