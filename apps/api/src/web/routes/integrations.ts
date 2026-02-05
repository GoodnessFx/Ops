import { FastifyInstance } from 'fastify';
import { requireAuth } from '../../shared/auth';

const integrations = [
  { id: "slack", name: "Slack", description: "Send notifications to Slack channels.", connected: true, icon: "S" },
  { id: "hubspot", name: "HubSpot", description: "Sync contacts and deals with CRM.", connected: false, icon: "H" },
  { id: "stripe", name: "Stripe", description: "Process payments and subscriptions.", connected: true, icon: "St" },
  { id: "github", name: "GitHub", description: "Link commits to deployment events.", connected: false, icon: "G" },
  { id: "sendgrid", name: "SendGrid", description: "Transactional email service.", connected: false, icon: "Se" },
  { id: "aws", name: "AWS CloudWatch", description: "Monitor infrastructure metrics.", connected: true, icon: "A" },
];

export async function registerIntegrations(app: FastifyInstance) {
  app.get('/integrations', { preHandler: requireAuth }, async () => integrations);

  app.post('/integrations/:id/toggle', { preHandler: requireAuth }, async (req: any) => {
    const { id } = req.params;
    const integration = integrations.find(i => i.id === id);
    if (integration) {
        integration.connected = !integration.connected;
        return { success: true, connected: integration.connected };
    }
    return { success: false, error: 'Integration not found' };
  });
}
