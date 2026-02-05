import { FastifyInstance } from 'fastify';

export async function registerHealth(app: FastifyInstance) {
  app.get('/health', async () => {
    return { status: 'ok' };
  });
}
