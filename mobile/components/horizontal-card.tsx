import React from 'react'
import Box from './box'
import { CardProps } from '../types/ui'
import CardImage from './card-image'
import Button from './button'
import TextHighlight from './text-highlight'
import Text from './text'

export default function HorizontalCard({ className = '', children, title, subtitle, image, ...props }: CardProps) {
  return (
    <Button
      className={`flex-row gap-6 items-center ${className}`}
      {...props}
    >
      <CardImage
        source={image}
        contentFit='cover'
        className={`h-24 w-24`}
        containerClassName={`w-24`}
        borderContainerClassName={`border-2 left-2 top-2`}
      />
      <Box className='flex-1 gap-2'>
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
      </Box>
    </Button>
  )
}