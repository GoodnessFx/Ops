import { FastifyInstance } from 'fastify';
import { requireAuth, requireRole } from '../../shared/auth';
import { db } from '../../shared/datasources';

export async function registerAudit(app: FastifyInstance) {
  app.get(
    '/audit/logs',
    { preHandler: [requireAuth, requireRole('admin')] },
    async () => {
      const res = await db.query(
        'select id, actor_type, actor_id, action, reasoning, created_at from audit_logs order by id desc limit 50'
      );
      return res.rows;
    }
  );
}
