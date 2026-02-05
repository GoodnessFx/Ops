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

  app.get('/payments/transactions', { preHandler: requireAuth }, async () => {
      // Mock data matching frontend interface
      return [
          { id: "TX-9988", customer: "Acme Corp", amount: "$1,200.00", status: "Paid", date: "Mar 10, 2024" },
          { id: "TX-9987", customer: "Globex Inc", amount: "$850.00", status: "Pending", date: "Mar 09, 2024" },
          { id: "TX-9986", customer: "Soylent Corp", amount: "$2,300.00", status: "Paid", date: "Mar 09, 2024" },
          { id: "TX-9985", customer: "Initech", amount: "$120.00", status: "Failed", date: "Mar 08, 2024" },
          { id: "TX-9984", customer: "Umbrella Corp", amount: "$5,000.00", status: "Paid", date: "Mar 08, 2024" },
      ];
  });

  app.post('/payments/webhooks/stripe', async (req, reply) => {
    reply.code(200);
    return { received: true };
  });
}
