import { View, Text } from 'react-native'
import React from 'react'
import Button from './button'
import Box from './box'
import { WithClassName } from '../types/ui'

export default function HighlightButton({ children, containerClassName = '', className = '', borderContainerClassName = '', ...props }: WithClassName<typeof Button> & { borderContainerClassName?: string; containerClassName?: string }) {
  return (
    <Button
      className={`p-2 bg-slate-900 ${containerClassName}`}
      {...props}
    >
      <Box className={`absolute border-[1px] border-slate-900 left-1 top-1 right-[-1] bottom-[-1] ${borderContainerClassName}`} />
      <Box className={`${className}`}>
        {children}
      </Box>
    </Button>
  )
}