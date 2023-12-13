import { ActivityIndicator, Platform } from 'react-native'
import React from 'react'
import Box from './box'
import { WithClassName } from '../types/ui'

export default function LoadingIndicator({ color, className = '', children, ...props }: WithClassName<typeof ActivityIndicator>) {
  return (
    <Box className={`flex-1 items-center justify-center ${className}`}>
      <ActivityIndicator
        color={color}
        size={Platform.OS === "web" ? "large" : "small"}
        {...props}
      />
      {children}
    </Box>
  );
}