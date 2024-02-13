import connectToDb from '@/lib/ConnectToDb';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    await connectToDb();
    const users = await prisma.user.findMany();
    return NextResponse.json(
      {
        success: true,
        users,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message:
          e instanceof Error
            ? e?.message
            : 'Something went wrong please try again',
      },
      { status: 500 },
    );
  }
};
