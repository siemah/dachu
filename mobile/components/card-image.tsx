import React from 'react'
import { Image } from 'expo-image'
import tailwind from 'twrnc'
import { WithClassName } from '../types/ui'
import Box from './box'

export default function CardImage({ style, className = '', containerClassName = '', borderContainerClassName = '', ...props }: WithClassName<typeof Image> & {
  borderContainerClassName?: string;
  containerClassName?: string
}) {
  return (
    <Box className={`flex-row ${containerClassName}`}>
      <Box className={`absolute border-[3px] border-slate-900 left-3 top-4 h-full w-full ${borderContainerClassName}`} />
      <Image
        style={[tailwind.style(`flex-1 ${className}`), style]}
        contentFit='cover'
        {...props}
      />
    </Box>
  )
}