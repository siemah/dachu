import React from 'react'
import Container from '../../components/container'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from '../../components/box';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/button';

export default function Article() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <Box className={`flex-1 gap-4 bg-[#bfecff] pt-4 pt-[${top}px] pb-[${bottom}px]`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Container className='border-b border-slate-400'>
        <Box className='flex-row justify-between gap-3 py-4'>
          <Button>
            <Ionicons
              size={25}
              color={"#111111"}
              name='arrow-back-outline'
            />
          </Button>
          <Box className='flex-row gap-3'>
            <Button>
              <Ionicons
                size={25}
                color={"#111111"}
                name='heart-outline'
              />
            </Button>
            <Button>
              <Ionicons
                size={25}
                color={"#111111"}
                name='bookmark-outline'
              />
            </Button>
            <Button>
              <Ionicons
                size={25}
                color={"#111111"}
                name='open-outline'
              />
            </Button>
          </Box>
        </Box>
        </Container>
      </ScrollView>
    </Box>
  )
}