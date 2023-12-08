import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '../components/tab-bar';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 3600000, // 1 hour
      staleTime: 900000 // 15 minutes
    }
  }
});
export default function _layout() {
  const screenOptions = {
    headerShown: false
  };
  const sceneContainerStyle = {
    backgroundColor: "#c8c0ff"
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        tabBar={TabBar}
        screenOptions={screenOptions}
        sceneContainerStyle={sceneContainerStyle}
      >
        <Tabs.Screen name='index' />
        <Tabs.Screen name='settings' />
      </Tabs>
    </QueryClientProvider>
  )
}