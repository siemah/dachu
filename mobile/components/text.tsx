import React from 'react'
import tailwind from 'twrnc'
import { WithClassName } from '../types/ui'
import { Text as RnText } from 'react-native'

export default function Text({ className, style, children, ...props }: WithClassName<typeof RnText>) {
  return (
    <RnText style={[tailwind.style(className), style]} {...props}>
      {children}
    </RnText>
  )
}