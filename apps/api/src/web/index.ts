import { FastifyInstance } from 'fastify';
import { registerHealth } from './routes/health';
import { registerAuth } from './routes/auth';
import { registerRequests } from './routes/requests';
import { registerRouter } from './routes/router';
import { registerPayments } from './routes/payments';
import { registerKnowledge } from './routes/knowledge';
import { registerAudit } from './routes/audit';
import { registerNotifications } from './routes/notifications';
import { registerStats } from './routes/stats';
import { registerIntegrations } from './routes/integrations';

export async function registerRoutes(app: FastifyInstance) {
  await registerHealth(app);
  await registerAuth(app);
  await registerRequests(app);
  await registerRouter(app);
  await registerPayments(app);
  await registerKnowledge(app);
  await registerAudit(app);
  await registerNotifications(app);
  await registerStats(app);
  await registerIntegrations(app);
}
