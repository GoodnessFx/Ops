import { FastifyInstance } from 'fastify';
import { redis } from '../../shared/datasources';
import { requireAuth, UserPayload } from '../../shared/auth';
import { logAudit } from '../../shared/audit';

export async function registerRequests(app: FastifyInstance) {
  app.post('/requests', { preHandler: requireAuth }, async (req) => {
    const id = Date.now().toString();
    await redis.publish('request.received', JSON.stringify({ id, body: req.body }));
    await logAudit({
      actorType: 'human',
      actorId: (req.user as unknown as UserPayload)?.sub ?? 'unknown',
      action: 'request.created',
      payload: { id }
    });
    return { id };
  });

  app.get('/requests', { preHandler: requireAuth }, async () => {
    return [];
  });
}
