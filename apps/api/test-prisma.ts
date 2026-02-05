import { PrismaClient } from '@prisma/client';

console.log('Instantiating PrismaClient...');
try {
  const prisma = new PrismaClient();
  console.log('Success!');
} catch (e) {
  console.error('Error:', e);
}
