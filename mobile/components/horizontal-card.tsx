import React from 'react'
import Box from './box'
import { CardProps } from '../types/ui'
import CardImage from './card-image'
import Button from './button'
import TextHighlight from './text-highlight'
import Text from './text'
import { router } from 'expo-router'
import { ButtonProps, GestureResponderEvent } from 'react-native'

export default function HorizontalCard({ className = '', children, title, href, subtitle, image, onPress, ...props }: CardProps & Pick<ButtonProps, "onPress">) {
  const onPressCard = (event: GestureResponderEvent) => {
    router.push(href);
    onPress && onPress(event);
  }

  return (
    <Button
      className={`flex-row gap-6 items-center md:flex-col ${className}`}
      onPress={onPressCard}
      {...props}
    >
      <CardImage
        source={image}
        contentFit='cover'
        className={`h-full w-full`}
        containerClassName={`w-24 h-24 md:w-full md:h-60`}
        borderContainerClassName={`border-2 left-2 top-2`}
      />
      <Box className='flex-1 gap-2 md:w-full'>
        {!!subtitle && (
          <Box className='flex-row'>
            <TextHighlight highlightColor='#77f5c3'>
              {subtitle}
            </TextHighlight>
          </Box>
        )
        }
        <Text
          className='text-lg font-bold text-slate-900'
          numberOfLines={2}
        >
          {title}
        </Text>
        {children}
      </Box>
    </Button>
  )
}