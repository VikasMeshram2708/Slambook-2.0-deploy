import connectToDb from '@/lib/ConnectToDb';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { UserId } = reqBody;
    // console.log('redBOdySlams', UserId);

    await connectToDb();
    const allSlams = await prisma.slam.findMany({
      where: {
        UserId,
      },
    });

    if (UserId === undefined) {
      return NextResponse.json({
        success: false,
        messag: 'Invalid user',
      });
    }

    return NextResponse.json({
      success: true,
      message: allSlams,
    });
  } catch (error) {
    console.error('Error during slams retreiving:', error);
    let errorMessage = 'An unknown error occurred.';

    if (error instanceof z.ZodError) {
      errorMessage = error.errors[0].message;
    } else if (error instanceof PrismaClientKnownRequestError) {
      errorMessage = 'Error while fetching your slams please try again later.';
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
