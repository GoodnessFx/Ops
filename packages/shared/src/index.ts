export type RequestCategory = 'support' | 'sales' | 'payment' | 'ops';
export type RouteMode = 'ai' | 'human' | 'hybrid';
export type RoutingDecision = { category: RequestCategory; confidence: number; route: RouteMode };
export type UserPayload = { sub: string; roles: string[] };
