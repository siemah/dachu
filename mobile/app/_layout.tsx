import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import useScreenColor from '../hook/use-screen-color';
import * as Sentry from 'sentry-expo';
import ReportingProvider from '../components/reporting-wrapper';
import tailwind, { useDeviceContext } from 'twrnc';

Sentry.init({
  dsn: 'https://1dcf606887ca6e4f9a4da99b325f5979@o1322078.ingest.sentry.io/4506382631108608',
  enableInExpoDevelopment: false,
  debug: false, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 3600000, // 1 hour
      staleTime: 900000 // 15 minutes
    }
  }
});

export default function StackLayout() {
  useDeviceContext(tailwind);
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
      <ReportingProvider>
        <Stack screenOptions={screenOptions} />
      </ReportingProvider>
    </QueryClientProvider>
  );
}