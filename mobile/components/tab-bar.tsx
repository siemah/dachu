import React, { useContext } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Box from './box';
import { Ionicons } from '@expo/vector-icons';
import Button from './button';
import TextHighlight from './text-highlight';
import Animated, { FadeInDown, FadeOutDown, FadeIn } from 'react-native-reanimated';
import { getIcon } from '../helpers/ui';

export function TabBar({ state, descriptors, insets, navigation }: BottomTabBarProps) {
  const { history } = state;
  const lastRouteKey = history?.[history.length - 1]?.key;
  const backgroundColor = descriptors[lastRouteKey].options.tabBarActiveBackgroundColor || "#c8c0ff";
  const containerStyle = {
    paddingBottom: insets.bottom,
    backgroundColor
  };

  return (
    <Box style={containerStyle}>
      <Box className="flex-row py-2 border-t border-slate-900">
        {
          state.routes.map((route, index) => {
            if (["_sitemap", "[...404]"].includes(route.name)) return null;

            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <Button
                key={`tab-item-${route.key}-${index}`}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                className={'flex-1 items-center justify-center'}
              >
                <Animated.View layout={FadeIn}>
                  <Ionicons
                    name={getIcon(index, isFocused)}
                    size={20}
                    color={"#111111"}
                  />
                </Animated.View>
                {
                  isFocused && (
                    <Animated.View
                      entering={FadeInDown}
                      exiting={FadeOutDown}
                    >
                      <TextHighlight>
                        {route.name}
                      </TextHighlight>
                    </Animated.View>
                  )
                }
              </Button>
            );
          })
        }
      </Box>
    </Box>
  );
}