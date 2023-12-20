import React from 'react'
import { Tabs, usePathname } from 'expo-router'
import { TabBar } from '../../components/tab-bar';
import { getScreenColor } from '../../helpers/ui';

export default function _layout() {
  const pathname = usePathname();
  const screenColor = getScreenColor(pathname);
  const screenOptions = {
    headerShown: false,
    tabBarActiveBackgroundColor: screenColor
  };
  const sceneContainerStyle = {
    backgroundColor: "#c8c0ff"
  };

  return (
    // <QueryClientProvider client={queryClient}>
    <Tabs
      tabBar={TabBar}
      screenOptions={screenOptions}
      sceneContainerStyle={sceneContainerStyle}
    >
      <Tabs.Screen name='index' />
      <Tabs.Screen name='prayer' />
      <Tabs.Screen name='bookmarks' />
      <Tabs.Screen name='games' />
    </Tabs>
    // </QueryClientProvider>
  )
}