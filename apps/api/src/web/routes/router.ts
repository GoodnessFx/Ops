import { FastifyInstance } from 'fastify';

type Decision = {
  category: 'support' | 'sales' | 'payment' | 'ops';
  confidence: number;
  route: 'ai' | 'human' | 'hybrid';
};

export function decide(input: unknown): Decision {
  const text = JSON.stringify(input || '').toLowerCase();
  const support = /(help|issue|error|bug|support)/.test(text);
  const payment = /(invoice|payment|charge|refund|stripe)/.test(text);
  const sales = /(demo|price|buy|trial|lead)/.test(text);
  const category = support ? 'support' : payment ? 'payment' : sales ? 'sales' : 'ops';
  const confidence = support || payment || sales ? 0.8 : 0.6;
  const route = confidence >= 0.75 ? 'ai' : 'hybrid';
  return { category, confidence, route };
}

export async function registerRouter(app: FastifyInstance) {
  app.post('/router/decide', async (req) => {
    const decision = decide(req.body);
    return decision;
  });
}
