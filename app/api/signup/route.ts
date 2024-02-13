/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcryptjs';

import * as z from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Minimum 2 characters are required',
    })
    .max(100, {
      message: 'Maximum 100 characters are allowed.',
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: 'Minimum 2 characters are required',
    })
    .max(100, {
      message: 'Maximum 100 characters are allowed.',
    }),
});

type UserType = z.infer<typeof UserSchema>;

export async function POST(req: NextRequest) {
  try {
    const userInput: UserType = UserSchema.parse(await req.json());
    const { name, email, password } = userInput;

    // if email is already presnt throw error
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already in use.',
        },
        {
          status: 422,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully.',
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: e.message,
          stack: e.stack,
        },
        {
          status: 500,
        },
      );
    }
    return NextResponse.json(
      {
        message: e instanceof Error ? e.message : 'An unknown error occured.',
      },
      {
        status: 500,
      },
    );
  }
}
