import { buildJsonSchemas } from 'fastify-zod';
import { z } from 'zod';

const quotesEssentials = {
  author: z.string(),
  quote: z.string(),
};

const createQuoteSchema = z.object({
  ...quotesEssentials,
});

const quoteResponseSchema = z.object({
  ...quotesEssentials,
  id: z.number(),
});

const quotesResponseSchema = z.object({
  quotes: z.array(quoteResponseSchema),
  hasMore: z.boolean().optional(),
  nextCursor: z.number().optional(),
  count: z.number().optional(),
});

const getQuotesSchema = z.object({
  page: z.string().optional(),
  cursor: z.string().optional(),
  count: z.number().optional(),
});

export type CreateQuoteInput = z.infer<typeof createQuoteSchema>;
export type GetQuotesRequest = z.infer<typeof getQuotesSchema>;

export const { schemas: quotesSchemas, $ref: $quoteRef } = buildJsonSchemas(
  {
    createQuoteSchema,
    quoteResponseSchema,
    quotesResponseSchema,
    getQuotesSchema,
  },
  {
    $id: 'quote',
  }
);
