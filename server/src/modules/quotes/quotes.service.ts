import { Prisma } from '@prisma/client';
import prisma from '../../utils/prisma';
import { CreateQuoteInput } from './quotes.schema';

export const getQuotes = async () => {
  return await prisma.quote.findMany();
};

export const getQuotesByPage = async (page: number, take: number) => {
  const count = await prisma.quote.count();
  const quotes = await prisma.quote.findMany({
    skip: (page - 1) * take,
    take,
  });
  return { quotes, count };
};

export const getQuotesByCursor = async (
  cursor: Prisma.QuoteWhereUniqueInput,
  take: number
) => {
  const total = await prisma.quote.count();
  const quotes = await prisma.quote.findMany({
    take,
    skip: 1,
    cursor,
  });
  return { quotes, total };
};

export const getTopQuotes = async () => {
  return await prisma.quote.findMany({
    take: 10,
  });
};

export const createQuote = async (data: CreateQuoteInput) => {
  return prisma.quote.create({ data });
};
