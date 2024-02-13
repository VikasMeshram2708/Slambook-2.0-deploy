import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectToDb = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to DB successfully.');
  } catch (error) {
    console.log('Failed to connect to db');
  } finally {
    await prisma.$disconnect();
    console.log('Connection with db released.');
  }
};

export default connectToDb;
