import api from './api';

const URLS = {
  fetchAnimeQuoteUrl: 'random',
  fetchCatUrl: 'images/search?format=json',
};

export type QuoteData = {
  anime: string;
  character: string;
  quote: string;
};

export const fetchQuote = () => {
  return api.get<QuoteData>(URLS.fetchAnimeQuoteUrl, {
    baseURL: 'https://animechan.vercel.app/api/',
  });
};

export type CatData = {
  breeds: [];
  height: number;
  id: string;
  url: string;
  width: number;
}[];

export const fetchCat = () => {
  return api.get<CatData>(URLS.fetchCatUrl, {
    baseURL: 'https://api.thecatapi.com/v1/',
  });
};
