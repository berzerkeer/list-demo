import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fjwt from '@fastify/jwt';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';

export const fastify: FastifyInstance = Fastify({
  logger: {
    level: 'info',
  },
});

declare module 'fastify' {
  export interface FastifyInstance {
    auth: any;
  }
}

fastify.register(fjwt, {
  secret: 'supersecret',
});

fastify.decorate(
  'auth',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      return reply.send(error);
    }
  }
);

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
