import { db } from './datasources';

type AuditInput = {
  actorType: 'ai' | 'human' | 'system';
  actorId: string;
  action: string;
  reasoning?: string;
  payload?: unknown;
};

export async function logAudit(input: AuditInput) {
  try {
    await db.auditLog.create({
      data: {
        actorType: input.actorType,
        actorId: input.actorId,
        action: input.action,
        reasoning: input.reasoning,
        payload: input.payload ? JSON.stringify(input.payload) : undefined
      }
    });
  } catch (e) {
    console.error('Failed to log audit:', e);
    // Don't throw, we don't want to break the main flow for audit logging
  }
}
