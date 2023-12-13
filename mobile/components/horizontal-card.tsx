import React from 'react'
import Box from './box'
import { CardProps } from '../types/ui'
import CardImage from './card-image'
import Button from './button'
import TextHighlight from './text-highlight'
import Text from './text'
import { Link } from 'expo-router'

export default function HorizontalCard({ className = '', children, title, href, subtitle, image, ...props }: CardProps) {
  return (
    <Link
      href={href}
      asChild
    >
      <Button
        className={`flex-row gap-6 items-center md:flex-col ${className}`}
        {...props}
      >
        <CardImage
          source={image}
          contentFit='cover'
          className={`h-full w-full`}
          containerClassName={`w-24 h-24 md:w-full`}
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
        </Box>
      </Button>
    </Link>
  )
}