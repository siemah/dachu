import React from 'react'
import { WithClassName } from '../types/ui'
import Box from './box';

export default function Container({ children, childrenClassName, className, style }: WithClassName<typeof Box> & {childrenClassName?:string}) {
  return (
    <Box
      style={style}
      className={className}
    >
      <Box
        className={`max-w-[1080px] px-6 md:px-6 ${childrenClassName}`}
      >
        {children}
      </Box>
    </Box>
  )
}