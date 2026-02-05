import { FastifyInstance } from 'fastify';
import { requireAuth } from '../../shared/auth';

export async function registerNotifications(app: FastifyInstance) {
  app.get('/notifications', { preHandler: requireAuth }, async (req, reply) => {
    // Mock notifications for now
    return [
      { id: 1, title: 'New Request', message: 'User Alice created a request', time: '2 mins ago', read: false },
      { id: 2, title: 'System Alert', message: 'High CPU usage detected', time: '1 hour ago', read: true },
      { id: 3, title: 'Backup', message: 'Daily backup completed', time: '5 hours ago', read: true },
    ];
  });
}
