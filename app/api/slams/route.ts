import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { PrismaClient } from '@prisma/client';
import connectToDb from '@/lib/ConnectToDb';

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    // validate the user
    const reqBody = await request.json();
    console.log('reqBody', reqBody);
    const { title, message } = reqBody;

    // connect to DB
    await connectToDb();

    const user = await prisma.user.findUnique({
      where: {
        id: reqBody.User,
      },
    });

    await prisma.slam.create({
      data: {
        title,
        message,
        User: { connect: { id: user?.id } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your slams was store.',
      },
      {
        status: 200,
      },
    );
    // sanitize the data
    // store into db
  } catch (error) {
    console.error('Error during slams storing:', error);
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof z.ZodError) {
      errorMessage = error.errors[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      errorMessage = 'Slams error. Please try again later.';
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
