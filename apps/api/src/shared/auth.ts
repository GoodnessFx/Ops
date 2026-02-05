import { FastifyReply, FastifyRequest } from 'fastify';

export type UserPayload = { sub: string; roles?: string[] };

export async function requireAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch {
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
