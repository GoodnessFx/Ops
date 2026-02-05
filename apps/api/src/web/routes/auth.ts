import { FastifyInstance } from 'fastify';
import { db } from '../../shared/datasources';

export async function registerAuth(app: FastifyInstance) {
  app.post('/auth/login', async (req: any, reply) => {
    const { email, password } = req.body || {};
    
    if (!email) {
      return reply.code(400).send({ error: 'Email required' });
    }

    const user = await db.user.findUnique({ where: { email } });
    
    if (!user) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    // Mock password check: in production, compare hashed password
    // if (!await compare(password, user.password)) return reply.code(401)...
    
    const token = await reply.jwtSign({ sub: user.id, email: user.email, role: user.role });
    return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  });

  app.post('/auth/signup', async (req: any, reply) => {
     const { email, password, name } = req.body || {};
     
     if (!email || !password) {
         return reply.code(400).send({ error: 'Email and password required' });
     }
     
     const existing = await db.user.findUnique({ where: { email } });
     if (existing) {
         return reply.code(400).send({ error: 'User already exists' });
     }

     const user = await db.user.create({
         data: {
             email,
             name: name || email.split('@')[0],
             role: 'viewer'
         }
     });

     const token = await reply.jwtSign({ sub: user.id, email: user.email, role: user.role });
     return { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } };
  });
  
  app.get('/auth/me', async (req, reply) => {
      try {
        await req.jwtVerify();
        return { user: req.user };
      } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' });
      }
  });
}
