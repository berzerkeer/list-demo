import Fastify, { FastifyInstance } from 'fastify';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

const fastify: FastifyInstance = Fastify({
  logger: {
    level: 'info',
  },
});

fastify.get('/healthCheck', async () => {
  return { status: 'ok' };
});

const start = async () => {
  for (const schema of userSchemas) {
    fastify.addSchema(schema);
  }

  fastify.register(userRoutes, { prefix: 'api/users' });

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
