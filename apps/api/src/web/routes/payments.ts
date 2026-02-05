import { FastifyInstance } from 'fastify';
import { requireAuth, requireRole, UserPayload } from '../../shared/auth';
import { logAudit } from '../../shared/audit';

export async function registerPayments(app: FastifyInstance) {
  app.post(
    '/payments/invoices',
    { preHandler: [requireAuth, requireRole('admin')] },
    async (req) => {
      const id = Date.now().toString();
      await logAudit({
        actorType: 'human',
        actorId: (req.user as unknown as UserPayload)?.sub ?? 'unknown',
        action: 'invoice.created',
        payload: { id }
      });
      return { id, status: 'created' };
    }
  );

  app.post('/payments/webhooks/stripe', async (req, reply) => {
    reply.code(200);
    return { received: true };
  });
}
