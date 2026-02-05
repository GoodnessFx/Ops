import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();


async function main() {
  console.log('Seeding database...');

  // Create Requests
  const requests = [
    { subject: "Unable to reset password", user: "alice@example.com", status: "Open", priority: "High", createdAt: new Date("2024-03-10") },
    { subject: "Billing question for March", user: "bob@company.co", status: "In Progress", priority: "Medium", createdAt: new Date("2024-03-09") },
    { subject: "Feature request: Dark mode", user: "charlie@design.io", status: "Closed", priority: "Low", createdAt: new Date("2024-03-08") },
    { subject: "API Rate limit exceeded", user: "dev@startup.com", status: "Open", priority: "Critical", createdAt: new Date("2024-03-08") },
    { subject: "Integration with Slack failing", user: "ops@corp.net", status: "In Progress", priority: "High", createdAt: new Date("2024-03-07") },
    { subject: "Update credit card info", user: "finance@llc.com", status: "Closed", priority: "Medium", createdAt: new Date("2024-03-06") },
    { subject: "Export data not working", user: "data@analyst.org", status: "Open", priority: "Medium", createdAt: new Date("2024-03-05") },
  ];

  for (const req of requests) {
    await db.request.create({ data: req });
  }

  // Create Audit Logs
  const auditLogs = [
    { actorType: 'human', actorId: 'admin', action: 'login.success', reasoning: 'Standard login', createdAt: new Date() },
    { actorType: 'system', actorId: 'scheduler', action: 'backup.completed', reasoning: 'Daily backup', createdAt: new Date(Date.now() - 3600000) },
    { actorType: 'human', actorId: 'alice@example.com', action: 'password.reset_request', reasoning: 'Forgot password', createdAt: new Date(Date.now() - 7200000) },
    { actorType: 'ai', actorId: 'bot-1', action: 'ticket.categorized', reasoning: 'Categorized as support', createdAt: new Date(Date.now() - 86400000) },
  ];

  for (const log of auditLogs) {
    await db.auditLog.create({ data: log });
  }
  
  // Create User
  try {
    await db.user.create({
        data: {
        email: 'admin@ops.com',
        name: 'Admin User',
        role: 'admin'
        }
    });
  } catch (e) {
      // User might already exist
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
