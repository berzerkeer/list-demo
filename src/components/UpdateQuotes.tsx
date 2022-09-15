import { createQuote } from '@/api/quoteApi';
import { Button, Paper, Stack, Textarea, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const UpdateQuotes = () => {
  const queryClient = useQueryClient();
  const createQuoteMutation = useMutation(createQuote);

  const [form, setForm] = useState({
    author: '',
    quote: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name, e.target.value);
    setForm((_form) => {
      return {
        ..._form,
        [e.target.name]: e.target.value,
      };
    });
    console.log(form);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { author, quote } = form;
    console.log(form);
    if (!author || !quote) {
      showNotification({
        message: 'Please provide quote and author text',
        color: 'red',
      });
      return;
    }
    await createQuoteMutation.mutate(form, {
      onSuccess: () => {
        setForm({
          quote: '',
          author: '',
        });
        // Tell the query client to refetch the quotes
        queryClient.invalidateQueries(['top-quotes']);
        showNotification({
          message: 'Quote created',
          color: 'green',
        });
      },
    });
  };

  return (
    <Paper
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[1],
        width: '50%',
      })}
      p='lg'
      m={'md'}
      shadow={'sm'}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label='Author'
            onChange={handleChange}
            name='author'
            value={form.author}
          />
          <Textarea
            label='Quote'
            onChange={handleChange}
            name='quote'
            value={form.quote}
          />
          <Button
            type='submit'
            disabled={createQuoteMutation.isLoading}
            sx={{
              width: '200px',
              alignSelf: 'center',
            }}
          >
            {createQuoteMutation.isLoading
              ? 'Creating quote...'
              : 'Create Quote'}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default UpdateQuotes;
