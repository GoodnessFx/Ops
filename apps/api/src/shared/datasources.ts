import { Pool } from 'pg';
import { createClient } from 'redis';

export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10
});

export const redis = createClient({
  url: process.env.REDIS_URL
});

export async function initDataSources() {
  try {
    await redis.connect();
  } catch {
    // ignore
  }
  try {
    await db.query('select 1');
    await db.query(`
      create table if not exists audit_logs (
        id bigserial primary key,
        actor_type text,
        actor_id text,
        action text,
        reasoning text,
        payload jsonb,
        created_at timestamptz default now()
      );
    `);
  } catch {
    // ignore
  }
}
