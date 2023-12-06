import React from 'react'
import { Image } from 'expo-image'
import tailwind from 'twrnc'
import { WithClassName } from '../types/ui'
import Box from './box'

export default function CardImage({ style, className, ...props }: WithClassName<typeof Image>) {
  return (
    <Box className='flex-row w-full'>
      <Box className={`absolute border-[3px] border-slate-900 left-3 top-4 h-full w-full`} />
      <Image
        style={[tailwind.style(`flex-1 w-full ${className}`), style]}
        contentFit='cover'
        {...props}
      />
    </Box>
  )
}