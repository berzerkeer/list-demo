import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { fetchQuotesByCursor, QuotesDataWithCursor } from '@/api/quoteApi';

import { QuoteConfig } from './QuoteLayout';
import QuotesContainer from './QuotesContainer';
import { useCallback, useEffect } from 'react';

const InfiniteQuotes = (props: Partial<QuoteConfig>) => {
  const { title = '' } = props;
  const { ref: loadMoreRef, inView } = useInView();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<QuotesDataWithCursor>(
    ['quotes'],
    ({ pageParam = 1 }) => fetchQuotesByCursor(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const hasMore = lastPage.hasMore;
        if (!hasMore) {
          return;
        }
        return lastPage.nextCursor;
      },
    }
  );

  useEffect(() => {
    if (inView && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
        .then(() => console.log('Fetched next page'))
        .catch((err) => console.log(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const getCurrentPageQuotes = useCallback(() => {
    return data?.pages?.map((page) => page.quotes).flat();
  }, [data?.pages]);

  return (
    <QuotesContainer
      title={title}
      quotes={getCurrentPageQuotes()}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      withInfiniteScroll
      loadMoreRef={loadMoreRef}
      isFetchingNextPage={isFetchingNextPage}
      hasMore={hasNextPage}
    />
  );
};

export default InfiniteQuotes;
