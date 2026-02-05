import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

export const db = new PrismaClient();

export const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

export async function initDataSources() {
  try {
    // Only try to connect if we expect Redis to be there, or just try and fail gracefully
    await redis.connect();
  } catch (e) {
    console.warn('Redis connection failed (ignoring for dev):', e);
  }
  
  try {
    await db.$connect();
    console.log('Database connected');
  } catch (e) {
    console.error('Database connection failed:', e);
    throw e;
  }
}
