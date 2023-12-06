import React from 'react'
import tailwind from 'tailwind-rn'
import { WithClassName } from '../types/ui'
import { Text as RnText } from 'react-native'

export default function Text({ className, style, children, ...props }: WithClassName<typeof Text>) {
  return (
    <RnText style={[tailwind(className), style]} {...props}>
      {children}
    </RnText>
  )
}