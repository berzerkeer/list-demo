import { useEffect, useState } from 'react';
import { Button, Image, Stack, Text } from '@mantine/core';

import { fetchQuote, fetchCat } from '@/api/randomApi';
import { IDLE, PENDING, SUCCESS, ERROR } from '@/api/constants/apiStatus';

import { withAsync } from '@/helpers/withAsync';
import { useApiStatus } from '@/hooks/useApiStatus';

const useFetchQuote = () => {
  const [quote, setQuote] = useState<string>('');
  const {
    status: fetchQuoteStatus,
    setStatus: setFetchQuoteStatus,
    isIdle: isFetchQuoteIdle,
    isPending: isFetchQuotePending,
    isError: isFetchQuoteError,
    isSuccess: isFetchQuoteSuccess,
  } = useApiStatus(IDLE);

  const initFetchQuote = async () => {
    setFetchQuoteStatus(PENDING);
    const { response, error } = await withAsync(() => fetchQuote());

    if (error) {
      setFetchQuoteStatus(ERROR);
      return;
    } else if (response) {
      setQuote(response.data.quote);
      setFetchQuoteStatus(SUCCESS);
    }
  };

  return {
    quote,
    fetchQuoteStatus,
    initFetchQuote,
    isFetchQuoteIdle,
    isFetchQuotePending,
    isFetchQuoteError,
    isFetchQuoteSuccess,
  };
};

const useFetchCat = () => {
  const [cat, setCat] = useState<string>('');
  const {
    status: fetchCatStatus,
    setStatus: setFetchCatStatus,
    isIdle: isFetchCatIdle,
    isPending: isFetchCatPending,
    isError: isFetchCatError,
    isSuccess: isFetchCatSuccess,
  } = useApiStatus(IDLE);

  const initFetchCat = async () => {
    setFetchCatStatus(PENDING);
    const { response, error } = await withAsync(() => fetchCat());

    if (error) {
      setFetchCatStatus(ERROR);
      return;
    } else if (response) {
      setCat(response.data?.[0].url);
      setFetchCatStatus(SUCCESS);
    }
  };

  return {
    cat,
    fetchCatStatus,
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
        {isFetchQuotePending ? <Text>Loadig..</Text> : null}
        {isFetchQuoteError ? <Text>There was a problem</Text> : null}
        {isFetchQuoteSuccess ? <Text>{quote}</Text> : null}
      </div>
      <div>
        {isFetchCatIdle ? <Text>Welcome</Text> : null}
        {isFetchCatPending ? <Text>Loadig..</Text> : null}
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
