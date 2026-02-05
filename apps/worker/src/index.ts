import 'dotenv/config';
import { createClient } from 'redis';

async function start() {
  const redis = createClient({ url: process.env.REDIS_URL });
  await redis.connect();

  const sub = redis.duplicate();
  await sub.connect();
  await sub.subscribe('request.received', async (message) => {
    const evt = JSON.parse(message);
    console.log('request.received', evt.id);
  });

  process.on('SIGINT', async () => {
    await sub.disconnect();
    await redis.disconnect();
    process.exit(0);
  });
}

start();
