import { Center, Container, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import SearchMealExample from './components/SearchMealsExample';

function App() {
  return (
    <Container>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <NotificationsProvider>
          <Center style={{ width: '100%', height: '100vh' }}>
            <SearchMealExample />
          </Center>
        </NotificationsProvider>
      </MantineProvider>
    </Container>
  );
}

export default App;
