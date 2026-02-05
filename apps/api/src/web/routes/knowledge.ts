import { FastifyInstance } from 'fastify';

const mem: Array<{ id: string; title: string; content: string }> = [];

export async function registerKnowledge(app: FastifyInstance) {
  app.get('/knowledge/articles', async () => mem);
  app.post('/knowledge/articles', async (req) => {
    const id = Date.now().toString();
    mem.push({ id, title: 'Article', content: JSON.stringify(req.body || {}) });
    return { id };
  });
}
