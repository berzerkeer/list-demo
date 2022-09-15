import { Box, Stack, SimpleGrid, Divider } from '@mantine/core';
import React from 'react';
import FetchTopQuotes from './FetchTopQuotes';
import InfiniteQuotes from './InfiniteQuotes';
import PaginatedQuotes from './PaginatedQuotes';
import UpdateQuotes from './UpdateQuotes';

export interface QuoteConfig {
  title: string;
  component: React.FC;
}

const quotesConfig = [
  {
    title: 'Top quotes',
    Component: FetchTopQuotes,
  },
  {
    title: 'Paginated quotes',
    Component: PaginatedQuotes,
  },
  {
    title: 'Infinite scroll quotes',
    Component: InfiniteQuotes,
  },
];

const QuoteLayout = () => {
  return (
    <Stack
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[0],
        height: '100vh',
        width: '100%',
      })}
      align='center'
    >
      <UpdateQuotes />
      <Divider sx={{ alignSelf: 'stretch' }} />
      <Box p='md'>
        <SimpleGrid cols={3} spacing={'lg'}>
          {quotesConfig.map((config) => {
            const { Component, ...rest } = config;
            return (
              <Box key={config.title}>
                <Component {...rest} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};

export default QuoteLayout;
