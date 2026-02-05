import { FastifyInstance } from 'fastify';
import { requireAuth, requireRole } from '../../shared/auth';
import { db } from '../../shared/datasources';

export async function registerAudit(app: FastifyInstance) {
  app.get(
    '/audit/logs',
    { preHandler: [requireAuth, requireRole('admin')] },
    async () => {
      const logs = await db.auditLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
        select: {
          id: true,
          actorType: true,
          actorId: true,
          action: true,
          reasoning: true,
          createdAt: true,
          payload: true
        }
      });
      return logs;
    }
  );
}
