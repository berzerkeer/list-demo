import { FastifyInstance } from 'fastify';
import {
  getUsersHandler,
  loginHandler,
  registerUserHandler,
} from './user.controller';
import { $userRef } from './user.schema';

async function userRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $userRef('createUserSchema'),
        response: {
          201: $userRef('createUserResponseSchema'),
        },
      },
    },
    registerUserHandler
  );

  server.post(
    '/login',
    {
      schema: {
        body: $userRef('loginSchema'),
        response: {
          200: $userRef('loginResponseSchema'),
        },
      },
    },
    loginHandler
  );

  server.get(
    '/',
    {
      preHandler: [server.auth],
    },
    getUsersHandler
  );
}

export default userRoutes;
