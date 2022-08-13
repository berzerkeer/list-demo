import ComponentExample from '@/components/componentExample';
import { Center, Container, MantineProvider } from '@mantine/core';

function App() {
  return (
    <Container>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Center style={{ width: '100%', height: '100vh' }}>
          <ComponentExample />
        </Center>
      </MantineProvider>
    </Container>
  );
}

export default App;
