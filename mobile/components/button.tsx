import React from 'react'
import tailwind from 'twrnc'
import { WithClassName } from '../types/ui'
import { TouchableOpacity } from 'react-native';

export default function Button({ className = '', style, children, ...props }: WithClassName<typeof TouchableOpacity>) {
  return (
    <TouchableOpacity
      style={[tailwind.style(className), style]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}