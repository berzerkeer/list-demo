import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import QuoteLayout from './components/QuoteLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      withCSSVariables
      theme={{
        colorScheme: 'dark',
        fontFamily: '"Inter",sans-serif',
        headings: { fontFamily: '"Inter", sans-serif' },
      }}
    >
      <NotificationsProvider>
        <QueryClientProvider client={queryClient}>
          <QuoteLayout />
        </QueryClientProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
