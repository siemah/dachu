import React from 'react'
import tailwind from 'tailwind-rn'
import { WithClassName } from '../types/ui'
import { TouchableOpacity } from 'react-native';

export default function Button({ className, style, children, ...props }: WithClassName<typeof TouchableOpacity>) {
  return (
    <TouchableOpacity
      style={[tailwind(className), style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}