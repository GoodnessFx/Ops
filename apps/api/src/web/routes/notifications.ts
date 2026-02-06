import { FastifyInstance } from 'fastify';
import { requireAuth } from '../../shared/auth';

export async function registerNotifications(app: FastifyInstance) {
  app.get('/notifications', { preHandler: requireAuth }, async (req, reply) => {
    // Mock notifications for now
    return [
      { id: 1, title: 'New Ticket', message: 'Support ticket #1024 created by Alice', time: '2 mins ago', read: false },
      { id: 2, title: 'System Alert', message: 'Database latency spike detected (Region: US-East)', time: '1 hour ago', read: true },
      { id: 3, title: 'Backup Success', message: 'Daily snapshot created successfully (Size: 2.4GB)', time: '5 hours ago', read: true },
    ];
  });
}
