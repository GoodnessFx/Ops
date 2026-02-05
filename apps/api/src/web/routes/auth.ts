import { FastifyInstance } from 'fastify';

export async function registerAuth(app: FastifyInstance) {
  app.post('/auth/login', async (req, reply) => {
    const token = await reply.jwtSign({ sub: 'user-1', roles: ['admin'] });
    return { token };
  });
}
