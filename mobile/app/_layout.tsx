import React from 'react'
import { Tabs } from 'expo-router'
import { TabBar } from '../components/tab-bar';

export default function _layout() {
  const screenOptions = {
    headerShown: false
  };
  const sceneContainerStyle = {
    backgroundColor: "#c8c0ff"
  };

  return (
    <Tabs
      tabBar={TabBar}
      screenOptions={screenOptions}
      sceneContainerStyle={sceneContainerStyle}
    >
      <Tabs.Screen name='index' />
      <Tabs.Screen name='settings' />
    </Tabs>
  )
}