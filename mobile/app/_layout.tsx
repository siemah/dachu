import { Stack, usePathname } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 3600000, // 1 hour
      staleTime: 900000 // 15 minutes
    }
  }
});

export default function StackLayout() {
  const pathname = usePathname();
  const screenOptions = {
    headerShown: false
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      if (pathname.includes("/article/")) {
        NavigationBar.setBackgroundColorAsync("#bfecff");
      } else {
        NavigationBar.setBackgroundColorAsync("#c8c0ff");
      }
      NavigationBar.setButtonStyleAsync("dark")
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={screenOptions} />
    </QueryClientProvider>
  );
}