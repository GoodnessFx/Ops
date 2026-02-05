import { FastifyInstance } from 'fastify';
import { requireAuth } from '../../shared/auth';

const articles = [
  { id: 1, title: "Getting Started with Ops OS", category: "Onboarding", reads: "1.2k", updated: "2 days ago" },
  { id: 2, title: "Configuring Email Integrations", category: "Integrations", reads: "854", updated: "1 week ago" },
  { id: 3, title: "Understanding Payment Flows", category: "Payments", reads: "2.1k", updated: "3 weeks ago" },
  { id: 4, title: "API Authentication Guide", category: "Developer", reads: "3.4k", updated: "1 month ago" },
  { id: 5, title: "Troubleshooting Worker Nodes", category: "Operations", reads: "543", updated: "2 days ago" },
  { id: 6, title: "Managing User Roles", category: "Administration", reads: "921", updated: "5 days ago" },
];

export async function registerKnowledge(app: FastifyInstance) {
  app.get('/knowledge/articles', { preHandler: requireAuth }, async () => articles);
  
  app.post('/knowledge/articles', { preHandler: requireAuth }, async (req) => {
    const id = Date.now();
    // In a real app, we would validate body and save to DB
    const newArticle = { 
        id, 
        title: 'New Article', 
        category: 'Uncategorized', 
        reads: '0', 
        updated: 'Just now',
        ...(req.body as any)
    };
    articles.push(newArticle);
    return { id };
  });
}
