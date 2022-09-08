import { Quote } from '@/api/quoteApi';
import {
  Paper,
  Title,
  Divider,
  ScrollArea,
  Center,
  Loader,
  Box,
  Blockquote,
  Text,
  Pagination,
} from '@mantine/core';
import React from 'react';
import style from './quotes.module.css';

export type QuotesContainerProps = {
  title: string;
  quotes: Quote[] | undefined;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  isFetchingNextPage?: boolean;
  isPreviousData?: boolean;
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  withPagination?: boolean;
  withInfiniteScroll?: boolean;
  loadMoreRef?: (node?: Element | null | undefined) => void;
  hasMore?: boolean;
  totalPage?: number;
};

const QuotesContainer = (props: QuotesContainerProps) => {
  const {
    title,
    quotes,
    isLoading,
    isSuccess,
    isError,
    isFetchingNextPage,
    withPagination,
    withInfiniteScroll,
    loadMoreRef,
    page,
    setPage,
    totalPage,
  } = props;

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
        height: 'calc(100vh - 22rem)',
        minWidth: '300px',
      })}
      shadow='sm'
    >
      <Title order={4} align={'center'} sx={{ position: 'sticky' }} p='md'>
        {title}
      </Title>
      <Divider />
      <ScrollArea
        className={style.quotesContainer}
        p='md'
        type='never'
        scrollbarSize={6}
        offsetScrollbars
      >
        {!isSuccess ? (
          <Center sx={{ height: '100%' }}>
            {isError && <Text>Error fetching data</Text>}
            {(isLoading || (isFetchingNextPage && withPagination)) && (
              <Loader />
            )}
          </Center>
        ) : (
          quotes?.map((quote) => (
            <Box key={quote.id}>
              <Blockquote cite={`- ${quote.author}`}>
                <Text size={'md'}>{quote.quote}</Text>
              </Blockquote>
              <Divider />
            </Box>
          ))
        )}
        {withInfiniteScroll && (
          <Box ref={loadMoreRef} sx={{ height: '10px' }} />
        )}
      </ScrollArea>
      {isFetchingNextPage && withInfiniteScroll ? (
        <Center>
          {isError && <Text>Error fetching data</Text>}
          <Loader />
        </Center>
      ) : null}
      {withPagination && (
        <Pagination
          total={totalPage ?? 1}
          sx={{ justifyContent: 'center', position: 'sticky' }}
          page={page}
          onChange={setPage}
        />
      )}
    </Paper>
  );
};

export default QuotesContainer;
