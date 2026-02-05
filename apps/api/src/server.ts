import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import sensible from '@fastify/sensible';
import jwt from '@fastify/jwt';
import { createServer } from './setup';

const app = Fastify({ logger: true });

async function start() {
  await app.register(cors, { origin: true });
  await app.register(sensible);
  await app.register(jwt, { secret: process.env.JWT_SECRET || 'dev' });

  await createServer(app);

  const port = Number(process.env.PORT || 4000);
  await app.listen({ port, host: '0.0.0.0' });
}

start();
