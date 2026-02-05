import { FastifyInstance } from 'fastify';
import { registerRoutes } from './web';
import { initDataSources } from './shared/datasources';

export async function createServer(app: FastifyInstance) {
  await initDataSources();
  await registerRoutes(app);
}
