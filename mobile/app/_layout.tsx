import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 3600000, // 1 hour
      staleTime: 900000 // 15 minutes
    }
  }
});

export default function StackLayout() {
  const screenOptions = {
    headerShown: false
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={screenOptions} />
    </QueryClientProvider>
  );
}