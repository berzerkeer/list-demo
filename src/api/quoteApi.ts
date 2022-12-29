import api from './api';

export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export type QuotesData = {
  quotes: Quote[];
  hasMore?: boolean;
  count?: number;
};

export type QuotesDataWithCursor = {
  quotes: Quote[];
  nextCursor: number | null;
  hasMore?: boolean;
  count?: number;
};

export type TopQuotesResponse = Quote[];

export const fetchTopQuotes = async () => {
  const res = await api.get<TopQuotesResponse>('/api/quotes/top');
  return res.data;
};

export const fetchQuotesByPage = async (page: number) => {
  const res = await api.get<QuotesData>('/api/quotes', { params: { page } });
  return res.data;
};

export const fetchQuotesByCursor = async (cursor: number) => {
  const res = await api.get<QuotesDataWithCursor>('/api/quotes', {
    params: { cursor },
  });
  return res.data;
};

export const createQuote = async (quote: Omit<Quote, 'id'>) => {
  const res = await api.post<Quote>('/api/quotes', quote);
  return res.data;
};
