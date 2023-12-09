import React from 'react'
import tailwind from 'twrnc'
import { WithClassName } from '../types/ui'
import { TouchableOpacity } from 'react-native';

const Button = React.forwardRef<TouchableOpacity, WithClassName<typeof TouchableOpacity>>(({ className = '', style, children, ...props }, ref) => {
  return (
    <TouchableOpacity
      style={[tailwind.style(className), style]}
      ref={ref}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
});

export default Button;