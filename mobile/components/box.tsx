import { View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { WithClassName } from '../types/ui'

export default function Box({ className = '', style, children, ...props }: WithClassName<typeof View>) {
  return (
    <View style={[tailwind.style(className || ''), style]} {...props}>
      {children}
    </View>
  )
}