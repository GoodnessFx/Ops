import 'dotenv/config';
import { createClient } from 'redis';

async function start() {
  const redis = createClient({ url: process.env.REDIS_URL });
  await redis.connect();

  const sub = redis.duplicate();
  await sub.connect();
  
  console.log('Worker started, listening for events...');

  await sub.subscribe('request.received', async (message) => {
    const evt = JSON.parse(message);
    console.log(`[${new Date().toISOString()}] Processing request: ${evt.id}`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate different actions based on some criteria (mocked here)
    if (Math.random() > 0.8) {
        console.log(`[${new Date().toISOString()}] Request ${evt.id} requires manual intervention.`);
    } else {
        console.log(`[${new Date().toISOString()}] Request ${evt.id} processed successfully.`);
    }
  });

  process.on('SIGINT', async () => {
    await sub.disconnect();
    await redis.disconnect();
    process.exit(0);
  });
}

start();
