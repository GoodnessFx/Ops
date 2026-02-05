import { FastifyReply, FastifyRequest } from 'fastify';

export type UserPayload = { sub: string; roles?: string[] };

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch {
    // In a real production app, we would strictly enforce auth.
    // For this demo/starter setup without a frontend login page, we allow a dev bypass.
    // Ideally, you should implement a proper login flow in the frontend.
    if (process.env.NODE_ENV !== 'production' || process.env.ALLOW_ANONYMOUS === 'true') {
        req.user = { sub: 'demo-user', roles: ['admin', 'agent'] };
        return;
    }

    reply.code(401);
    throw new Error('unauthorized');
  }
}

export function requireRole(role: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const payload = req.user as UserPayload | undefined;
    const has = payload?.roles?.includes(role);
    if (!has) {
      reply.code(403);
      throw new Error('forbidden');
    }
  };
}
