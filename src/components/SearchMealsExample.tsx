import { useEffect, useRef, useState } from 'react';

import type { Canceler } from '@/api/types/api.types';
import { didAbort } from '@/api/api';
import { Meal, searchMeals } from '@/api/mealApi';
import { List, Stack, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

type AbortRef = {
  abort?: Canceler;
};

const useFetchMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const abortRef = useRef<AbortRef>({});

  const handleQuoteError = (error: unknown) => {
    if (didAbort(error)) {
      showNotification({
        title: 'Request aborted',
        message: 'Request was aborted by user',
      });
    } else {
      showNotification({
        title: 'Error',
        message: 'Oops, Something went wrong',
        color: 'red',
      });
    }
  };

  const fetchMeals = async (searchTerm: string) => {
    try {
      // Abort the previous request if there was one
      abortRef.current.abort?.();
      // Search for new meals
      const newMeals = await searchMeals(searchTerm, {
        // Assign the canceller method to the abortRef
        abort: (abort) => (abortRef.current.abort = abort),
      });
      setMeals(newMeals ?? []);
    } catch (error) {
      console.error(error);
      handleQuoteError(error);
    }
  };

  return {
    meals,
    fetchMeals,
  };
};

const SearchMealExample = () => {
  const [query, setQuery] = useState('');
  const { meals, fetchMeals } = useFetchMeals();

  useEffect(() => {
    fetchMeals(query);
  }, [query, fetchMeals]);

  return (
    <Stack align='center'>
      <TextInput
        id='meal'
        placeholder='Search meals'
        autoComplete='off'
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
        label='Search meal'
      />
      <List spacing='xs' size='sm' style={{ textAlign: 'center' }}>
        {meals.map((meal) => (
          <List.Item key={meal.idMeal} style={{ listStyle: 'none' }}>
            {meal.strMeal}
          </List.Item>
        ))}
      </List>
    </Stack>
  );
};

export default SearchMealExample;
