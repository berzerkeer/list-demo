import { useEffect } from 'react';
import { Button, Image, Stack, Text } from '@mantine/core';

import { fetchQuote, fetchCat } from '@/api/randomApi';

import { useApi } from '@/hooks/useApi';

import LazySpinner from './lazy-spinner/LazySpinner';

const useFetchQuote = () => {
  const {
    data: quote,
    exec: initFetchQuote,
    isIdle: isFetchQuoteIdle,
    isPending: isFetchQuotePending,
    isError: isFetchQuoteError,
    isSuccess: isFetchQuoteSuccess,
  } = useApi(() => fetchQuote().then((response) => response.data?.quote));

  return {
    quote,
    initFetchQuote,
    isFetchQuoteIdle,
    isFetchQuotePending,
    isFetchQuoteError,
    isFetchQuoteSuccess,
  };
};

const useFetchCat = () => {
  const {
    data: cat,
    exec: initFetchCat,
    isIdle: isFetchCatIdle,
    isPending: isFetchCatPending,
    isError: isFetchCatError,
    isSuccess: isFetchCatSuccess,
  } = useApi(() => fetchCat().then((response) => response.data?.[0].url));

  return {
    cat,
    initFetchCat,
    isFetchCatIdle,
    isFetchCatPending,
    isFetchCatError,
    isFetchCatSuccess,
  };
};

const useFetchRandom = () => {
  const {
    quote,
    initFetchQuote,
    isFetchQuoteIdle,
    isFetchQuotePending,
    isFetchQuoteError,
    isFetchQuoteSuccess,
  } = useFetchQuote();
  const {
    cat,
    initFetchCat,
    isFetchCatIdle,
    isFetchCatPending,
    isFetchCatError,
    isFetchCatSuccess,
  } = useFetchCat();

  const fetchRandom = () => {
    initFetchQuote();
    initFetchCat();
  };

  useEffect(() => {
    fetchRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    quote,
    cat,
    fetchRandom,
    isFetchQuoteIdle,
    isFetchCatIdle,
    isFetchCatPending,
    isFetchCatError,
    isFetchCatSuccess,
    isFetchQuotePending,
    isFetchQuoteError,
    isFetchQuoteSuccess,
  };
};

function ComponentExample() {
  const {
    quote,
    cat,
    fetchRandom,
    isFetchCatError,
    isFetchCatIdle,
    isFetchCatPending,
    isFetchCatSuccess,
    isFetchQuoteError,
    isFetchQuoteIdle,
    isFetchQuotePending,
    isFetchQuoteSuccess,
  } = useFetchRandom();
  return (
    <Stack align='center'>
      <div>
        {isFetchQuoteIdle ? <Text>Welcome</Text> : null}
        {<LazySpinner show={isFetchQuotePending} delay={400} />}
        {isFetchQuoteError ? <Text>There was a problem</Text> : null}
        {isFetchQuoteSuccess ? <Text>{quote}</Text> : null}
      </div>
      <div>
        {isFetchCatIdle ? <Text>Welcome</Text> : null}
        {<LazySpinner show={isFetchCatPending} delay={400} />}
        {isFetchCatError ? <Text>There was a problem</Text> : null}
        {isFetchCatSuccess ? (
          <Image
            alt='With default placeholder'
            height={280}
            radius='md'
            src={cat}
            width={200}
            withPlaceholder
          />
        ) : null}
      </div>
      <Button onClick={fetchRandom}>Fetch Random</Button>
    </Stack>
  );
}

export default ComponentExample;
