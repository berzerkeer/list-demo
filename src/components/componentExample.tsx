import { useEffect, useState } from 'react';
import { fetchQuote, fetchCat } from '@/api/randomApi';

const useFetchQuote = () => {
  const [quote, setQuote] = useState<string>('');
  const initFetchQuote = async () => {
    const response = await fetchQuote();
    setQuote(response.data.quote);
  };

  return {
    quote,
    initFetchQuote,
  };
};

const useFetchCat = () => {
  const [cat, setCat] = useState<string>('');
  const initFetchCat = async () => {
    const response = await fetchCat();
    setCat(response.data?.[0].url);
  };

  return {
    cat,
    initFetchCat,
  };
};

const useFetchRandom = () => {
  const { quote, initFetchQuote } = useFetchQuote();
  const { cat, initFetchCat } = useFetchCat();

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
  };
};

function ComponentExample() {
  const { quote, cat, fetchRandom } = useFetchRandom();
  return (
    <div>
      <div>{quote ? <p>{quote}</p> : null}</div>
      <div>{cat ? <img src={cat} width='250px' height='250px' /> : null}</div>

      <button onClick={fetchRandom}>Fetch Random</button>
    </div>
  );
}

export default ComponentExample;
