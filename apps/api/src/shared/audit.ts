import { db } from './datasources';

type AuditInput = {
  actorType: 'ai' | 'human' | 'system';
  actorId: string;
  action: string;
  reasoning?: string;
  payload?: unknown;
};

export async function logAudit(input: AuditInput) {
  await db.query(
    `insert into audit_logs (actor_type, actor_id, action, reasoning, payload)
     values ($1, $2, $3, $4, $5)`,
    [input.actorType, input.actorId, input.action, input.reasoning ?? null, input.payload ?? null]
  );
}
