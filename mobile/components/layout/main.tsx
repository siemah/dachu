import React from 'react'
import Box from '../box'
import { WithClassName } from '../../types/ui'
import Head from 'expo-router/head'
import Container from '../container'
import TextHighlight from '../text-highlight'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useScreenColor from '../../hook/use-screen-color'

export default function MainLayout({ className = "", title, children }: WithClassName<typeof Box> & { title: string; }) {
  const screenColor = useScreenColor();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Box
      className={`flex-1 gap-4 bg-[${screenColor}] pt-[${top}px] pb-[${bottom}px] ${className}`}
    >
      <Head>
        <title>{title}</title>
      </Head>
      <Container className='mt-4 flex-row'>
        <TextHighlight
          className='text-4xl font-bold capitalize'
          highlightColor='#ffc32a'
        >
          {title}
        </TextHighlight>
      </Container>
      {children}
    </Box>
  )
}