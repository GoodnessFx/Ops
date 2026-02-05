import { FastifyInstance } from 'fastify';
import { db } from '../../shared/datasources';
import { requireAuth } from '../../shared/auth';

export async function registerStats(app: FastifyInstance) {
  app.get('/stats/dashboard', { preHandler: requireAuth }, async () => {
    // In a real app, these would be optimized aggregations
    const totalRevenue = 45231.89; // Mock for now, as we don't have payments table
    const subscriptions = await db.user.count(); // Use users as proxy for subs
    const sales = 12234; // Mock
    const activeNow = 573; // Mock

    // Generate chart data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const chartData = months.map(name => ({
        name,
        total: Math.floor(Math.random() * 5000) + 1000
    }));

    return {
        revenue: { value: totalRevenue, change: "+20.1%" },
        subscriptions: { value: subscriptions, change: "+180.1%" },
        sales: { value: sales, change: "-4.5%" },
        active: { value: activeNow, change: "+201" },
        chartData
    };
  });
}
