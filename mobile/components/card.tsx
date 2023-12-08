import React from 'react'
import Box from './box'
import Container from './container'
import TextHighlight from './text-highlight'
import Text from './text'
import CardImage from './card-image'
import { Ionicons } from '@expo/vector-icons'
import Button from './button'
import { CardProps, WithClassName } from '../types/ui'

export default function Card({ title, subtitle, image, preview, className = '', children, ...props }: CardProps) {
  return (
    <Button className={`gap-8 ${className}`} {...props}>
      <Container childrenClassName='gap-4'>
        <Box className='flex-row flex-wrap pt-4'>
          <TextHighlight
            highlightColor='#77f5c3'
          >
            {subtitle}
          </TextHighlight>
        </Box>
        <Text className={`text-3xl font-bold text-slate-900`}>
          {title}
        </Text>
        <CardImage
          className={"h-56"}
          contentFit='cover'
          source={image}
        />
        {
          !!preview && (
            <Text className='mt-2'>
              <Text className={`mt-2 text-slate-700`}>
                {preview}{`....`}
              </Text>
              <Text className='font-bold text-slate-800 underline'>More</Text>
            </Text>
          )
        }
        {children}
      </Container>
      <Box className='border-t border-slate-600' />
    </Button>
  )
}