/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as z from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import connectToDb from '@/lib/ConnectToDb';

const prisma = new PrismaClient();

const UserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

type UserType = z.infer<typeof UserSchema>;

export async function POST(req: NextRequest) {
  try {
    const userInput: UserType = UserSchema.parse(await req.json());
    const { name, email, password } = userInput;

    connectToDb();
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json(
        { success: false, message: 'Email already in use.' },
        { status: 422 },
      );
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json(
      { success: true, message: 'User registered successfully.' },
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
