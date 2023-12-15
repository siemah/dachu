import { View, Text } from 'react-native'
import React from 'react'
import Button from './button'
import Animated, { ZoomIn, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import { WithClassName } from '../types/ui'

export default function BookmarkButton({ className, style, bookmarked, onPress: onBookmark }: WithClassName<typeof Button> & { bookmarked: boolean }) {
  const animatedStyles = useAnimatedStyle(() => {
    return ({
      transform: [{
        scale: withSpring(bookmarked ? 1 : 0)
      }],
    })
  });
  const exiting = () => {
    'worklet';
    const animations = {
      transform: [{
        scale: withTiming(0)
      }],
      opacity: withTiming(0.5),
    };
    const initialValues = {
      transform: [{
        scale: 1
      }],
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };
  const outlineExiting = () => {
    'worklet';
    const animations = {
      transform: [{
        scale: withTiming(0, { duration: 200 })
      }],
      opacity: withTiming(0, { duration: 100 }),
    };
    const initialValues = {
      transform: [{
        scale: 1
      }],
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <Button
      onPress={onBookmark}
      className={className}
      style={style}
    >
      {
        bookmarked && (
          <Animated.View
            style={[animatedStyles]}
            exiting={exiting}
          >
            <Ionicons
              size={25}
              color={'#ffa32a'}
              name={'bookmark-sharp'}
            />
          </Animated.View>
        )
      }
      {
        !bookmarked && (
          <Animated.View
            entering={ZoomIn.springify()}
            exiting={outlineExiting}
          >
            <Ionicons
              size={25}
              color={'#111111'}
              name={'bookmark-outline'}
            />
          </Animated.View>
        )
      }
    </Button>
  )
}