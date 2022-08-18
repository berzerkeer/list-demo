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
  let quotes;
  if (page) {
    quotes = await getQuotesByPage(parseInt(page), 5);
    return quotes;
  }
  if (cursor) {
    quotes = await getQuotesByCursor({ id: parseInt(cursor) }, 5);
    return quotes;
  }
  quotes = await getQuotes();
  return quotes;
};

export const getTopQuotesHandler = async () => {
  const quotes = await getTopQuotes();
  return quotes;
};

export const createQuoteHandler = async (
  request: FastifyRequest<{
    Body: CreateQuoteInput;
  }>
) => {
  const { body } = request;
  const quote = await createQuote(body);
  return quote;
};
