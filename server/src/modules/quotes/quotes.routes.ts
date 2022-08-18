import { FastifyInstance } from 'fastify';
import {
  createQuoteHandler,
  getQuotesHandler,
  getTopQuotesHandler,
} from './quotes.controller';
import { $quoteRef } from './quotes.schema';

async function quoteRoutes(server: FastifyInstance) {
  server.get(
    '/',
    {
      schema: {
        response: {
          200: $quoteRef('quotesResponseSchema'),
        },
        querystring: $quoteRef('getQuotesSchema'),
      },
    },
    getQuotesHandler
  );
  server.get('/top', getTopQuotesHandler);
  server.post(
    '/',
    {
      schema: {
        body: $quoteRef('createQuoteSchema'),
        response: {
          201: $quoteRef('quoteResponseSchema'),
        },
      },
    },
    createQuoteHandler
  );
}

export default quoteRoutes;
