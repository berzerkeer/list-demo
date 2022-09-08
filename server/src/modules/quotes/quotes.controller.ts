import { FastifyRequest } from 'fastify';
import { CreateQuoteInput, GetQuotesRequest } from './quotes.schema';
import {
  createQuote,
  getQuotes,
  getQuotesByCursor,
  getQuotesByPage,
  getTopQuotes,
} from './quotes.service';

export const getQuotesHandler = async (
  request: FastifyRequest<{
    Querystring: GetQuotesRequest;
  }>
) => {
  const { page, cursor } = request.query;
  let lastQueryResultsId = null;
  if (page) {
    const { quotes, count } = await getQuotesByPage(parseInt(page), 10);
    return { quotes, hasMore: count > parseInt(page) * 10, count };
  }
  if (cursor) {
    const { quotes, total } = await getQuotesByCursor(
      { id: parseInt(cursor) },
      10
    );
    lastQueryResultsId = quotes[quotes.length - 1].id;
    return {
      quotes,
      nextCursor: lastQueryResultsId,
      hasMore: lastQueryResultsId < total,
      count: total,
    };
  }
  if (!page && !cursor) {
    const quotes = await getQuotes();
    return { quotes };
  }
};

export const getTopQuotesHandler = async () => {
  return await getTopQuotes();
};

export const createQuoteHandler = async (
  request: FastifyRequest<{
    Body: CreateQuoteInput;
  }>
) => {
  const { body } = request;
  return await createQuote(body);
};
