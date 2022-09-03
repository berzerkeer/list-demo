import { Quote, fetchTopQuotes } from '@/api/quoteApi';
import { useQuery } from '@tanstack/react-query';
import { QuoteConfig } from './QuoteLayout';
import QuotesContainer from './QuotesContainer';

const InfiniteQuotes = (props: Partial<QuoteConfig>) => {
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

export default InfiniteQuotes;
