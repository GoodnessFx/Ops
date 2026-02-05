import { FastifyInstance } from 'fastify';
import { redis, db } from '../../shared/datasources';
import { requireAuth, UserPayload } from '../../shared/auth';
import { logAudit } from '../../shared/audit';

export async function registerRequests(app: FastifyInstance) {
  app.post('/requests', { preHandler: requireAuth }, async (req: any) => {
    const { subject, priority } = req.body;
    const userId = (req.user as UserPayload)?.sub ?? 'unknown';
    
    // Create request in DB
    const request = await db.request.create({
      data: {
        subject: subject || 'New Request',
        user: userId,
        priority: priority || 'Medium',
        status: 'Open'
      }
    });

    try {
      if (redis.isOpen) {
        await redis.publish('request.received', JSON.stringify({ id: request.id, body: req.body }));
      }
    } catch (e) {
      console.warn('Redis publish failed:', e);
    }

    await logAudit({
      actorType: 'human',
      actorId: userId,
      action: 'request.created',
      payload: { id: request.id }
    });
    return { id: request.id };
  });

  app.get('/requests', { preHandler: requireAuth }, async () => {
    const requests = await db.request.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Map to frontend format if needed, but the model matches closely
    // Frontend expects: { id, subject, user, status, priority, date }
    // We return: { id, subject, user, status, priority, createdAt, updatedAt }
    // Frontend probably needs to format createdAt to date string.
    
    return requests.map(r => ({
      ...r,
      date: r.createdAt.toISOString().split('T')[0] // Format YYYY-MM-DD
    }));
  });
}
