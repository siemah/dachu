import { Stack, usePathname } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import useScreenColor from '../hook/use-screen-color';
import { PostHogProvider } from 'posthog-react-native'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 3600000, // 1 hour
      staleTime: 900000 // 15 minutes
    }
  }
});

const postHogOptions = {
  host: "https://eu.posthog.com",
};

export default function StackLayout() {
  const screenColor = useScreenColor();
  const screenOptions = {
    headerShown: false
  };

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync(screenColor);
      NavigationBar.setButtonStyleAsync("dark")
    }
  }, [screenColor]);

  return (
    <QueryClientProvider client={queryClient}>
      <PostHogProvider
        apiKey="phc_RsmRdAMG6RSS4uM1F500S0BBvn1TC7gMxHbsqhg4wpj"
        options={postHogOptions}
      >
        <Stack screenOptions={screenOptions} />
      </PostHogProvider>
    </QueryClientProvider>
  );
}