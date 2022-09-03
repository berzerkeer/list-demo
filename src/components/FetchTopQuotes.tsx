import { useQuery } from '@tanstack/react-query';
import { fetchTopQuotes, Quote } from '@/api/quoteApi';
import QuotesContainer from './QuotesContainer';
import { QuoteConfig } from './QuoteLayout';

const FetchTopQuotes = (props: Partial<QuoteConfig>) => {
  const { title = '' } = props;
  const {
    data: quotes = [],
    isLoading,
    isSuccess,
    isError,
  } = useQuery<Quote[]>(['top-quotes'], fetchTopQuotes);

  return (
    <QuotesContainer
      title={title}
      quotes={quotes}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    />
  );
};

export default FetchTopQuotes;
