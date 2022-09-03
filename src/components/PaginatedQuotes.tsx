import { fetchQuotesByPage, QuotesData } from '@/api/quoteApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { QuoteConfig } from './QuoteLayout';
import QuotesContainer from './QuotesContainer';

const PaginatedQuotes = (props: Partial<QuoteConfig>) => {
  const { title = '' } = props;
  const [activePage, setActivePage] = useState(1);
  const { data, isLoading, isFetching, isSuccess, isError, isPreviousData } =
    useQuery<QuotesData>(
      ['quotes', activePage],
      () => fetchQuotesByPage(activePage),
      {
        keepPreviousData: true,
      }
    );

  return (
    <QuotesContainer
      title={title}
      quotes={data?.quotes}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      page={activePage}
      setPage={setActivePage}
      isPreviousData={isPreviousData}
      isFetching={isFetching}
      withPagination
    />
  );
};

export default PaginatedQuotes;
