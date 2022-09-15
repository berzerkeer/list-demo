import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fjwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import cors from '@fastify/cors';
import { withRefResolver } from 'fastify-zod';
import userRoutes from './modules/user/user.route';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import productRoutes from './modules/product/product.route';
import { version } from '../package.json';
import quoteRoutes from './modules/quotes/quotes.routes';
import { quotesSchemas } from './modules/quotes/quotes.schema';

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

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      id: number;
      name: string;
      email: string;
    };
  }
}

fastify.register(cors);

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
  const schemas = [...userSchemas, ...productSchemas, ...quotesSchemas];

  for (const schema of schemas) {
    fastify.addSchema(schema);
  }

  fastify.register(
    swagger,
    withRefResolver({
      routePrefix: '/docs',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'Fastify API with TypeScript, Fastify, Zod and Swagger',
          version,
        },
      },
    })
  );

  fastify.register(userRoutes, { prefix: 'api/users' });
  fastify.register(productRoutes, { prefix: 'api/products' });
  fastify.register(quoteRoutes, { prefix: 'api/quotes' });

  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
