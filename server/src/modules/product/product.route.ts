import { FastifyInstance } from 'fastify';
import { createProductHandler, getProductsHandler } from './product.controller';
import { $productRef } from './product.schema';

async function productRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      preHandler: [server.auth],
      schema: {
        body: $productRef('createProductSchema'),
        response: {
          201: $productRef('productResponseSchema'),
        },
      },
    },
    createProductHandler
  );

  server.get(
    '/',
    {
      preHandler: [server.auth],
      schema: {
        response: {
          200: $productRef('productsReponseSchema'),
        },
      },
    },
    getProductsHandler
  );
}

export default productRoutes;
