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

export const fetchTopQuotes = () => {
  return api.get<TopQuotesResponse>('/api/quotes/top').then((res) => res.data);
};

export const fetchQuotesByPage = (page: number) => {
  return api
    .get<QuotesData>('/api/quotes', { params: { page } })
    .then((res) => res.data);
};

export const fetchQuotesByCursor = (cursor: number) => {
  return api
    .get<QuotesDataWithCursor>('/api/quotes', { params: { cursor } })
    .then((res) => res.data);
};

export const createQuote = (quote: Omit<Quote, 'id'>) => {
  return api.post<Quote>('/api/quotes', quote).then((res) => res.data);
};
